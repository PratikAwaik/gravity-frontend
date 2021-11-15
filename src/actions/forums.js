export const setNextPostsAction = (posts) => {
  return {
    type: "SET_NEXT_POSTS",
    payload: posts,
  };
};

export const setPostsAction = (posts) => {
  return {
    type: "SET_POSTS",
    payload: posts,
  };
};

export const handleUpvotesAction = (postData) => {
  return {
    type: "UPVOTE_FORUMS_POST",
    payload: postData,
  };
};

export const handleDownvotesAction = (postData) => {
  return {
    type: "DOWNVOTE_FORUMS_POST",
    payload: postData,
  };
};

export const createPostAction = (postData) => {
  return {
    type: "NEW_POST",
    payload: postData,
  };
};

export const deleteForumsPostAction = (id) => {
  return {
    type: "DELETE_FORUMS_POST",
    payload: id,
  };
};

export const editForumsPostAction = (postData) => {
  return {
    type: "EDIT_FORUMS_POST",
    payload: postData,
  };
};
