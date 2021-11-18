const initialState = {
  results: [],
  page: 1,
  userPage: 1,
  subredditPage: 1,
  limit: 6,
  hasMore: true,
};

const forumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEXT_POSTS":
      if (action.payload.results.length === 0) {
        return {
          ...state,
          hasMore: false,
        };
      } else {
        return {
          ...state,
          [action.payload.pageName]: state[action.payload.pageName] + 1,
          results: [...state.results, ...action.payload.results],
        };
      }
    case "SET_POSTS":
      return {
        ...state,
        page: 2,
        userPage: 1,
        subredditPage: 1,
        hasMore: true,
        results: action.payload,
      };
    case "SET_USER_POSTS":
      return {
        ...state,
        userPage: 2,
        page: 1,
        subredditPage: 1,
        hasMore: true,
        results: action.payload,
      };
    case "SET_SUBREDDIT_POSTS":
      return {
        ...state,
        subredditPage: 2,
        page: 1,
        userPage: 1,
        hasMore: true,
        results: action.payload,
      };
    case "UPVOTE_FORUMS_POST":
      return { ...state, results: setPost(state.results, action) };
    case "DOWNVOTE_FORUMS_POST":
      return { ...state, results: setPost(state.results, action) };
    case "NEW_POST":
      return { ...state, results: [action.payload, ...state.results] };
    case "DELETE_FORUMS_POST":
      return {
        ...state,
        results: state.results.filter(
          (post) => post.id.toString() !== action.payload
        ),
      };
    case "EDIT_FORUMS_POST":
      return { ...state, results: setPost(state.results, action) };
    default:
      return state;
  }
};

function setPost(posts, action) {
  return posts.map((post) =>
    post.id.toString() === action.payload.id.toString()
      ? { ...post, ...action.payload }
      : post
  );
}

export default forumsReducer;
