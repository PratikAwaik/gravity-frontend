const initialState = {
  page: 1,
  limit: 12,
  results: [],
  hasMore: true,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return { ...state, page: 2, hasMore: true, results: action.payload };
    case "SET_NEXT_COMMENTS":
      if (action.payload.results === 0) {
        return {
          ...state,
          hasMore: false,
        };
      } else {
        return {
          ...state,
          page: state.page + 1,
          results: [...state.results, ...action.payload],
        };
      }
    case "UNSET_COMMENTS":
      return initialState;
    case "ADD_COMMENT":
      return { ...state, results: [...state.results, action.payload] };
    case "UPVOTE_COMMENT":
      return { ...state, results: mapComment(state.results, action) };
    case "DOWNVOTE_COMMENT":
      return { ...state, results: mapComment(state.results, action) };
    case "DELETE_COMMENT":
      return { ...state, results: mapComment(state.results, action) };
    case "EDIT_COMMENT":
      return { ...state, results: mapComment(state.results, action) };
    default:
      return state;
  }
};

function mapComment(state, action) {
  return [...state].map((comment) =>
    comment.id.toString() === action.payload.id.toString()
      ? { ...comment, ...action.payload }
      : comment
  );
}

export default commentsReducer;
