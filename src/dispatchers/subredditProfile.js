import axios from "axios";
import {
  setSubredditAction,
  setSubredditPostsAction,
  setSubredditUsersAction,
} from "../actions/subredditProfile";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/r";

export const getSubredditDispatcher = async (
  dispatch,
  subredditId,
  history
) => {
  try {
    const response = await axios.get(`${baseUrl}/${subredditId}`);
    dispatch(setSubredditAction(response.data));
  } catch (error) {
    setError(dispatch, error);
    history.replace("/404");
  }
};

export const getSubredditUsersDispatchers = async (dispatch, subredditId) => {
  try {
    const response = await axios.get(`${baseUrl}/${subredditId}/users`);
    dispatch(setSubredditUsersAction(response.data));
  } catch (error) {
    setError(dispatch, error);
  }
};

export const getSubredditPostsDispatcher = async (
  dispatch,
  subredditId,
  { page, limit }
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${subredditId}/posts?page=${page}&limit=${limit}`
    );
    dispatch(setSubredditPostsAction(response.data.posts));
  } catch (error) {
    setError(dispatch, error);
  }
};
