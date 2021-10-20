import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavLink from "./NavLink";
import { logoutUserAction } from "../../actions/currentUser";
import { Link, useHistory } from "react-router-dom";
// import NavIcon from "./NavIcon";
import ProfileDropdown from "./ProfileDropdown";
import NavIcon from "./NavIcon";

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    dispatch(logoutUserAction());
    history.push("/");
  };

  return (
    <div className="w-full fixed top-0 left-0 z-20 shadow-md bg-white">
      <nav className="w-full p-4 flex items-center justify-between">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">Gravity</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center px-3">
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

            {currentUser.id && (
              <ProfileDropdown handleSignOut={handleSignOut} />
            )}
          </div>

          {!currentUser.id && <NavLink label="Sign Up" slug="/register" />}
          {!currentUser.id && <NavLink label="Log In" slug="/login" />}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
