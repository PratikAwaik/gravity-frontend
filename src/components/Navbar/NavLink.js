import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const NavLink = ({ label, slug }) => {
  const { pathname } = useLocation();

  return (
    <Link 
      to={slug}
      className={`mx-4 text-md rounded-md ${pathname === slug ? 'bg-theme-orange  text-theme-black' : ''} px-2 py-1 hover:bg-theme-orange hover:text-theme-black`}
    >
      {label}
    </Link>
  );
}

export default NavLink;