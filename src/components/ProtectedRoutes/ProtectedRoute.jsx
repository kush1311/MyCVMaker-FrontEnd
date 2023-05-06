import axios from "axios";
import React, { useContext } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { Context } from "../GlobalContextApi/GlobalContextApi";
import PdfMaker from "../PdfMaker/PdfMaker";
import { AuthContext } from "./AuthenticationApi";
const ProtectedRoute = (props) => {
  // const authApi = useContext(AuthContext);
  const api = useContext(Context);
  const history = useHistory();
  // if (authApi.isAuth) {
  //   const rId = localStorage.getItem("%su!I#d");
  //   if (!rId) {
  //   } else {
  //     const userId = localStorage.getItem("%su!I#d");
  //     if (!userId) {
  //       history.replace("/login");
  //     }
  //   }
  // } else {
  // }
  return (
    <>
      <Route path='/resume-builder' component={PdfMaker} />
    </>
  );
};

export default ProtectedRoute;
