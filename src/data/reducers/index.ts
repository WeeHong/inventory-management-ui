import { combineReducers } from "redux";
import authenticationReducer from "./authentication";

export interface State {
  authentication: ReturnType<typeof authenticationReducer>;
}

export default combineReducers<State>({
  authentication: authenticationReducer,
});
