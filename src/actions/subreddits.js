export const getAllSubredditsAction = (subreddits) => {
  return {
    type: "GET_ALL_SUBREDDITS",
    payload: subreddits,
  };
};

export const setSearchSubredditsAction = (subreddits) => {
  return {
    type: "SET_SEARCH_SUBREDDITS",
    payload: subreddits,
  };
};

export const createSubredditAction = (subreddit) => {
  return {
    type: "CREATE_SUBREDDIT",
    payload: subreddit,
  };
};

export const updateSubredditIconAction = (subreddit) => {
  return {
    type: "UPDATE_SUBREDDIT_ICON",
    payload: subreddit,
  };
};
