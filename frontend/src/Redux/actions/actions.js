
import {ADD_ANSWER,LOAD_ANSWER_SHEET,LOAD_QUIZ,PAGER_UPDATE,QUIZ_SUBMIT,READ_SCORE,SET_ALERT,REMOVE_ALERT,
    REGISTER_SUCCESS,REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, 
    LOGOUT,POST_SCORE, GET_TEST, GET_TEST_ERROR} from "../types";


export const AnswerAction=(payload)=>{
    return (
        {type:ADD_ANSWER,ans:payload}
    )
}

export const LoadAnswerSheetAction=(payload)=>{
    return (
        {type:LOAD_ANSWER_SHEET,answer_sheet:payload}
    )
}

export const LoadQuizAction=(payload)=>{
    return (
        {type:LOAD_QUIZ,quiz:payload}
    )
}

export const PagerUpdateAction=(payload)=>{
    return (
        {type:PAGER_UPDATE,pager:payload}
    )
}

export const QuizSubmitAction=(payload)=>{
    return (
        {type:QUIZ_SUBMIT,mode:payload}
    )
}

export const ReadScoreAction=(payload)=>{
    return (
        {type:READ_SCORE,score:payload}
    )
}

export const SetAlertAction=(payload)=>{
    return (
        {type:SET_ALERT,payload:payload}
    )
}

export const RemoveAlertAction=(payload)=>{
    return (
        {type:REMOVE_ALERT,payload:payload}
    )
}

export const RegisterSuccessAction=(payload)=>{
    return (
        {type:REGISTER_SUCCESS,payload:payload}
    )
}
export const RegisterFailAction=()=>{
    return (
        {type:REGISTER_FAIL}
    )
}

export const UserLoadedAction=(payload)=>{
   return (
        {type:USER_LOADED,payload:payload}
    )
}

export const AuthErrorAction=()=>{
    return (
         {type:AUTH_ERROR}
     )
 }
 
 export const LoginSuccessAction=(payload)=>{
    return (
        {type:LOGIN_SUCCESS,payload:payload}
    )
}
export const LoginFailAction=()=>{
    return (
        {type:LOGIN_FAIL}
    )
}

export const LogOutAction=()=>{
    return (
        {type:LOGOUT}
    )
}

export const PostScoreAction=(payload)=>{
    return (
        {type:POST_SCORE,post:payload}
    )
}
export const GetTestAction=(payload)=>{
    return (
        {type:GET_TEST,payload}
    )
}
export const GetTestFailAction=(payload)=>{
    return (
        {type:GET_TEST_ERROR,payload}
    )
}


