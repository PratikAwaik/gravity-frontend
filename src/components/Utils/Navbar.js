import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavLink from "./NavLink";
import { logoutUserAction } from "../../actions/currentUser";
import { useHistory } from "react-router";

const Navbar = () => {
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) history.push('/');
  }, [currentUser, history]);

  const handleLogout = () => {
    dispatch(logoutUserAction());
    history.push('/');
  }

  return (
    <div className="w-full fixed top-0 left-0 z-20 bg-theme-black shadow-md-purple">
      <nav className="w-full p-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Gravity</h1>
        </div>
        <div className="flex items-center">
          <NavLink label="Forums" slug="/" />
          <NavLink label="Blogs" slug="/blogs" />
          { !currentUser.id && <NavLink label="Sign Up" slug="/register" /> }
          { !currentUser.id && <NavLink label="Log In" slug="/login" /> }
          { currentUser.id && <NavLink label="Profile" slug={`/user/${currentUser.username}`} /> }
          { 
            currentUser.id && 
            <button 
              type="button" 
              className="mx-4 text-md rounded-md hover:bg-theme-orange hover:text-theme-black px-2 py-1"
              onClick={handleLogout}
            >
              Log Out
            </button> 
          }
        </div>
      </nav>
    </div>
  );
}

export default Navbar;