import { TrashIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { deleteContainer, deleteSpan } from "../../../../../constants/styles";
import { Context } from "../../../../GlobalContextApi/GlobalContextApi";

export const Delete = (props) => {
  const api = useContext(Context);
  const { uniqueId } = props;
  const clickHandler = () => {
    api.deleteComponent(uniqueId);
  };
  return (
    <span onClick={clickHandler} className={deleteContainer}>
      <span className={deleteSpan + " w-6"}>
        <TrashIcon />
      </span>
    </span>
  );
};
