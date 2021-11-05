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
    console.log(err);
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
    await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/upvote`,
      upvotesData,
      config
    );
    dispatch(
      handleCommentUpvoteAction({
        upvotes: upvotesData.upvotes,
        downvotes: upvotesData.downvotes,
        id: commentId,
      })
    );
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
    await axios.patch(
      `${baseUrl}/${postId}/comments/${commentId}/downvote`,
      downvotesData,
      config
    );
    dispatch(
      handleCommentDownvoteAction({
        upvotes: downvotesData.upvotes,
        downvotes: downvotesData.downvotes,
        id: commentId,
      })
    );
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
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
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
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
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};
