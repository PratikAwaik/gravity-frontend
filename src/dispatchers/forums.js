import axios from "axios";
import {
  createPostAction,
  deleteForumsPostAction,
  editForumsPostAction,
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

export const handleForumsPostUpvoteDispatcher = async (
  dispatch,
  id,
  upvotesData,
  userToken,
  isPostDetail
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
    if (!isPostDetail) {
      await axios.patch(`${baseUrl}/${id}/upvote`, upvotesData, config);
    }
  } catch (err) {
    setError(dispatch, err);
  }
};

export const handleForumsPostDownvoteDispatcher = async (
  dispatch,
  id,
  downvotesData,
  userToken,
  isPostDetail
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
    if (!isPostDetail) {
      await axios.patch(`${baseUrl}/${id}/downvote`, downvotesData, config);
    }
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

export const deleteForumsPostDispatcher = async (dispatch, id) => {
  dispatch(deleteForumsPostAction(id));
};

export const editForumsPostDispatcher = async (dispatch, postData) => {
  dispatch(editForumsPostAction(postData));
};
