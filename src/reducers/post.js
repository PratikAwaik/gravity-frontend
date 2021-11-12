const postReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POST":
      return action.payload;
    case "UNSET_POST":
      return {};
    case "EDIT_POST":
      return { ...state, ...action.payload };
    case "UPVOTE_POST":
      return { ...state, ...action.payload };
    case "DOWNVOTE_POST":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default postReducer;
