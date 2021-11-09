import axios from "axios";
import {
  getCurrentUserDetailsAction,
  loginUserAction,
  registerUserAction,
  updateCurrentUserAction,
  updateCurrentUserSubscriptionAction,
  updateCurrentUserVotesAction,
} from "../actions/currentUser";
import { setErrorAction } from "../actions/error";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/users";

export const getSingleUserDispatcher = async (dispatch, id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    dispatch(getCurrentUserDetailsAction(response.data));
  } catch (err) {
    dispatch(setErrorAction(err.response.data));
  }
};

export const registerUserDispatcher = async (dispatch, userInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, userInfo);
    dispatch(registerUserAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const loginUserDispatcher = async (dispatch, userInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, userInfo);
    dispatch(loginUserAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const currentUserDetailsDispatcher = async (dispatch) => {
  const { id } = JSON.parse(window.localStorage.getItem("loggedInGravityUser"));
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    dispatch(getCurrentUserDetailsAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const updateCurrentUserVotesDispatcher = (dispatch, data) => {
  dispatch(updateCurrentUserVotesAction(data));
};

export const updateCurrentUserSubscriptionDispatcher = (dispatch, data) => {
  dispatch(updateCurrentUserSubscriptionAction(data));
};

export const updateCurrentUserDispatcher = async (dispatch, data) => {
  const { id } = JSON.parse(window.localStorage.getItem("loggedInGravityUser"));
  try {
    await axios.patch(`${baseUrl}/${id}/update`, data);
    dispatch(updateCurrentUserAction(data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};
