import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavIcon = ({ icon, slug, tooltipText }) => {
  const { pathname } = useLocation();
  const selectedStyle = pathname === slug ? "bg-gray-300" : "";

  return (
    <div className="relative mx-2 inline-block tooltip">
      <Link
        to={slug}
        className={`flex items-center rounded-md hover:bg-gray-300 px-2 border border-gray-300 shadow-sm ${selectedStyle}`}
      >
        {icon}
      </Link>
      {tooltipText && (
        <span className="invisible text-sm w-32 bg-gray-800 text-white text-center rounded-md p-1 absolute bottom-3/4 left-2/4 -m-16 tooltip-text z-20">
          {tooltipText}
        </span>
      )}
    </div>
  );
};

export default NavIcon;
