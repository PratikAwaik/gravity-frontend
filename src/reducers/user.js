const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'REGISTER': {
      window.localStorage.setItem('loggedInGravityUser', JSON.stringify(action.payload));
      return action.payload;
    }
    
    case 'REGISTER_ERROR': {
      return action.payload;
    }
      
    case 'LOGIN': {
      window.localStorage.setItem('loggedInGravityUser', JSON.stringify(action.payload));
      return action.payload;
    }
      
    case 'LOGIN_ERROR': {
      return action.payload;
    }
      
    case 'LOGOUT': {
      window.localStorage.removeItem('loggedInGravityUser');
      return action.payload;
    }
      
    case 'SET_FROM_LOCAL_STORAGE': {
      return action.payload;
    }
      
    default:
      return state;
  }
}

export default userReducer;