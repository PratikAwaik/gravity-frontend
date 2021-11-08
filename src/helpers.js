import {
  handleDownvoteDispatcher,
  handleUpvoteDispatcher,
} from "./dispatchers/forums";
import {
  handleCommentDownvoteDispatcher,
  handleCommentUpvoteDispatcher,
} from "./dispatchers/comments";
import { updateCurrentUserVotesDispatcher } from "./dispatchers/user";
import Swal from "sweetalert2";
import { setErrorAction } from "./actions/error";

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

  updateCurrentUserVotesDispatcher(dispatch, {
    hasUpvotedAlready,
    hasDownvotedAlready,
    postId: data.id,
    isPost: data.post ? false : true,
    upvoteClicked: true,
  });
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

  updateCurrentUserVotesDispatcher(dispatch, {
    hasUpvotedAlready,
    hasDownvotedAlready,
    postId: data.id,
    isPost: data.post ? false : true,
    upvoteClicked: false,
  });
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

export const displayError = (inputError) => {
  return (
    inputError && (
      <span className="text-sm text-theme-red w-full flex items-start mt-1">
        <i className="ri-information-line text-theme-red text-sm mr-1"></i>
        {inputError.message}
      </span>
    )
  );
};

export const setError = (dispatch, err) => {
  console.log(err.response);
  dispatch(setErrorAction(err.response.data));

  setTimeout(() => {
    dispatch(setErrorAction({}));
  }, 5000);
};

export const successPopup = async (message) => {
  await Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const errorPopup = async (message) => {
  await Swal.fire({
    icon: "error",
    title: message,
  });
};
