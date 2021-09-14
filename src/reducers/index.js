import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import forumsReducer from "./forums";

const reducers = combineReducers({
  currentUser: currentUserReducer,
  forums: forumsReducer
});

export default reducers;