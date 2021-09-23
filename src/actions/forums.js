export const getAllPostsAction = (posts) => {
  return async dispatch => {
    // const payload = await forumsServices.getAllPosts();
    dispatch({
      type: 'GET_ALL_POSTS',
      payload: posts
    });
  }
}

export const handleUpvotesAction = (postData) => {
  return async dispatch => {
    // const payload = await forumsServices.handleUpvote(id, upvotesData);
    dispatch({
      type: 'UPVOTE_POST_FORUMS',
      payload: postData
    });
  }
}

export const handleDownvotesAction = (postData) => {
  return async dispatch => {
    // const payload = await forumsServices.handleDownvote(id, downvotesData);
    dispatch({
      type: 'DOWNVOTE_POST_FORUMS',
      payload: postData
    });
  }
}

export const createPostAction = (postData) => {
  return async dispatch => {
    // const payload = await forumsServices.createPost(postData);
    dispatch({
      type: 'NEW_POST',
      payload: postData
    });
  }
}

export const deletePostAction = (id) => {
  return async dispatch => {
    // const response = await forumsServices.deletePost(id);
    dispatch({
      type: 'DELETE_POST_FORUMS',
      payload: id
    });
  }
}