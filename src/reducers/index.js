import { combineReducers } from "redux";
import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import friendList from "./friendList";

const rootReducer = combineReducers({
  counterReducer,
  loggedReducer,
  friendList
});
export default rootReducer;
