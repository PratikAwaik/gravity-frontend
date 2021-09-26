import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const NavLink = ({ label, slug }) => {
  const { pathname } = useLocation();
  const selectedStyle =
    pathname === slug ? "bg-theme-green text-theme-white" : "";

  return (
    <Link
      to={slug}
      className={`mx-4 text-md rounded-md ${selectedStyle} px-3 py-1 hover:bg-theme-green hover:text-theme-white`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
