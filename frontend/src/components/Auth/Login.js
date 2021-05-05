import React, { Fragment, useState, useEffect,useRef } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import {loginUserActionCreator} from "../../Redux/actions/AuthActionCreator"
import { useSelector,useDispatch } from "react-redux";

const Login = () => {
  const  dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.AuthReducer);
  console.log('isAuthenticated', isAuthenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

//https://www.youtube.com/watch?v=ScT4ElKd6eo
//React Hook useRef and forwarding refs with forwardRef

  // const emailRef=useRef(null);
  // const passwordRef=useRef(null);
  // const loginRef=useRef(null);

  // const emailKeyDown=(e)=>{
  //   if(e.key==="Enter"){
  //   passwordRef.current.focus();
  //   }
  // }
  // const passwordKeyDown=(e)=>{
  //   if(e.key==="Enter"){
  //     loginRef.current.focus();
  //     }
  // }

  
  // useEffect(() => {
  //  emailRef.current.focus();
    
  // }, [])

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginUserActionCreator({email,password}))
    
  };

  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/tests"/>
  }
  
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            //ref={emailRef}
            //onKeyDown={emailKeyDown}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            //ref={passwordRef}
            //onKeyDown={passwordKeyDown}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login"  />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};


export default Login;


