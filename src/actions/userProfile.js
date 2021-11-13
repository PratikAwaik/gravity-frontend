export const unsetUserAction = () => {
  return {
    type: "UNSET_USER",
  };
};

export const setUserAction = (userData) => {
  return {
    type: "SET_USER",
    payload: userData,
  };
};

export const setUserSubredditsAction = (subredditsData) => {
  return {
    type: "SET_USER_SUBREDDITS",
    payload: subredditsData,
  };
};

export const setUserPostsAction = (postsData) => {
  return {
    type: "SET_USER_POSTS",
    payload: postsData,
  };
};

export const setUserCommentsAction = (commentsData) => {
  return {
    type: "SET_USER_COMMENTS",
    payload: commentsData,
  };
};
