import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { registerUserDispatcher } from "../../dispatchers/user";
import FormInput from "./FormInput";

import astronautIcon from "../../images/astronaut.png";
import { setErrorAction } from "../../actions/error";
import { displayError } from "../../helpers";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (currentUser.id) {
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }

    return () => setErrorAction({});
  }, [currentUser, location, history]);

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUserDispatcher(dispatch, {
      ...userInfo,
      profilePic: astronautIcon,
    });
  };

  return (
    <div className="register-form-container w-screen h-screen flex items-center justify-center overflow-hidden -mt-16">
      <div className="register-form-wrapper border-2 border-theme-green rounded-lg p-4 w-96">
        <h2 className="text-3xl mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4 flex flex-col items-start w-full">
            <FormInput
              type="text"
              name="username"
              label="Username"
              value={userInfo.username}
              handleChange={handleInputChange}
              error={error.error && error.error.username}
              extraProps={{
                minLength: "3",
                maxLength: "21",
                pattern: "^[a-zA-Z0-9_]+$",
              }}
            />
            <div className="flex items-start mt-2 text-gray-500 text-sm">
              <i className="ri-information-line mr-2 text-xl"></i>
              <span>
                Usernames cannot have spaces (e.g. "goodusername" not "good
                username"), must be between 3-21 characters, and underscores
                ("_") are the only special characters allowed.
              </span>
            </div>
            {displayError(error.error && error.error.username)}
          </div>

          <div className="mb-4 flex flex-col items-start w-full">
            <FormInput
              type="email"
              name="email"
              label="Email"
              value={userInfo.email}
              handleChange={handleInputChange}
              error={error.error && error.error.email}
            />
            {displayError(error.error && error.error.email)}
          </div>

          <div className="mb-6 flex flex-col items-start w-full">
            <FormInput
              type="password"
              name="password"
              label="Password"
              value={userInfo.password}
              handleChange={handleInputChange}
            />
            {displayError(error.error && error.error.password)}
          </div>

          <div className="mb-4 w-full">
            <button
              className="mb-4 px-5 py-2 w-full bg-theme-green rounded-lg text-theme-white"
              type="submit"
            >
              Register
            </button>
            <p className="text-center">
              Already signed up?{" "}
              <Link className="text-theme-orange underline" to="/login">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
