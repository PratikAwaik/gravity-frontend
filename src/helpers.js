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
  post,
  hasUpvotedAlready,
  hasDownvotedAlready
) => {
  const upvotesData = {
    upvotes:
      hasUpvotedAlready && !hasDownvotedAlready
        ? post.upvotes - 1
        : post.upvotes + 1,
    downvotes: hasDownvotedAlready ? post.downvotes - 1 : post.downvotes,
    hasUpvotedAlready,
    hasDownvotedAlready,
  };

  await handleUpvoteDispatcher(
    dispatch,
    post.id,
    upvotesData,
    currentUser.token
  );
  currentUserDetailsDispatcher(dispatch);
};

export const handleCommentUpvoteHelper = async (
  dispatch,
  currentUser,
  comment,
  hasUpvotedAlready,
  hasDownvotedAlready
) => {
  const upvotesData = {
    upvotes:
      hasUpvotedAlready && !hasDownvotedAlready
        ? comment.upvotes - 1
        : comment.upvotes + 1,
    downvotes: hasDownvotedAlready ? comment.downvotes - 1 : comment.downvotes,
    hasUpvotedAlready,
    hasDownvotedAlready,
  };

  await handleCommentUpvoteDispatcher(
    dispatch,
    comment.post,
    comment.id,
    upvotesData,
    currentUser.token
  );
  currentUserDetailsDispatcher(dispatch);
};

export const handleDownvoteHelper = async (
  dispatch,
  currentUser,
  post,
  hasUpvotedAlready,
  hasDownvotedAlready
) => {
  const downvotesData = {
    downvotes:
      hasDownvotedAlready && !hasUpvotedAlready
        ? post.downvotes - 1
        : post.downvotes + 1,
    upvotes: hasUpvotedAlready ? post.upvotes - 1 : post.upvotes,
    hasDownvotedAlready,
    hasUpvotedAlready,
  };

  await handleDownvoteDispatcher(
    dispatch,
    post.id,
    downvotesData,
    currentUser.token
  );
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
