import axios from "axios";
import { setErrorAction } from "../actions/error";
import {
  createSubredditAction,
  getAllSubredditsAction,
  updateSubredditIconAction,
} from "../actions/subreddits";

const baseUrl = "/api/r";

export const getAllSubredditsDispatcher = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/all`);
    dispatch(getAllSubredditsAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
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
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const updateSubredditIconDispatcher = (dispatch, subredditId, icon) => {
  dispatch(updateSubredditIconAction({ subredditId, icon }));
};
