const initialState = {
  results: [],
  page: 0,
  limit: 8,
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
      console.log(action.payload);
      return { ...state, results: action.payload };
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
