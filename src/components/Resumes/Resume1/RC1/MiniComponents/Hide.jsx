import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import React from "react";
import { hideContainer, hideSpan } from "../../../../../constants/styles";

export default function Hide(props) {
  const { hide, clickHandler } = props;
  return (
    <div
      onClick={clickHandler}
      className={hideContainer + " bg-white border-2 border-blue-300"}>
      <span className='ml-auto'>
        <span className={hideSpan + " w-6"}>
          {hide ? <EyeOffIcon /> : <EyeIcon />}
        </span>
      </span>
    </div>
  );
}