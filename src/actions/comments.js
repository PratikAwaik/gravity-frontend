export const getAllCommentsAction = (comments) => {
  return {
    type: "SET_COMMENTS",
    payload: comments,
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
