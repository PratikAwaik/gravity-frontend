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
    currentUser[key].find((post) => post.id.toString() === id)
  );
};

export const hasDownvotedAlreadyHelper = (currentUser, id, key) => {
  return (
    currentUser[key] &&
    currentUser[key].find((post) => post.id.toString() === id)
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

export const orderComments = (comments) => {
  const maxLevel = Math.max(...comments.map((c) => c.level));
  const commentsCopy = [];

  for (let i = 0; i <= maxLevel; i++) {
    if (i === 0) {
      commentsCopy.push(...comments.filter((c) => c.level === 0));
    } else {
      const parentComments = commentsCopy.filter((c) => c.level === i - 1);
      const repliedComments = parentComments.map((comment) =>
        comments.filter((c) => c.repliedTo && c.repliedTo === comment.id)
      );

      repliedComments.forEach((commentsArray) => {
        if (commentsArray.length > 0) {
          const indexOfPreviousLevelComment = commentsCopy.indexOf(
            commentsCopy.find(
              (c) => c.level === i - 1 && commentsArray[0].repliedTo === c.id
            )
          );
          commentsCopy.splice(
            indexOfPreviousLevelComment + 1,
            0,
            ...commentsArray
          );
        }
      });
    }
  }
  return commentsCopy;
};
