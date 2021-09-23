export const setErrorAction = (error) => {
  // return async dispatch => {
  //   dispatch({
  //     type: 'SET_ERROR',
  //     payload: error
  //   });

  //   setTimeout(() => {
  //     dispatch({
  //       type: 'SET_ERROR',
  //       payload: {}
  //     });
  //   }, 8 * 1000);
  // }
  return {
    type: 'SET_ERROR',
    payload: error
  }
}