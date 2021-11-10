import axios from "axios";
import {
  createPostAction,
  deletePostAction,
  editPostAction,
  getAllPostsAction,
  handleDownvotesAction,
  handleUpvotesAction,
  setPostsAction,
} from "../actions/forums";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/forums";

export const getAllPostsDispatcher = async (dispatch, { page, limit }) => {
  try {
    const response = await axios.get(`${baseUrl}?page=${page}&limit=${limit}`);
    dispatch(getAllPostsAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const setPostsDispatcher = (dispatch, posts) => {
  dispatch(setPostsAction(posts));
};

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
    dispatch(
      handleUpvotesAction({
        upvotes: upvotesData.upvotes,
        downvotes: upvotesData.downvotes,
        id,
      })
    );
    await axios.patch(`${baseUrl}/${id}/upvote`, upvotesData, config);
  } catch (err) {
    setError(dispatch, err);
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
    dispatch(
      handleDownvotesAction({
        upvotes: downvotesData.upvotes,
        downvotes: downvotesData.downvotes,
        id,
      })
    );
    await axios.patch(`${baseUrl}/${id}/downvote`, downvotesData, config);
  } catch (err) {
    setError(dispatch, err);
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
    setError(dispatch, err);
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
    setError(dispatch, err);
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
    await axios.patch(`${baseUrl}/${postId}/edit`, postData, config);
    dispatch(editPostAction({ ...postData, id: postId }));
  } catch (err) {
    setError(dispatch, err);
  }
};
