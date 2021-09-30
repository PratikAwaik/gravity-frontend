import axios from "axios";
import {
  createCommentAction,
  getAllCommentsAction,
  handleCommentDownvoteAction,
  handleCommentUpvoteAction,
} from "../actions/comments";
import { setErrorAction } from "../actions/error";

const baseUrl = "/api/forums";

export const getAllCommentsDispatcher = async (dispatch, postId) => {
  try {
    const response = await axios.get(`${baseUrl}/${postId}/comments`);
    dispatch(getAllCommentsAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const createCommentDispatcher = async (
  dispatch,
  postId,
  userToken,
  commentData
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/${postId}/comments`,
      commentData,
      config
    );
    dispatch(createCommentAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const handleCommentUpvoteDispatcher = async (
  dispatch,
  postId,
  commentId,
  upvotesData,
  userToken
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/upvote`,
      upvotesData,
      config
    );
    dispatch(handleCommentUpvoteAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const handleCommentDownvoteDispatcher = async (
  dispatch,
  postId,
  commentId,
  downvotesData,
  userToken
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/downvote`,
      downvotesData,
      config
    );
    dispatch(handleCommentDownvoteAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};
