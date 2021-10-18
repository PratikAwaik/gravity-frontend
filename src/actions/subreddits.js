export const getAllSubredditsAction = (data) => {
  return {
    type: "GET_ALL_SUBREDDITS",
    payload: data,
  };
};

export const createSubredditAction = (data) => {
  return {
    type: "CREATE_SUBREDDIT",
    payload: data,
  };
};
