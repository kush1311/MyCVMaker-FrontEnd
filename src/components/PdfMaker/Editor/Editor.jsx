import axios from "axios";
import React, { Component, useContext, useState } from "react";
import { Loader } from "../../../constants/Loader";
import { Context } from "../../GlobalContextApi/GlobalContextApi";

const Editor = (props) => {
  const api = useContext(Context);
  const [saving, setSave] = useState(false);
  const saveHandler = () => {
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
  return (
    <div className='relative'>
      <div
        className='overflow-x-hidden overflow-y-auto w-100 pb-16'
        style={{ maxHeight: "89vh", height: "88vh" }}>
        {api.state.editor}
      </div>
      <div className='flex po'>
        <button
          className={`mx-auto absolute px-20 bg-blue-600 btn text-white btn-md bottom-0 bg-fuchsia-700 shadow-fuchsia-800 shadow-2xl`}
          onClick={saveHandler}>
          {saving ? <Loader /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Editor;
