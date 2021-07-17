import axios from "axios";

import {RegisterSuccessAction}  from "./actions";
import {SetAlertActionCreator}  from "./SetAlertActionCreator";
import {RegisterFailAction}  from "./actions";
import {UserLoadedAction} from "./actions";
import {AuthErrorAction} from "./actions";
import {LoginSuccessAction} from "./actions";
import {LoginFailAction} from "./actions";
import {LogOutAction} from "./actions";
import setAuthToken from "../../utils/SetAuthToken"


// Load User
export const loadUserActionCreator = () => async dispatch => {

    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get("/api/users");
        console.log('----------------', res);
    
        dispatch(UserLoadedAction(res.data));
      } catch (err) {
        dispatch(AuthErrorAction());
      }
  };


// Register User
export const AuthActionCreator = ({name,email,password}) => async dispatch => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({name,email,password});
    try {
        const res = await axios.post('/api/users', body,config);

        dispatch(RegisterSuccessAction(res.data)); //we get the token
        dispatch(loadUserActionCreator());
        
  } catch (err) {
      const errors = err.response.data.errors;
      console.log('----------->errors', errors);
      

      if (errors) {
        errors.forEach(error => dispatch(SetAlertActionCreator(error.msg, 'danger')));
      }  

      dispatch(RegisterFailAction());

  }
};


// login User
export const loginUserActionCreator = ({email,password}) => async dispatch => {
  const config={
      headers:{
          "Content-Type":"application/json"
      }
  }
  const body = JSON.stringify({email,password});
  console.log("--------*-*--**",body)
  try {
      const res = await axios.post('/api/auth', body,config);

      dispatch(LoginSuccessAction(res.data)); 
      dispatch(loadUserActionCreator());
} catch (err) {
    const errors = err.response.data.errors;
    console.log('----------->errors', errors);
    

    if (errors) {
      errors.forEach(error => dispatch(SetAlertActionCreator(error.msg, 'danger')));
    }  

    dispatch(LoginFailAction());

}
};

// Logout
export const logOutActionCreator = () => dispatch=>{
  dispatch(LogOutAction())
};