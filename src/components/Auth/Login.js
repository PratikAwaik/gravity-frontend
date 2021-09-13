import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { loginUserAction } from "../../actions/user";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.id) history.push('/');
  }, [user, history]);

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  } 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(userInfo));
  }

  return (
    <div className="login-form-container w-screen h-screen flex items-center justify-center overflow-hidden -mt-16">
      <div className="login-form-wrapper border-2 border-theme-purple rounded-lg p-4 w-96 relative">
        <h2 className="text-3xl mb-6 text-center">Welcome back</h2>
        <form onSubmit={handleSubmit} className="w-100 mb-5">
          <div className="mb-4 flex flex-col items-start">
            <label htmlFor="username" className="mb-1">Username</label>
            <input autoComplete="off" className="p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none w-full" type="text" name="username" id="username" value={userInfo.username} onChange={handleInputChange} required />
          </div>

          <div className="mb-6 flex flex-col items-start">
            <label htmlFor="password" className="mb-1">Password</label>
            <input autoComplete="off" className="p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none w-full" type="password" name="password" id="password" value={userInfo.password} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <button className="mb-4 px-5 py-2 w-full bg-theme-purple text-theme-white rounded-lg" type="submit">Log In</button>
            <p className="text-center mb-4">Haven't signed up yet? <Link className="text-theme-orange underline" to="/register">Sign Up</Link></p>
          </div>

        </form>
        { 
          user.error && 
          <div className="absolute bottom-0 left-0 bg-theme-red w-full pb-1 rounded-b-md">
            <span className="text-sm w-full flex items-start justify-center mt-1"><i className="ri-information-line text-sm mr-1"></i>{ user.error }</span>
          </div>
        }
      </div>
    </div>
  );
}

export default Login;