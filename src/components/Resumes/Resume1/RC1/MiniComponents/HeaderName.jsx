import { EyeIcon, PencilIcon, XIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import { border, headerContainer } from "../../../../../constants/styles";
import { Context } from "../../../../GlobalContextApi/GlobalContextApi";

const HeaderName = (props) => {
  const [editHeader, setEditHeader] = useState(false);
  const api = useContext(Context);
  const name = props.headerName;
  const text = name.substring(0, 2) === "%!" && name.length > 10 ? "" : name;
  return (
    <div className={`flex justify-center`}>
      {editHeader ? (
        <div className='form-group'>
          <input
            value={text}
            className='form-control'
            onChange={(e) =>
              api.setCVFSectionHeaderName(e.target.value, props.uniqueId)
            }
          />
        </div>
      ) : (
        <span className='text-xl'>{text}</span>
      )}
      {text === "Header" ? null : (
        <Edit editHeader={editHeader} setEditHeader={setEditHeader} />
      )}
    </div>
  );
};

const Edit = (props) => {
  const { setEditHeader, editHeader } = props;
  return (
    <div className='p-0 ml-2'>
      {editHeader ? (
        <button
          className='btn btn-lg btn-danger flex'
          onClick={() => setEditHeader(false)}>
          <span onClick={() => setEditHeader(false)} className='w-4 my-auto'>
            <XIcon />
          </span>
        </button>
      ) : (
        <button
          onClick={() => setEditHeader(true)}
          className='btn btn-secondary btn-sm flex rounded m-0'>
          <span
            onClick={() => setEditHeader(true)}
            className='w-4 my-auto mx-2'>
            <PencilIcon />
          </span>
        </button>
      )}
    </div>
  );
};
export default HeaderName;
