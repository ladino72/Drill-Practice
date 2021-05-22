import React,{Fragment,useEffect} from "react";
import PrivateRoute from "./components/Routing/PrivateRoute"


import NavBar from "./components/Layout/NavBar";
import Landing from "./components/Layout/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register"
import Alert from "./components/Layout/Alert"
import {loadUserActionCreator} from "./Redux/actions/AuthActionCreator"
import setAuthToken from "./utils/SetAuthToken"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Tests from "./components/Tests"
import HallOfFame from "./components/HallOfFame"
import Statistics from "./components/Statistics"


import "./App.css"
import store from "./Redux/store"

import {logOutActionCreator} from "./Redux/actions/AuthActionCreator"; //************* */
import {useDispatch} from "react-redux";
if(localStorage.token){
  setAuthToken(localStorage.token)
}


const App=()=> {
  const dispatch = useDispatch();         //*************** */
  
  const logout=()=>{
    dispatch(logOutActionCreator());
  }

  useEffect(()=>{
    store.dispatch(loadUserActionCreator())
  },[]);
 
return(
  
    <Router>
      <Fragment>
      <NavBar logout={logout}/>
      <Route exact path="/" component={Landing} /> 
      <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/hallOfame" component={HallOfFame} /> 
            <Route exact path="/statistics" component={Statistics} />
            <PrivateRoute exact path="/tests" component={Tests} /> 
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/register" component={Register} /> 
        </Switch>
        </section>
        </Fragment>
    </Router>
 

)
  }

export default App
