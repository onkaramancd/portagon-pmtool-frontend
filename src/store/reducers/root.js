import {combineReducers} from "redux";
import atlassianAPIReducer from "./atlassianAPIReducer";
import converterReducer from "./converterReducer";

export default combineReducers({
    atlassianAPIReducer,
    converterReducer
});