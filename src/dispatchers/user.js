import axios from "axios";
import { getCurrentUserDetailsAction, loginUserAction, registerUserAction } from "../actions/currentUser";
import { setErrorAction } from "../actions/error";

const baseUrl = '/api/users';

export const getSingleUserDispatcher = async (dispatch, id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    dispatch(getCurrentUserDetailsAction(response.data));
  } catch (err) {
    dispatch(setErrorAction(err.response.data));
  }
}

export const registerUserDispatcher = async (dispatch, userInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, userInfo);
    dispatch(registerUserAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
}

export const loginUserDispatcher = async (dispatch, userInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, userInfo);
    dispatch(loginUserAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
}

export const currentUserDetailsDispatcher = async (dispatch) => {
  const { id } = JSON.parse(window.localStorage.getItem('loggedInGravityUser'));
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    dispatch(getCurrentUserDetailsAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
}