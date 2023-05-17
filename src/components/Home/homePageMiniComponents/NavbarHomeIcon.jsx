import { HOME_ROUTE } from "../../../constants/routes"
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/outline";

export const NavbarHomeIcon = () => {
    return (
      <span className='px-3 text-center flex'>
      <Link to={HOME_ROUTE} style={{ textDecorationLine: "none" }} className='my-auto'>
        <span className='flex w-8 text-yellow-400'>
          <HomeIcon />
        </span>
      </Link>
    </span>
    )
}