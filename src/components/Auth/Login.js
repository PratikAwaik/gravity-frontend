import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { setErrorAction } from "../../actions/error";
import { loginUserDispatcher } from "../../dispatchers/user";
import FormInput from "./FormInput";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { currentUser, error } = useSelector((state) => state);

  useEffect(() => {
    if (currentUser.id) {
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }

    return () => setErrorAction({});
  }, [currentUser, history, location.state]);

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserDispatcher(dispatch, userInfo);
  };

  return (
    <div className="login-form-container w-screen h-screen flex items-center justify-center overflow-hidden -mt-16">
      <div className="login-form-wrapper sm:border-2 sm:border-theme-green rounded-lg p-4 w-96 relative">
        <h2 className="text-3xl mb-6 text-center">Welcome back</h2>
        <form onSubmit={handleSubmit} className="w-100 mb-5">
          <div className="mb-4 flex flex-col items-start">
            <FormInput
              type="text"
              name="username"
              label="Username"
              value={userInfo.username}
              handleChange={handleInputChange}
            />
          </div>

          <div className="mb-6 flex flex-col items-start">
            <FormInput
              type="password"
              name="password"
              label="Password"
              value={userInfo.password}
              handleChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <button
              className="mb-4 px-5 py-2 w-full bg-theme-green text-theme-white rounded-lg"
              type="submit"
            >
              Log In
            </button>
            <p className="text-center mb-4">
              Haven't signed up yet?
              <Link className="text-theme-orange underline ml-1" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
        {error.error && (
          <div className="absolute bottom-0 left-0 text-theme-white bg-theme-red w-full pb-1 rounded-b-md">
            <span className="text-sm w-full flex items-start justify-center mt-1">
              <i className="ri-information-line text-sm mr-1"></i>
              {error.error}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
