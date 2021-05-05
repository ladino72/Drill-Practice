import {combineReducers} from "redux";

import QuizReducer from './QuizReducer';
import AlertReducer from "./AlertReducer";
import AuthReducer from "./AuthReducer";
import CurrentTestIdReducer from "./CurrentTestIdReducer"
import PostScoreReducer from "./PostScoreReducer"

export default combineReducers({
    QuizReducer,
    AlertReducer,
    AuthReducer,
    CurrentTestIdReducer,
    PostScoreReducer
});
