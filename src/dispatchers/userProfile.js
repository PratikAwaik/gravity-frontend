import axios from "axios";
import {
  setUserAction,
  setUserCommentsAction,
  setUserPostsAction,
  setUserSubredditsAction,
  unsetUserAction,
} from "../actions/userProfile";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/users";

export const unsetUserDispatcher = async (dispatch) => {
  dispatch(unsetUserAction());
};

export const getUserDispatcher = async (dispatch, userId, history) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}`);
    dispatch(setUserAction(response.data));
  } catch (error) {
    setError(dispatch, error);
    history.replace("/404");
  }
};

export const getUserSubredditsDispatcher = async (dispatch, userId) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}/subreddits`);
    dispatch(setUserSubredditsAction(response.data));
  } catch (error) {
    setError(dispatch, error);
  }
};

export const getUserPostsDispatcher = async (
  dispatch,
  userId,
  { page, limit }
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${userId}/posts?page=${page}&limit=${limit}`
    );
    dispatch(setUserPostsAction(response.data.posts));
  } catch (error) {
    setError(dispatch, error);
  }
};

export const getUserCommentsDispatcher = async (
  dispatch,
  userId,
  { page, limit }
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${userId}/comments?page=${page}&limit=${limit}`
    );
    dispatch(setUserCommentsAction(response.data.comments));
  } catch (error) {
    setError(dispatch, error);
  }
};
