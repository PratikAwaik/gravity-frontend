const postReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_POST':
      return action.payload;
    case 'UPVOTE_POST':
      return action.payload;
    case 'DOWNVOTE_POST':
      return action.payload;
    default:
      return state;
  }
}

export default postReducer;