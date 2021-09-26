export const getAllPostsAction = (posts) => {
  return {
    type: "GET_ALL_POSTS",
    payload: posts,
  };
};

// export const getSinglePostAction = (postData) => {
//   return {
//     type: "GET_SINGLE_POST",
//     payload: [postData],
//   };
// };

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

export const editPostAction = (postData) => {
  return {
    type: "EDIT_POST_FORUMS",
    payload: postData,
  };
};
