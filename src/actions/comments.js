export const getAllCommentsAction = (comments) => {
  return {
    type: "SET_COMMENTS",
    payload: comments,
  };
};

export const unsetCommentsAction = () => {
  return {
    type: "UNSET_COMMENTS",
    payload: [],
  };
};

export const createCommentAction = (comment) => {
  return {
    type: "ADD_COMMENT",
    payload: comment,
  };
};

export const handleCommentUpvoteAction = (comment) => {
  return {
    type: "UPVOTE_COMMENT",
    payload: comment,
  };
};

export const handleCommentDownvoteAction = (comment) => {
  return {
    type: "DOWNVOTE_COMMENT",
    payload: comment,
  };
};

export const deleteCommentAction = (commentId) => {
  return {
    type: "DELETE_COMMENT",
    payload: commentId,
  };
};

export const editCommentAction = (comment) => {
  return {
    type: "EDIT_COMMENT",
    payload: comment,
  };
};
