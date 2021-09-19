import forumsServices from '../services/forums';

export const getSinglePostAction = (id) => {
  return async dispatch => {
    const payload = await forumsServices.getSinglePost(id);
    dispatch({
      type: 'GET_POST',
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