import React from "react";
import { NavLink as Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavLink = ({ label, slug }) => {
  return (
    <Link
      to={slug}
      activeClassName="bg-gray-300"
      exact
      className="mx-2 rounded-md hover:bg-gray-300 px-2 border border-gray-300 shadow-sm text-md py-1"
    >
      {label}
    </Link>
  );
};

NavLink.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default NavLink;
