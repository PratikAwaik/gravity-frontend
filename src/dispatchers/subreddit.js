import axios from "axios";
import {
  createSubredditAction,
  getAllSubredditsAction,
  setSearchSubredditsAction,
  updateSubredditIconAction,
} from "../actions/subreddits";
import { setError } from "../helpers";
import userConfig from "../configs/userConfig";

const baseUrl = process.env.REACT_APP_API_URL + "/api/r";

export const getAllSubredditsDispatcher = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/all`);
    dispatch(getAllSubredditsAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const setSearchSubredditsDispatcher = async (
  dispatch,
  { searchString }
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search?search=${searchString}`
    );
    dispatch(setSearchSubredditsAction(response.data));
  } catch (error) {
    setError(dispatch, error);
  }
};

export const createSubredditDispatcher = async (
  dispatch,
  history,
  subredditData,
  userToken
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/create`,
      subredditData,
      userConfig(userToken)
    );
    dispatch(createSubredditAction(response.data));
    history.push(`/r/${response.data.id}`);
  } catch (err) {
    setError(dispatch, err);
  }
};

export const updateSubredditIconDispatcher = async (
  dispatch,
  subredditId,
  data,
  userToken
) => {
  await axios.patch(
    `${baseUrl}/${subredditId}/update`,
    data,
    userConfig(userToken)
  );
  dispatch(
    updateSubredditIconAction({ subredditId, icon: data.communityIcon })
  );
};
