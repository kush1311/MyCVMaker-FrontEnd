import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../constants/routes";
import {
    UserAddIcon,
    UserCircleIcon as UserIcon,
  } from "@heroicons/react/solid";
import { NavbarHomeIcon } from "./HomeIcon";

export const HomePageNavbar = () => {
    const NavButtonClass =
      "mx-2 px-3 py-2 text-yellow-400 text-lg transition-all duration-300 rounded-lg cursor-pointer hover:bg-slate-100 hover:text-yellow-800 ease-in";
    return (
      <nav className='flex px-2 py-1 font-bold mb-5 bg-slate-700 border-b-2 border-stone-400'>
        <NavbarHomeIcon />
        <div className='flex ml-auto'>
          <Link
            to={LOGIN_ROUTE}
            style={{ textDecorationLine: "none" }}
            className={`${NavButtonClass} flex`}>
            Login
            <UserIcon className='ml-1 w-7 text-lg' />
          </Link>
          <Link
            to='./register'
            style={{ textDecorationLine: "none" }}
            className={`${NavButtonClass} flex`}>
            Register <UserAddIcon className='ml-1 w-6 text-lg' />
          </Link>
          {/* <span className={`${NavButtonClass}`}>About</span> */}
        </div>
      </nav>
    );
  };