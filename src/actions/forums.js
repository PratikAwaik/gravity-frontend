import forumsServices from '../services/forums';

export const getAllPostsAction = () => {
  return async dispatch => {
    const payload = await forumsServices.getAllPosts();
    dispatch({
      type: 'GET_ALL_POSTS',
      payload
    });
  }
}

export const handleUpvotesAction = (id, upvotesData) => {
  return async dispatch => {
    const payload = await forumsServices.handleUpvote(id, upvotesData);
    dispatch({
      type: 'UPVOTE_POST',
      payload
    });
  }
}

export const handleDownvotesAction = (id, downvotesData) => {
  return async dispatch => {
    const payload = await forumsServices.handleDownvote(id, downvotesData);
    dispatch({
      type: 'DOWNVOTE_POST',
      payload
    });
  }
}

export const createPostAction = (postData) => {
  return async dispatch => {
    const payload = await forumsServices.createPost(postData);
    dispatch({
      type: 'NEW_POST',
      payload
    });
  }
}