const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return action.payload;
    case "ADD_COMMENT":
      return [...state, action.payload];
    case "UPVOTE_COMMENT":
      return mapComment(state, action);
    case "DOWNVOTE_COMMENT":
      return mapComment(state, action);
    default:
      return state;
  }
};

function mapComment(state, action) {
  return [...state].map((comment) =>
    comment.id.toString() === action.payload.id.toString()
      ? action.payload
      : comment
  );
}

export default commentsReducer;
