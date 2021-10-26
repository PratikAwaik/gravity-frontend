export const registerUserAction = (userInfo) => {
  return {
    type: "REGISTER",
    payload: userInfo,
  };
};

export const loginUserAction = (userInfo) => {
  return {
    type: "LOGIN",
    payload: userInfo,
  };
};

export const logoutUserAction = () => {
  return {
    type: "LOGOUT",
    payload: {},
  };
};

export const setUserFromLocalStorageAction = () => {
  const user = window.localStorage.getItem("loggedInGravityUser");
  return {
    type: "SET_FROM_LOCAL_STORAGE",
    payload: user ? JSON.parse(user) : {},
  };
};

export const getCurrentUserDetailsAction = (userInfo) => {
  return {
    type: "GET_USER_DETAILS",
    payload: userInfo,
  };
};

export const updateCurrentUserAction = (userInfo) => {
  return {
    type: "UPDATE_USER",
    payload: userInfo,
  };
};
