export const getPostAction = (postData) => {
  return {
    type: "GET_POST",
    payload: postData,
  };
};

export const unsetPostAction = () => {
  return {
    type: "UNSET_POST",
  };
};

export const editPostAction = (postData) => {
  return {
    type: "EDIT_POST",
    payload: postData,
  };
};

export const handlePostUpvoteAction = (upvotesData) => {
  return {
    type: "UPVOTE_POST",
    payload: upvotesData,
  };
};

export const handlePostDownvoteAction = (downvotesData) => {
  return {
    type: "DOWNVOTE_POST",
    payload: downvotesData,
  };
};
