const initialState = {
  subreddit: {},
  users: {},
  posts: {
    page: 1,
    limit: 8,
    results: [],
  },
};

const subredditProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUBREDDIT":
      return { ...state, subreddit: action.payload };
    case "SET_SUBREDDIT_USERS":
      return { ...state, users: action.payload };
    case "SET_SUBREDDIT_POSTS":
      return {
        ...state,
        posts: {
          results: [...state.posts.results, ...action.payload],
          page: state.posts.page + 1,
          limit: 8,
        },
      };
    default:
      return state;
  }
};

export default subredditProfileReducer;
