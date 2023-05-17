import React, { Suspense, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import n from "./Navbar.module.css";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import { logoutApiCall } from "../../../utils/apiCalls";
import { HOME_ROUTE } from "../../../constants/routes";
import { useEffect } from "react";
import { NavbarHomeIcon } from "../../Home/homePageMiniComponents/NavbarHomeIcon";

const Down = React.lazy(() => import("../HiddenPdf/Down/Down"));

const Navbar = () => {
  const api = useContext(Context);
  const history = useHistory();

  const handleLogout = async () => {
    console.log('api.disableLogoutButton');
    console.log(api.disableLogoutButton);
    if (api.disableLogoutButton) {
      alert("Can't perform logout");
      return;
    }
    try {
      await logoutApiCall();
      localStorage.removeItem("store");
      history.replace(HOME_ROUTE);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong, can't log you out")
    }
  };

  useEffect(()=>{
    if (api.networkError) {
      if (localStorage.getItem('store')) {
        if (!api.disableLogoutButton) {
          api.handleLogoutVisibility('DISABLE', true);
        }
      } else {
        if (!api.removeLogoutButton) {
          api.handleLogoutVisibility('REMOVE', true);
        }
      }
    }
    if (api.isUserLoggedIn === false && !api.removeLogoutButton) {
        api.handleLogoutVisibility('REMOVE', true);
    }
  }, []);
  return (
    <nav className={`${n.nav} bg-stone-900 text-stone-200`}>
      <ul className={n.ul}>
      <NavbarHomeIcon/>
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
        {
          api.removeLogoutButton ? (<></>) : (
          <Link
          className={
            n.signoutbutton +
            " btn btn-sm text-red-600 hover:text-white hover:bg-red-700 "
          }
          onClick={handleLogout}>
          Logout
        </Link>
        )
        }
      </ul>
    </nav>
  );
};

export default Navbar;
