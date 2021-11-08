import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavLink from "./NavLink";
import { logoutUserAction } from "../../actions/currentUser";
import { Link, useHistory } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import NavIcon from "./NavIcon";
import SearchInput from "./SearchInput";
import logo from "../../images/logo.svg";

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    dispatch(logoutUserAction());
    history.push("/");
  };

  return (
    <div className="w-full fixed top-0 left-0 z-40 shadow-md bg-white">
      <nav className="w-full px-2 sm:px-4 py-3 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Link to="/" className="mr-2 w-9 h-9 sm:mr-5 flex items-center">
            <img
              className="mr-2 w-full h-full"
              src={logo}
              alt="An astronaut floating in space."
            />
            <h1 className="text-2xl font-bold hidden xl:block">Gravity</h1>
          </Link>
        </div>

        <SearchInput />

        <div className="flex items-center sm:relative sm:w-max sm:border-none sm:py-0 fixed bottom-0 left-0 w-screen justify-between bg-white py-2 border-t-2 border-theme-green">
          {/* Home */}
          <NavIcon
            iconClass="ri-home-smile-2-line"
            slug="/"
            tooltipText="Home"
          />

          {/* Create Post */}
          <NavIcon
            iconClass="ri-add-line"
            slug="/forums/create"
            tooltipText="Create Post"
          />

          {currentUser.id && <ProfileDropdown handleSignOut={handleSignOut} />}

          {!currentUser.id && (
            <div className="flex items-center">
              <NavLink label="Sign Up" slug="/register" />
              <NavLink label="Log In" slug="/login" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
