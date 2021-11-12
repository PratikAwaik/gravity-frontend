import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import errorReducer from "./error";
import forumsReducer from "./forums";
import commentsReducer from "./comments";
import subredditsReducer from "./subreddits";
import postReducer from "./post";

const reducers = combineReducers({
  currentUser: currentUserReducer,
  forums: forumsReducer,
  comments: commentsReducer,
  error: errorReducer,
  subreddits: subredditsReducer,
  post: postReducer,
});

export default reducers;
