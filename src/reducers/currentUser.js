const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER": {
      window.localStorage.setItem(
        "loggedInGravityUser",
        JSON.stringify(action.payload)
      );
      return action.payload;
    }
    case "LOGIN": {
      window.localStorage.setItem(
        "loggedInGravityUser",
        JSON.stringify(action.payload)
      );
      return action.payload;
    }
    case "LOGOUT": {
      window.localStorage.removeItem("loggedInGravityUser");
      return action.payload;
    }
    case "SET_FROM_LOCAL_STORAGE": {
      return action.payload;
    }
    case "GET_USER_DETAILS": {
      if (state.id === action.payload.id) {
        return { ...state, ...action.payload };
      } else {
        return action.payload;
      }
    }
    default:
      return state;
  }
};

export default currentUserReducer;
