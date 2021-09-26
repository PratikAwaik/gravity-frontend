const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
