import { Link } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, FEEDBACK_ROUTE, RESUME_BUILDER_ROUTE, REGISTER_ROUTE } from "../../../constants/routes";
import {
    ChevronDoubleRightIcon,
    UserAddIcon,
    UserCircleIcon as UserIcon,
  } from "@heroicons/react/solid";
  import {
    HomeIcon,
    PencilAltIcon,
  } from "@heroicons/react/outline";

export const Footer = () => {
    const linkStyle =
      "p-2 hover:border-2 hover:border-yellow-400 hover:cursor-pointer hover:text-yellow-400 hover:no-underline flex mx-auto text-yellow-400 transition-all duration-200";
    const listItem = "flex";
    const iconClass = "w-4 mx-2";
    return (
      <footer className='mt-20 p-6 py-2 text-white bg-stone-800'>
        <div className='my-3 pl-5 mx-auto'>
          <ul className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
            <li className={listItem}>
              <Link className={linkStyle} to={HOME_ROUTE}>
                Home
                <HomeIcon className={iconClass} />
              </Link>
            </li>
            <li className={listItem}>
              <Link className={linkStyle} to={LOGIN_ROUTE}>
                Login
                <UserIcon className={iconClass} />
              </Link>
            </li>
            <li className={listItem}>
              <Link className={linkStyle} to={FEEDBACK_ROUTE}>
                Feedback
                <PencilAltIcon className={iconClass} />
              </Link>
            </li>
            <li className={listItem}>
              <Link className={linkStyle} to={RESUME_BUILDER_ROUTE}>
                Editor
                <ChevronDoubleRightIcon className={iconClass} />
              </Link>
            </li>
            <li className={listItem}>
              <Link className={linkStyle} to={REGISTER_ROUTE}>
                Register
                <UserAddIcon className={iconClass} />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  };