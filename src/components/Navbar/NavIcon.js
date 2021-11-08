import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NavIcon = ({ iconClass, slug, tooltipText }) => {
  const { pathname } = useLocation();
  const selectedStyle = pathname === slug ? "bg-gray-300" : "";

  return (
    <div className="relative mx-2 inline-block tooltip">
      <Link
        to={slug}
        className={`flex items-center rounded-md hover:bg-gray-300 px-2 ${selectedStyle}`}
      >
        <i className={`${iconClass} text-xl p-1`}></i>
      </Link>
      {tooltipText && (
        <span className="invisible text-sm w-32 bg-gray-800 text-white text-center rounded-md p-1 absolute bottom-3/4 left-2/4 -m-16 tooltip-text z-20">
          {tooltipText}
        </span>
      )}
    </div>
  );
};

NavIcon.propTypes = {
  iconClass: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
};

export default NavIcon;
