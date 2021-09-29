import axios from "axios";
import { setErrorAction } from "../actions/error";
import {
  createCommentAction,
  createPostAction,
  deletePostAction,
  editPostAction,
  getAllCommentsAction,
  getAllPostsAction,
  handleCommentUpvoteAction,
  // getSinglePostAction,
  handleDownvotesAction,
  handleUpvotesAction,
} from "../actions/forums";

const baseUrl = "/api/forums";

export const getAllPostsDispatcher = async (dispatch) => {
  try {
    const response = await axios.get(baseUrl);
    dispatch(getAllPostsAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

// export const getSinglePostDispatcher = async (dispatch, id) => {
//   try {
//     const response = await axios.get(`${baseUrl}/${id}`);
//     dispatch(getSinglePostAction(response.data));
//   } catch (err) {
//     console.log(err.response);
//     dispatch(setErrorAction(err.response.data));
//   }
// };

export const handleUpvoteDispatcher = async (
  dispatch,
  id,
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
      `${baseUrl}/${id}/upvote`,
      upvotesData,
      config
    );
    dispatch(handleUpvotesAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const handleDownvoteDispatcher = async (
  dispatch,
  id,
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
      `${baseUrl}/${id}/downvote`,
      downvotesData,
      config
    );
    dispatch(handleDownvotesAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const createPostDispatcher = async (dispatch, postData, userToken) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.post(baseUrl, postData, config);
    dispatch(createPostAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const deletePostDispatcher = async (dispatch, id, userToken) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    await axios.delete(`${baseUrl}/${id}`, config);
    dispatch(deletePostAction(id));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const editPostDispatcher = async (
  dispatch,
  postId,
  postData,
  userToken
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  try {
    const response = await axios.patch(
      `${baseUrl}/${postId}/edit`,
      postData,
      config
    );
    dispatch(editPostAction(response.data));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};

export const getAllCommentsDispatcher = async (dispatch, postId) => {
  try {
    const response = await axios.get(`${baseUrl}/${postId}/comments`);
    dispatch(getAllCommentsAction(response.data, postId));
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
    dispatch(createCommentAction(response.data, postId));
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
    dispatch(handleCommentUpvoteAction(response.data, postId));
  } catch (err) {
    console.log(err.response);
    dispatch(setErrorAction(err.response.data));
  }
};
