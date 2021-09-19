import userServices from '../services/user';

export const registerUserAction = (userInfo) => {
  return async dispatch => {
    const payload = await userServices.registerUser(userInfo);
    if (payload.error) {
      dispatch({
        type: 'REGISTER_ERROR',
        payload
      });
    } else {
      dispatch({
        type: 'REGISTER',
        payload
      });
    }
  }
}

export const loginUserAction = (userInfo) => {
  return async dispatch => {
    const payload = await userServices.loginUser(userInfo);
    if (payload.error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload
      });
    } else {
      dispatch({
        type: 'LOGIN',
        payload
      });
    }
  }
}

export const logoutUserAction = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      payload: {}
    });
  }
}

export const setUserFromLocalStorageAction = () => {
  return async dispatch => {
    const user = window.localStorage.getItem('loggedInGravityUser');
    dispatch({
      type: 'SET_FROM_LOCAL_STORAGE',
      payload: user ? JSON.parse(user) : {}
    });
  }
}

export const getCurrentUserDetailsAction = () => {
  return async dispatch => {
    const id = JSON.parse(window.localStorage.getItem('loggedInGravityUser')).id;
    const user = await userServices.getSingleUser(id);
    dispatch({
      type: 'GET_USER_DETAILS',
      payload: user
    });
  }
}