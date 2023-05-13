import axios from "axios";
import React, { Component, useContext, useState } from "react";
import { Loader } from "../../../constants/Loader";
import { Context } from "../../GlobalContextApi/GlobalContextApi";

const Editor = (props) => {
  const api = useContext(Context);
  const [saving, setSave] = useState(false);
  const saveHandler = () => {
    if (api.disableSaveButton) {
      if (api.networkError) {
        alert("Network Error");
      } else if (api.isUserLoggedIn === false) {
        alert("Please login !!");
      }
      return;
    };
    const rId = localStorage.getItem("%ru!I#d");
    const uId = localStorage.getItem("%su!I#d");
    if (!uId) {
      alert("Not Logged In");
      return;
    }
    setSave(true);
    axios
      .put(
        `${process.env.REACT_APP_URL}/resume/${localStorage.getItem(
          "%ru!I#d"
        )}`,
        {
          userId: localStorage.getItem("%su!I#d"),
          cv: api.cv,
          styles: api.styles,
          rows: api.state.rows,
          footer: api.state.footer,
          imageConfig: api.state.imageConfig,
          headerListItemConfig: api.state.headerListItemConfig,
          skillsItemConfig: api.state.skillsItemConfig,
          headerLayout: api.state.headerLayout,
          headerCustomFieldLayout: api.state.headerCustomFieldLayout,
          headingLayout: api.state.headingLayout,
          version: api.state.version,
        }
      )
      .then((res) => {
        setSave(false);
      })
      .catch((err) => {
        setSave(false);
        //console.log(err.message);
        if (
          err &&
          err.response &&
          err.response.status &&
          err.response.status === 401
        ) {
          localStorage.removeItem("%su!I#d");
          localStorage.removeItem("%ru!I#d");
        }
      });
  };
  const getSaveButtonClassName = () => {
    let classNames = 'mx-auto absolute px-20 bg-blue-600 btn text-white btn-md bottom-0 shadow-fuchsia-800 shadow-2xl'
    classNames = `${classNames} ${api.disableSaveButton ? 'bg-slate-500' : 'bg-fuchsia-700'}`
    return classNames;
  }
  if ((api.isUserLoggedIn === false || api.networkError) && !api.disableSaveButton) {
    api.handleSaveButtonVisibility(true);
  }
  return (
    <div className='relative'>
      <div
        className='overflow-x-hidden overflow-y-auto w-100 pb-16'
        style={{ maxHeight: "89vh", height: "88vh" }}>
        {api.state.editor}
      </div>
      <div className='flex po'>
        <div
          className={getSaveButtonClassName()}
          onClick={saveHandler}>
          {saving ? <Loader /> : "Save"}
        </div>
      </div>
    </div>
  );
};

export default Editor;
