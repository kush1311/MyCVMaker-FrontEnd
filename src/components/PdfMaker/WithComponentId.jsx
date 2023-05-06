import React, { useContext } from "react";
import { Context } from "../GlobalContextApi/GlobalContextApi";

// const WithComponentId = ({ Component, data, uniqueId, }) => {
const WithComponentId = (props) => {
  const api = useContext(Context);
  const object = api.findByUniqueId(props.uniqueId);
  return <props.Component {...object} />;
};

export default WithComponentId;
