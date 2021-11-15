import axios from "axios";
import { setErrorAction } from "../actions/error";
import {
  createPostAction,
  deleteForumsPostAction,
  editForumsPostAction,
  // getAllPostsAction,
  handleDownvotesAction,
  handleUpvotesAction,
  setNextPostsAction,
  setPostsAction,
} from "../actions/forums";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/forums";

export const setPostsDispatcher = async (dispatch, posts) => {
  if (posts) {
    dispatch(setPostsAction(posts));
  } else {
    try {
      const response = await axios.get(`${baseUrl}?page=1&limit=8`);
      dispatch(setPostsAction(response.data));
    } catch (err) {
      setError(dispatch, err);
    }
  }
};

export const setNextPostsDispatcher = async (dispatch, { page, limit }, url) => {
  try {
    const response = await axios.get(`${url || baseUrl}?page=${page}&limit=${limit}`);
    dispatch(setNextPostsAction(response.data));
  } catch (error) {
    setErrorAction(dispatch, error);
  }
}

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
