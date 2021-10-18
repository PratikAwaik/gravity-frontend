import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavLink from "./NavLink";
import { logoutUserAction } from "../../actions/currentUser";
import { Link, useHistory, useLocation } from "react-router-dom";
// import NavIcon from "./NavIcon";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const { pathname } = useLocation();
  const selectedStyle = (slug) => (pathname === slug ? "bg-gray-300" : "");

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
            <div className="relative mx-2 inline-block tooltip">
              <Link
                to="/"
                className={`flex items-center rounded-md hover:bg-gray-300 p-2 ${selectedStyle(
                  "/"
                )}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
              <span className="invisible text-sm w-32 bg-gray-800 text-white text-center rounded-md p-1 absolute bottom-3/4 left-2/4 -m-16 tooltip-text z-20">
                Home
              </span>
            </div>

            {/* Create Post */}
            <div className="relative mx-2 inline-block tooltip">
              <Link
                to="/forums/create"
                className={`flex items-center rounded-md hover:bg-gray-300 p-2 ${selectedStyle(
                  "/forums/create"
                )}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Link>
              <span className="invisible text-sm w-32 bg-gray-800 text-white text-center rounded-md p-1 absolute bottom-3/4 left-2/4 -m-16 tooltip-text z-20">
                Create Post
              </span>
            </div>

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
