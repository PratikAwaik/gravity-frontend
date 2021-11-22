const subredditsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_SUBREDDITS":
      return action.payload;
    case "SET_SEARCH_SUBREDDITS":
      return action.payload;
    case "CREATE_SUBREDDIT":
      return [...state, action.payload];
    case "UPDATE_SUBREDDIT_ICON":
      const { subredditId, icon } = action.payload;
      return [...state].map((sr) =>
        sr.id === subredditId ? { ...sr, communityIcon: icon } : sr
      );
    default:
      return state;
  }
};

export default subredditsReducer;
