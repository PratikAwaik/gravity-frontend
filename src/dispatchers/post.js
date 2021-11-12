import axios from "axios";
import {
  editPostAction,
  getPostAction,
  handlePostDownvoteAction,
  handlePostUpvoteAction,
  unsetPostAction,
} from "../actions/post";
import { setError } from "../helpers";
import userConfig from "../configs/userConfig";

const baseUrl = `${process.env.REACT_APP_API_URL}/api/forums`;

export const getPostDispatcher = async (dispatch, postId, history) => {
  try {
    const response = await axios.get(`${baseUrl}/${postId}`);
    dispatch(getPostAction(response.data));
  } catch (error) {
    history.replace("/404");
    setError(dispatch, error);
  }
};

export const unsetPostDispatcher = (dispatch) => {
  dispatch(unsetPostAction());
};

export const editPostDispatcher = async (dispatch, userToken, postData) => {
  try {
    await axios.patch(
      `${baseUrl}/${postData.id}/edit`,
      postData,
      userConfig(userToken)
    );
    dispatch(editPostAction(postData));
  } catch (error) {
    setError(dispatch, error);
  }
};

export const deletePostDispatcher = async (dispatch, userToken, postId) => {
  try {
    await axios.delete(`${baseUrl}/${postId}`, userConfig(userToken));
  } catch (error) {
    setError(dispatch, error);
  }
};

export const handlePostUpvoteDispatcher = async (
  dispatch,
  postId,
  upvotesData,
  userToken
) => {
  try {
    dispatch(handlePostUpvoteAction(upvotesData));
    await axios.patch(
      `${baseUrl}/${postId}/upvote`,
      upvotesData,
      userConfig(userToken)
    );
  } catch (error) {
    setError(dispatch, error);
  }
};

export const handlePostDownvoteDispatcher = async (
  dispatch,
  postId,
  downvotesData,
  userToken
) => {
  try {
    dispatch(handlePostDownvoteAction(downvotesData));
    await axios.patch(
      `${baseUrl}/${postId}/downvote`,
      downvotesData,
      userConfig(userToken)
    );
  } catch (error) {
    setError(dispatch, error);
  }
};
