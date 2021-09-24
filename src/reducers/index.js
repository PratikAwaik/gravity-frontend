import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import errorReducer from "./error";
import forumsReducer from "./forums";

const reducers = combineReducers({
  currentUser: currentUserReducer,
  forums: forumsReducer,
  error: errorReducer
});

export default reducers;