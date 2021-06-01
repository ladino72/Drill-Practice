import {combineReducers} from "redux";

import QuizReducer from './QuizReducer';
import AlertReducer from "./AlertReducer";
import AuthReducer from "./AuthReducer";
import PostScoreReducer from "./PostScoreReducer";
import GetTestReducer from "./GetTestReducer";

export default combineReducers({
    QuizReducer,
    AlertReducer,
    AuthReducer,
    PostScoreReducer,
    GetTestReducer
});
