import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const NavLink = ({ label, slug }) => {
  const { pathname } = useLocation();
  const selectedStyle = pathname === slug ? "bg-gray-300" : "";

  return (
    <Link
      to={slug}
      className={`mx-2 rounded-md hover:bg-gray-300 px-2 border border-gray-300 shadow-sm text-md ${selectedStyle} px-3 py-1`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
