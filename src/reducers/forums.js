const initialState = {
  results: [],
  page: 0,
  limit: 5,
};

const forumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return {
        ...state,
        page: state.page + 1,
        results: [...state.results, ...action.payload],
      };
    case "SET_POSTS":
      return action.payload;
    case "UPVOTE_POST_FORUMS":
      return setPost(state, action);
    case "DOWNVOTE_POST_FORUMS":
      return setPost(state, action);
    case "NEW_POST":
      return [...state, action.payload];
    case "DELETE_POST_FORUMS":
      return state.filter((post) => post.id.toString() !== action.payload);
    case "EDIT_POST_FORUMS":
      return setPost(state, action);
    default:
      return state;
  }
};

function setPost(state, action) {
  return state.map((post) =>
    post.id.toString() === action.payload.id.toString()
      ? { ...post, ...action.payload }
      : post
  );
}

export default forumsReducer;
