import {
  handleDownvoteDispatcher,
  handleUpvoteDispatcher,
} from "./dispatchers/forums";
import {
  handleCommentDownvoteDispatcher,
  handleCommentUpvoteDispatcher,
} from "./dispatchers/comments";
import { currentUserDetailsDispatcher } from "./dispatchers/user";

export const hasUpvotedAlreadyHelper = (currentUser, id, key) => {
  return (
    currentUser[key] &&
    currentUser[key].find((postid) => postid.toString() === id)
  );
};

export const hasDownvotedAlreadyHelper = (currentUser, id, key) => {
  return (
    currentUser[key] &&
    currentUser[key].find((postid) => postid.toString() === id)
  );
};

export const handleUpvoteHelper = async (
  dispatch,
  currentUser,
  data,
  hasUpvotedAlready,
  hasDownvotedAlready
) => {
  const upvotesData = {
    upvotes:
      hasUpvotedAlready && !hasDownvotedAlready
        ? data.upvotes - 1
        : data.upvotes + 1,
    downvotes: hasDownvotedAlready ? data.downvotes - 1 : data.downvotes,
    hasUpvotedAlready,
    hasDownvotedAlready,
  };

  if (data.post) {
    await handleCommentUpvoteDispatcher(
      dispatch,
      data.post,
      data.id,
      upvotesData,
      currentUser.token
    );
  } else {
    await handleUpvoteDispatcher(
      dispatch,
      data.id,
      upvotesData,
      currentUser.token
    );
  }

  currentUserDetailsDispatcher(dispatch);
};

export const handleDownvoteHelper = async (
  dispatch,
  currentUser,
  data,
  hasUpvotedAlready,
  hasDownvotedAlready
) => {
  const downvotesData = {
    downvotes:
      hasDownvotedAlready && !hasUpvotedAlready
        ? data.downvotes - 1
        : data.downvotes + 1,
    upvotes: hasUpvotedAlready ? data.upvotes - 1 : data.upvotes,
    hasDownvotedAlready,
    hasUpvotedAlready,
  };

  if (data.post) {
    await handleCommentDownvoteDispatcher(
      dispatch,
      data.post,
      data.id,
      downvotesData,
      currentUser.token
    );
  } else {
    await handleDownvoteDispatcher(
      dispatch,
      data.id,
      downvotesData,
      currentUser.token
    );
  }

  currentUserDetailsDispatcher(dispatch);
};

export const handleCommentDownvoteHelper = async (
  dispatch,
  currentUser,
  comment,
  hasUpvotedAlready,
  hasDownvotedAlready
) => {
  const downvotesData = {
    downvotes:
      hasDownvotedAlready && !hasUpvotedAlready
        ? comment.downvotes - 1
        : comment.downvotes + 1,
    upvotes: hasUpvotedAlready ? comment.upvotes - 1 : comment.upvotes,
    hasDownvotedAlready,
    hasUpvotedAlready,
  };

  await handleCommentDownvoteDispatcher(
    dispatch,
    comment.post,
    comment.id,
    downvotesData,
    currentUser.token
  );
  currentUserDetailsDispatcher(dispatch);
};

export const sortByDate = (array, mostRecent) => {
  if (mostRecent) {
    return array.sort((prev, next) =>
      prev.createdAt > next.createdAt ? -1 : 1
    );
  } else {
    return array.sort((prev, next) =>
      prev.createdAt > next.createdAt ? 1 : -1
    );
  }
};
