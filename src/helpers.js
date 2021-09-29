import {
  getAllCommentsDispatcher,
  handleCommentUpvoteDispatcher,
  handleDownvoteDispatcher,
  handleUpvoteDispatcher,
} from "./dispatchers/forums";
import { currentUserDetailsDispatcher } from "./dispatchers/user";

export const hasUpvotedAlreadyHelper = (currentUser, postID) => {
  return (
    currentUser.postsUpvoted &&
    currentUser.postsUpvoted.find((postid) => postid.toString() === postID)
  );
};

export const hasDownvotedAlreadyHelper = (currentUser, postID) => {
  return (
    currentUser.postsDownvoted &&
    currentUser.postsDownvoted.find((postid) => postid.toString() === postID)
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
  await currentUserDetailsDispatcher(dispatch);
  getAllCommentsDispatcher(dispatch, post.id);
};

export const handleCommentUpvoteHelper = async (
  dispatch,
  currentUser,
  postId,
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
    postId,
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
  await currentUserDetailsDispatcher(dispatch);
  getAllCommentsDispatcher(dispatch, post.id);
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
