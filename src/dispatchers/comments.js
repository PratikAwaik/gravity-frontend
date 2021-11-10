import axios from "axios";
import {
  createCommentAction,
  deleteCommentAction,
  editCommentAction,
  getAllCommentsAction,
  handleCommentDownvoteAction,
  handleCommentUpvoteAction,
  unsetCommentsAction,
} from "../actions/comments";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/forums";

export const getAllCommentsDispatcher = async (dispatch, postId) => {
  try {
    const response = await axios.get(`${baseUrl}/${postId}/comments`);
    dispatch(getAllCommentsAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const unsetCommentsDispatcher = (dispatch) => {
  dispatch(unsetCommentsAction());
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
    setError(dispatch, err);
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
    dispatch(
      handleCommentUpvoteAction({
        upvotes: upvotesData.upvotes,
        downvotes: upvotesData.downvotes,
        id: commentId,
      })
    );
    await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/upvote`,
      upvotesData,
      config
    );
  } catch (err) {
    setError(dispatch, err);
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
    dispatch(
      handleCommentDownvoteAction({
        upvotes: downvotesData.upvotes,
        downvotes: downvotesData.downvotes,
        id: commentId,
      })
    );
    await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/downvote`,
      downvotesData,
      config
    );
  } catch (err) {
    setError(dispatch, err);
  }
};

export const editCommentDispatcher = async (
  dispatch,
  postId,
  commentId,
  commentData,
  userToken
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/edit`,
      commentData,
      config
    );
    dispatch(editCommentAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const deleteCommentDispatcher = async (
  dispatch,
  postId,
  commentId,
  userToken
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/delete`,
      {},
      config
    );
    dispatch(deleteCommentAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};
