import { getCurrentUserDetailsAction } from './actions/currentUser';
import forumsServices from './services/forums';

export const hasUpvotedAlreadyHelper = (currentUser, postID) => {
  return currentUser.postsUpvoted && currentUser.postsUpvoted.find(postid => postid.toString() === postID);
}

export const hasDownvotedAlreadyHelper = (currentUser, postID) => {
  return currentUser.postsDownvoted && currentUser.postsDownvoted.find(postid => postid.toString() === postID);
}

export const handleUpvoteHelper = async (dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, upvoteAction) => {
  const upvotesData = {
    upvotes: hasUpvotedAlready && !hasDownvotedAlready ? post.upvotes - 1 : post.upvotes + 1,
    downvotes: hasDownvotedAlready ? post.downvotes - 1 : post.downvotes, 
    hasUpvotedAlready,
    hasDownvotedAlready
  }

  forumsServices.setToken(currentUser.token);
  await dispatch(upvoteAction(post.id, upvotesData));
  dispatch(getCurrentUserDetailsAction());
}

export const handleDownvoteHelper = async (dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, downvoteAction) => {
  const downvotesData = {
    downvotes: hasDownvotedAlready && !hasUpvotedAlready ? post.downvotes - 1 : post.downvotes + 1,
    upvotes: hasUpvotedAlready ? post.upvotes - 1 : post.upvotes,
    hasDownvotedAlready,
    hasUpvotedAlready
  }

  forumsServices.setToken(currentUser.token);
  await dispatch(downvoteAction(post.id, downvotesData));
  dispatch(getCurrentUserDetailsAction());
}
