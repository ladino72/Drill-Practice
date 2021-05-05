import rootReducer from "./reducers"
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import setAuthToken from './../utils/SetAuthToken';
import thunk from "redux-thunk"

const middleware=[thunk]

const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));



export default store;