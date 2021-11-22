import axios from "axios";
import { setErrorAction } from "../actions/error";
import {
  createPostAction,
  deleteForumsPostAction,
  editForumsPostAction,
  handleDownvotesAction,
  handleUpvotesAction,
  setNextPostsAction,
  setPostsAction,
  setSearchPostsAction,
  setSubredditPostsAction,
  setUserPostsAction,
} from "../actions/forums";
import userConfig from "../configs/userConfig";
import { setError } from "../helpers";

const baseUrl = process.env.REACT_APP_API_URL + "/api/forums";

export const setPostsDispatcher = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}?page=1&limit=6`);
    dispatch(setPostsAction(response.data));
  } catch (err) {
    setError(dispatch, err);
  }
};

export const setUserPostsDispatcher = (dispatch, posts) => {
  dispatch(setUserPostsAction(posts));
};

export const setSubredditPostsDispatcher = (dispatch, posts) => {
  dispatch(setSubredditPostsAction(posts));
};

export const setSearchPostsDispatcher = async (
  dispatch,
  { searchString, page, limit }
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search?search=${searchString}&page=${page}&limit=${limit}`
    );
    dispatch(setSearchPostsAction(response.data));
  } catch (error) {
    setError(dispatch, error);
  }
};

export const setNextPostsDispatcher = async (
  dispatch,
  pageName,
  { page, limit, searchString },
  url
) => {
  try {
    const response = await axios.get(
      `${url || baseUrl}?page=${page}&limit=${limit}&search=${searchString}`
    );
    dispatch(setNextPostsAction({ results: response.data, pageName }));
  } catch (error) {
    setErrorAction(dispatch, error);
  }
};

export const handleForumsPostUpvoteDispatcher = async (
  dispatch,
  id,
  upvotesData,
  userToken,
  isPostDetail
) => {
  try {
    dispatch(
      handleUpvotesAction({
        upvotes: upvotesData.upvotes,
        downvotes: upvotesData.downvotes,
        id,
      })
    );
    if (!isPostDetail) {
      await axios.patch(
        `${baseUrl}/${id}/upvote`,
        upvotesData,
        userConfig(userToken)
      );
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
  try {
    dispatch(
      handleDownvotesAction({
        upvotes: downvotesData.upvotes,
        downvotes: downvotesData.downvotes,
        id,
      })
    );
    if (!isPostDetail) {
      await axios.patch(
        `${baseUrl}/${id}/downvote`,
        downvotesData,
        userConfig(userToken)
      );
    }
  } catch (err) {
    setError(dispatch, err);
  }
};

export const createPostDispatcher = async (
  dispatch,
  history,
  postData,
  userToken
) => {
  try {
    const response = await axios.post(baseUrl, postData, userConfig(userToken));
    dispatch(createPostAction(response.data));
    history.push(`/forums/${response.data.id}`);
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
