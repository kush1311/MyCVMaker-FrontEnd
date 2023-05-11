import React, { Suspense, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import n from "./Navbar.module.css";
import { AuthContext } from "../../ProtectedRoutes/AuthenticationApi";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import { logout_Api_Call } from "../../../utils/apiCalls";
const Down = React.lazy(() => import("../HiddenPdf/Down/Down"));

const Navbar = () => {
  const api = useContext(Context);
  const authApi = useContext(AuthContext);
  const history = useHistory();
  const handler = async () => {
    // const res = await logout_Api_Call();
    const rId = localStorage.getItem("%su!I#d");
    const uId = localStorage.getItem("%ru!I#d");
    if (localStorage.getItem("store") && !rId && !uId) {
      localStorage.removeItem("store");
    }
    localStorage.removeItem("%su!I#d");
    localStorage.removeItem("%ru!I#d");
    // history.replace("/");
    // authApi.authenticated(false);
  };
  return (
    <nav className={`${n.nav} bg-stone-900 text-stone-200`}>
      <ul className={n.ul}>
        {/* <button className={n.buttons + " btn btn-sm"} onClick={goToHome}>
          Home
        </button> */}
        <button
          className={n.buttons + " btn btn-sm hover:text-white"}
          onClick={api.toggleFullscreen}>
          <div className='flex my-auto mx-auto'>
            <span className='p-0 my-auto'>FullScreen</span>
            <div className='w-7 mr-2'>
              <ArrowsExpandIcon />
            </div>
          </div>
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          <Down
            className={
              n.buttons +
              " btn btn-sm bg-lime-600 hover:bg-lime-700 hover:text-white"
            }
            api={api}
          />
        </Suspense>
        <a
          href='/'
          className={
            n.signoutbutton +
            " btn btn-sm text-red-600 hover:text-white hover:bg-red-700 "
          }
          onClick={handler}>
          Logout
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
