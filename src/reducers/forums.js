const forumsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return action.payload;
    case "UPVOTE_POST_FORUMS":
      return state.map((post) =>
        post.id.toString() === action.payload.id.toString()
          ? action.payload
          : post
      );
    case "DOWNVOTE_POST_FORUMS":
      return state.map((post) =>
        post.id.toString() === action.payload.id.toString()
          ? action.payload
          : post
      );
    case "NEW_POST":
      return [...state, action.payload];
    case "DELETE_POST_FORUMS":
      return state.filter((post) => post.id.toString() !== action.payload);
    case "EDIT_POST_FORUMS":
      return state.map((post) =>
        post.id.toString() === action.payload.id.toString()
          ? action.payload
          : post
      );
    default:
      return state;
  }
};

export default forumsReducer;
