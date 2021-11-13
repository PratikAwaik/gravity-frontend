const initialState = {
  user: {},
  subreddits: {},
  posts: {
    results: [],
    page: 1,
    limit: 6,
  },
  comments: {
    results: [],
    page: 1,
    limit: 15,
  },
};

const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "UNSET_USER":
      return initialState;
    case "SET_USER_SUBREDDITS":
      return { ...state, subreddits: action.payload };
    case "SET_USER_POSTS":
      return {
        ...state,
        posts: {
          results: [...state.posts.results, ...action.payload],
          page: state.posts.page + 1,
          limit: 6,
        },
      };
    case "SET_USER_COMMENTS":
      return {
        ...state,
        comments: {
          results: [...state.comments.results, ...action.payload],
          page: state.comments.page + 1,
          limit: 15,
        },
      };
    default:
      return state;
  }
};

export default UserProfileReducer;
