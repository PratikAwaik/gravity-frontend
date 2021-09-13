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