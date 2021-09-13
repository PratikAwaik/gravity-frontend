import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUserAction } from "../../actions/user";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const history = useHistory();

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
    dispatch(registerUserAction(userInfo));
  }

  return (
    <div className="register-form-container w-screen h-screen flex items-center justify-center overflow-hidden -mt-16">
      <div className="register-form-wrapper border-2 border-theme-purple rounded-lg p-4 w-96">
        <h2 className="text-3xl mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="w-full">

          <div className="mb-4 flex flex-col items-start w-full">
            <label htmlFor="username" className="mb-1">Username</label>
            <input autoComplete="off" className="w-full p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none focus-within::bg-transparent" type="text" name="username" id="username" value={userInfo.username} onChange={handleInputChange} required />
            { user.error && user.error.username && <span className="text-sm text-theme-red w-full flex items-start mt-1"><i className="ri-information-line text-theme-red text-sm mr-1"></i>{ user.error.username.message }</span> }
          </div>

          <div className="mb-4 flex flex-col items-start w-full">
            <label htmlFor="email" className="mb-1">Email</label>
            <input autoComplete="off" className="w-full p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none" type="email" name="email" id="email" value={userInfo.email} onChange={handleInputChange} required />
            { user.error && user.error.email && <span className="text-sm text-theme-red w-full flex items-start mt-1"><i className="ri-information-line text-theme-red text-sm mr-1"></i>{ user.error.email.message }</span> }
          </div>

          <div className="mb-6 flex flex-col items-start w-full">
            <label htmlFor="password" className="mb-1">Password</label>
            <input className="w-full p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none" type="password" name="password" id="password" value={userInfo.password} onChange={handleInputChange} required />
            { user.error && user.error.password && <span className="text-sm text-theme-red w-full flex items-start mt-1"><i className="ri-information-line text-theme-red text-sm mr-1"></i>{ user.error.password.message }</span> }
          </div>

          <div className="mb-4 w-full">
            <button className="mb-4 px-5 py-2 w-full bg-theme-purple rounded-lg text-theme-white" type="submit">Register</button>
            <p className="text-center">Already signed up? <Link className="text-theme-orange underline" to="/login">Log In</Link></p>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Register;