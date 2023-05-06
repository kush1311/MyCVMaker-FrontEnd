import { PlusIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import Design from "../Design/Design";
import Footer from "./../../Resumes/Resume1/RC1/Footer";

const Sidebar = () => {
  const api = useContext(Context);
  const [n, setN] = useState("-1");
  const [m, setM] = useState("-1");
  const setSelected1 = (num) => {
    setM("-1");
    setN(num);
  };
  const setSelected2 = (num) => {
    setN("-1");
    setM(num);
  };
  const section1ClickHandler = (component, num) => {
    api.setEditor(false, component, null, null);
    setSelected1(num);
  };
  const section2ClickHandler = (obj, num) => {
    api.setEditor(
      true,
      obj.componentId,
      obj.data,
      obj.uniqueId,
      obj.headerName
    );
    setSelected2(num);
  };
  const nav = {
    ul: "flex flex-col",
    buttons: "border-2 border-blue-500 rounded shadow-black shadow sm:mx-2",
    bg: "bg-blue-100",
    sbg: "bg-blue-700 text-white",
  };
  const giveClsName1 = (num) => {
    const s = `${nav.buttons} my-2 px-1 py-2`;
    const bg = num === n ? nav.sbg : nav.bg;
    return s + " " + bg;
  };
  const giveClsName2 = (num) => {
    const s = `${nav.buttons} my-2 px-1 py-2`;
    const bg = num === m ? nav.sbg : nav.bg;
    return s + " " + bg;
  };

  return (
    <div className={"sections ml-2"}>
      <div
        className={
          nav.ul +
          " m-0 sm:flex sm:flex-row sm:flex-wrap md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col 2xl:flex 2xl:flex-col"
        }>
        <button
          onClick={() => section1ClickHandler(<Design />, "0")}
          className={giveClsName1("0")}>
          Design
        </button>
        <button
          onClick={() =>
            api.setSideBar(
              "Custom Section",
              new Date().getTime().toString(),
              "customComponent"
            )
          }
          className='mx-3 my-3 btn btn-lg bg-fuchsia-600 text-white rounded flex shadow-md shadow-black'>
          <span className='w-6 mx-auto'>
            <PlusIcon />
          </span>
        </button>
        <button
          onClick={() => section1ClickHandler(<Footer />, "2")}
          className={giveClsName1("2")}>
          Footer
        </button>
        <hr />
        {api.cv &&
          api.cv.length &&
          api.cv.map((obj, i) => {
            // //console.log(obj);
            return (
              <button
                key={i}
                className={giveClsName2(i.toString())}
                onClick={() => section2ClickHandler(obj, i.toString())}>
                {obj.headerName}
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default Sidebar;
