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

export const handleUpvotesAction = (id) => {
  return async dispatch => {
    const payload = await forumsServices.handleUpvote(id);
    dispatch({
      type: 'UPVOTE_POST',
      payload
    });
  }
}

export const handleDownvotesAction = (id) => {
  return async dispatch => {
    const payload = await forumsServices.handleDownvote(id);
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