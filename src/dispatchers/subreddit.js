import axios from "axios";
import {
  createSubredditAction,
  getAllSubredditsAction,
  updateSubredditIconAction,
} from "../actions/subreddits";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/r";

export const getAllSubredditsDispatcher = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/all`);
    dispatch(getAllSubredditsAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const createSubredditDispatcher = async (
  dispatch,
  subredditData,
  userToken
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/create`,
      subredditData,
      config
    );
    dispatch(createSubredditAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const updateSubredditIconDispatcher = (dispatch, subredditId, icon) => {
  dispatch(updateSubredditIconAction({ subredditId, icon }));
};
