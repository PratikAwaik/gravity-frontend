export const getAllPostsAction = (posts) => {
  return {
    type: "GET_ALL_POSTS",
    payload: posts,
  };
};

export const handleUpvotesAction = (postData) => {
  return {
    type: "UPVOTE_POST_FORUMS",
    payload: postData,
  };
};

export const handleDownvotesAction = (postData) => {
  return {
    type: "DOWNVOTE_POST_FORUMS",
    payload: postData,
  };
};

export const createPostAction = (postData) => {
  return {
    type: "NEW_POST",
    payload: postData,
  };
};

export const deletePostAction = (id) => {
  return {
    type: "DELETE_POST_FORUMS",
    payload: id,
  };
};
