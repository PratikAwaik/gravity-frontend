import { combineReducers } from "redux";
import userReducer from "./user";
import forumsReducer from "./forums";

const reducers = combineReducers({
  user: userReducer,
  forums: forumsReducer
});

export default reducers;