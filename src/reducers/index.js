import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import forumsReducer from "./forums";
import postReducer from "./post";

const reducers = combineReducers({
  currentUser: currentUserReducer,
  forums: forumsReducer,
  post: postReducer
});

export default reducers;