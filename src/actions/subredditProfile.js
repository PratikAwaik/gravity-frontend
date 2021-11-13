export const setSubredditAction = (subredditData) => {
  return {
    type: "SET_SUBREDDIT",
    payload: subredditData,
  };
};

export const setSubredditUsersAction = (usersData) => {
  return {
    type: "SET_SUBREDDIT_USERS",
    payload: usersData,
  };
};

export const setSubredditPostsAction = (postsData) => {
  return {
    type: "SET_SUBREDDIT_POSTS",
    payload: postsData,
  };
};
