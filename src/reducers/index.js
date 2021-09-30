import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import errorReducer from "./error";
import forumsReducer from "./forums";
import commentsReducer from "./comments";

const reducers = combineReducers({
  currentUser: currentUserReducer,
  forums: forumsReducer,
  comments: commentsReducer,
  error: errorReducer,
});

export default reducers;
