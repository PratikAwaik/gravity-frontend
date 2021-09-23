

export const registerUserAction = (userInfo) => {
  return async dispatch => {
    dispatch({
      type: 'REGISTER',
      payload: userInfo
    });
  }
}

export const loginUserAction = (userInfo) => {
  return async dispatch => {
    // const payload = await userServices.loginUser(userInfo);
    dispatch({
      type: 'LOGIN',
      payload: userInfo
    });
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

export const getCurrentUserDetailsAction = (userInfo) => {
  return async dispatch => {
    dispatch({
      type: 'GET_USER_DETAILS',
      payload: userInfo
    });
  }
}