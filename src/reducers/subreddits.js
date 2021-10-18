const subredditsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_SUBREDDITS":
      return action.payload;
    case "CREATE_SUBREDDIT":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default subredditsReducer;
