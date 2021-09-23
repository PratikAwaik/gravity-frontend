import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import errorReducer from "./error";
import forumsReducer from "./forums";
import postReducer from "./post";

const reducers = combineReducers({
  currentUser: currentUserReducer,
  forums: forumsReducer,
  post: postReducer,
  error: errorReducer
});

export default reducers;