const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER": {
      window.localStorage.setItem(
        "loggedInGravityUser",
        JSON.stringify(action.payload)
      );
      return action.payload;
    }
    case "LOGIN": {
      window.localStorage.setItem(
        "loggedInGravityUser",
        JSON.stringify(action.payload)
      );
      return action.payload;
    }
    case "LOGOUT": {
      window.localStorage.removeItem("loggedInGravityUser");
      return action.payload;
    }
    case "SET_FROM_LOCAL_STORAGE": {
      return action.payload;
    }
    case "GET_USER_DETAILS": {
      return { ...state, ...action.payload };
    }
    case "UPDATE_USER":
      console.log(action.payload);
      return { ...state, ...action.payload };
    case "USER_VOTE": {
      const { isPost, upvoteClicked } = action.payload;
      return updateVotes(
        state,
        action,
        isPost ? "postsUpvoted" : "commentsUpvoted",
        isPost ? "postsDownvoted" : "commentsDownvoted",
        upvoteClicked
      );
    }
    case "SUBSCRIBE_USER": {
      const { subredditId, subscribe } = action.payload;
      const stateCopy = Object.assign({}, state);

      if (subscribe) {
        stateCopy.subscriptions = stateCopy.subscriptions.concat(subredditId);
      } else {
        stateCopy.subscriptions = stateCopy.subscriptions.filter(
          (srId) => srId !== subredditId
        );
      }
      return stateCopy;
    }
    default:
      return state;
  }
};

function updateVotes(state, action, upvoteKey, downvoteKey, upvoteClicked) {
  const { hasUpvotedAlready, hasDownvotedAlready, postId } = action.payload;
  const stateCopy = Object.assign({}, state);

  if (upvoteClicked) {
    if (hasUpvotedAlready) {
      stateCopy[upvoteKey] = stateCopy[upvoteKey].filter(
        (postID) => postID !== postId
      );
    } else if (hasDownvotedAlready) {
      stateCopy[upvoteKey] = stateCopy[upvoteKey].concat(postId);
      stateCopy[downvoteKey] = stateCopy[downvoteKey].filter(
        (postID) => postID !== postId
      );
    } else {
      stateCopy[upvoteKey] = stateCopy[upvoteKey].concat(postId);
    }
  } else {
    if (hasDownvotedAlready) {
      stateCopy[downvoteKey] = stateCopy[downvoteKey].filter(
        (postID) => postID !== postId
      );
    } else if (hasUpvotedAlready) {
      stateCopy[downvoteKey] = stateCopy[downvoteKey].concat(postId);
      stateCopy[upvoteKey] = stateCopy[upvoteKey].filter(
        (postID) => postID !== postId
      );
    } else {
      stateCopy[downvoteKey] = stateCopy[downvoteKey].concat(postId);
    }
  }
  return stateCopy;
}

export default currentUserReducer;
