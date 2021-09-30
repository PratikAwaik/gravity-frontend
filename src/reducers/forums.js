const forumsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_POSTS":
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
    // case "SET_COMMENTS":
    //   return setComments(state, action);
    // case "ADD_COMMENT":
    //   return addComment(state, action);
    // case "UPVOTE_COMMENT":
    //   return upvoteComment(state, action);
    default:
      return state;
  }
};

function setPost(state, action) {
  return state.map((post) =>
    post.id.toString() === action.payload.id.toString() ? action.payload : post
  );
}

// function setComments(state, action) {
//   const { comments, postId } = action.payload;
//   const targetPost = [...state].find((post) => post.id.toString() === postId);
//   targetPost.comments = comments;
//   return state.map((post) =>
//     post.id.toString() === targetPost.id.toString() ? targetPost : post
//   );
// }

// function addComment(state, action) {
//   const { comment, postId } = action.payload;
//   const targetPost = [...state].find((post) => post.id.toString() === postId);
//   targetPost.comments.push(comment);
//   return state.map((post) =>
//     post.id.toString() === targetPost.id.toString() ? targetPost : post
//   );
// }

// function upvoteComment(state, action) {
//   const { comment, postId } = action.payload;
//   const targetPost = [...state].find((post) => post.id.toString() === postId);
//   targetPost.comments = targetPost.comments.map((c) =>
//     c.id.toString() === comment.id.toString() ? comment : c
//   );
//   return state.map((post) =>
//     post.id.toString() === targetPost.id.toString() ? targetPost : post
//   );
// }

export default forumsReducer;
