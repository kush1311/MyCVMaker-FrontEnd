import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../GlobalContextApi/GlobalContextApi";
import HeaderName from "./MiniComponents/HeaderName";
import {
  CloudUploadIcon,
  EyeIcon,
  EyeOffIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import HeaderLayout from "./MiniComponents/HeaderLayout";
import HeaderExtraField from "./MiniComponents/HeaderExtraFieldOptions";
import CustomFieldSection from "./MiniComponents/HeaderCustomExtraFields";
import Hide from "./MiniComponents/Hide";
import { Delete } from "./MiniComponents/Delete";
import axios from "axios";
import {
  border,
  deleteContainer,
  deleteSpan,
  headerContainer,
  hideButton,
  hideContainer,
  hideSpan,
} from "../../../../constants/styles";
import { Loader } from "../../../AllLoaders/Loaders";
import { deleteImageApiCall, uploadImageApiCall } from "../../../../utils/apiCalls";

export const Header = (props) => {
  const api = useContext(Context);
  const setCVFunc = (e, index, toggleHide) => {
    const value = toggleHide
      ? !Boolean(parseInt(e.target.dataset.ishidden))
      : e.target.value;
    api.setCVHeaderFields(props.uniqueId, index, value, toggleHide);
  };
  const setCVImage = (e) => {
    api.setCVImage(e.target.files[0]);
  };

  const componentHideHandler = () => {
    api.hideComponent(props, props.uniqueId);
  };
  const data = props.data;
  const src = api.state.imageURL
    ? URL.createObjectURL(api.state.imageURL)
    : null;
  if (!data) return null;
  return (
    <div>
      <div className='flex'>
        <div className='ml-auto'>
          <Hide clickHandler={componentHideHandler} hide={props.hide} />
        </div>
      </div>
      <HeaderName headerName={props.headerName} uniqueId={props.uniqueId} />
      {api.cv === null ? null : (
        <>
          <section
            className={`${headerContainer + " " + border} mt-2 py-1 px-3`}
            style={{ flexDirection: "column" }}>
            <div>
              <Image src={src} api={api} setCVImage={setCVImage} />
            </div>
            <br />
            <hr />
            {/* <div className='grid grid-cols-2'> */}
            <div className='form-group text-left mt-4'>
              <label className='flex' htmlFor='i1'>
                <strong>Name </strong> &nbsp; (optional) &nbsp;
                <span
                  name='Name'
                  // TODO: Make it toggle
                  data-ishidden={data[0].hide === true ? 1 : 0}
                  onClick={(e) => setCVFunc(e, 0, true)}
                  className={hideContainer}>
                  <span className={hideSpan}>
                    {data[0].hide ? <EyeOffIcon /> : <EyeIcon />}
                  </span>
                </span>
              </label>
              <input
                id='i1'
                className='form-control'
                placeholder='Name'
                value={data[0].name}
                type='text'
                name='Name'
                onChange={(e) => setCVFunc(e, 0, false)}
              />
            </div>
            <div className='form-group text-left mt-4'>
              <label className='flex' htmlFor=''>
                <strong>Designation </strong> &nbsp; (optional) &nbsp;
                <span
                  name='Name'
                  // TODO: Make it toggle
                  data-ishidden={data[1].hide === true ? 1 : 0}
                  onClick={(e) => setCVFunc(e, 1, true)}
                  className={hideContainer}>
                  <span className={hideSpan}>
                    {data[1].hide ? <EyeOffIcon /> : <EyeIcon />}
                  </span>
                </span>
              </label>
              <input
                className='form-control'
                placeholder='Your Designation'
                value={data[1].name}
                type='text'
                name='Name'
                onChange={(e) => setCVFunc(e, 1, false)}
              />
            </div>
            {/* </div> */}

            <div className='form-group text-left mt-4'>
              <label className='flex' htmlFor=''>
                <strong>Description </strong> &nbsp; (optional) &nbsp;
                <span
                  name='Name'
                  // TODO: Make it toggle
                  data-ishidden={data[2].hide === true ? 1 : 0}
                  onClick={(e) => setCVFunc(e, 2, true)}
                  className={hideContainer}>
                  <span className={hideSpan}>
                    {data[2].hide ? <EyeOffIcon /> : <EyeIcon />}
                  </span>
                </span>
              </label>
              <textarea
                rows={5}
                className='form-control'
                placeholder='Tell about yourself'
                value={data[2].name}
                type='text'
                name='Name'
                onChange={(e) => setCVFunc(e, 2, false)}
              />
            </div>
            {/* <CustomFieldLayout api={api} /> */}
          </section>
          <div className={`${headerContainer} mt-5 px-2 py-3 ${border}`}>
            <p className='text-justify'>
              {" "}
              <strong>
                {" "}
                * Attach Your Profile Information ( e.g. Email, Phone Number,
                Facebook, Github, Dribbble, etc.){" "}
              </strong>{" "}
            </p>
            <br />
            <hr />
            <CustomFieldSection data={data} api={api} />
            <HeaderExtraField />
          </div>
        </>
      )}
    </div>
  );
};

const Image = ({ api, src, setCVImage }) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const hideHandler = () => {
    api.imageHideHandler();
  };
  const deleteHandler = async () => {
    // TODO:   Alert !!!!!
    setDeleting(true);
    try {
      const res = await deleteImageApiCall(api.userId, api.currentResumeId)
      if (res && res.status === 200) {
        api.setImageURL("");
      }
    } catch (err) {
        if (
          err &&
          err.response &&
          err.response.status &&
          err.response.status === 500 &&
          err.response.message
        ){
          alert(err.response.message);
      };  
    }
    setDeleting(false);
  };
  const uploadHandler = async (e) => {
    if (api.userId === null) {
      alert('Login to upload image');
      return;
    }
    setUploading(true);
    const data = e.target.files[0];
    //console.log(data);
    const formData = new FormData();
    formData.append("image", data);
    formData.append("upload_preset", "f7nqftjh");
    // https://api.cloudinary.com/v1_1/dzre1jnob/image/upload
    try {
      const res = await uploadImageApiCall(formData, api.userId, api.currentResumeId);
      if (res && res.status === 201 && res.data && res.data.URL) {
        api.setImageURL(res.data.URL);
      }
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.status &&
        err.response.status === 500 &&
        err.response.message
      ){
        alert(err.response.message);
    };
    }
    setUploading(false);
  };

  return (
    <div className=''>
      {src ? (
        <img
          src={src}
          className='mx-auto'
          alt=''
          style={{
            borderRadius: "100%",
            maxWidth: "100px",
            maxHeight: "100px",
          }}
        />
      ) : (
        <UserCircleIcon
          className='mx-auto'
          style={{
            borderRadius: "100%",
            maxWidth: "100px",
            maxHeight: "100px",
          }}
        />
      )}
      <label className='bg-black mx-auto cursor-pointer text-white w-28 flex rounded'>
        <CloudUploadIcon className='w-6 mx-auto' />
        <input
          className='hidden mx-auto'
          type='file'
          id='img'
          name='image'
          accept='image/*'
          onChange={(e) => uploadHandler(e)}
        />
        <span className='mx-auto my-auto'>
          {uploading ? <Loader size='spinner-border-sm' /> : "Upload"}
        </span>
      </label>
      {api.state.imageConfig.URL ? (
        <div className='flex justify-center'>
          <span onClick={hideHandler} className={hideContainer}>
            <span className={hideSpan}>
              {api.state.imageConfig.hide ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </span>
          <span onClick={deleteHandler} className={deleteContainer}>
            <span className={deleteSpan}>
              {deleting ? <Loader size='spinner-border-sm' /> : <TrashIcon />}
            </span>
          </span>
        </div>
      ) : null}
    </div>
  );
};
