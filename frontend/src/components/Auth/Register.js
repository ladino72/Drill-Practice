import React, { Fragment, useState} from 'react';

import { Link,Redirect} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import {SetAlertActionCreator} from "../../Redux/actions/SetAlertActionCreator";
import {AuthActionCreator} from "../../Redux/actions/AuthActionCreator";



const Register = () => {
  const  dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.AuthReducer);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

//https://www.youtube.com/watch?v=ScT4ElKd6eo
//React Hook useRef and forwarding refs with forwardRef

  // const nameRef=useRef(null);
  // const emailRef=useRef(null);
  // const passwordRef=useRef(null);
  // const password2Ref=useRef(null);
  // const submitRef=useRef(null);


  // const nameKeyDown=(e)=>{
  //   if(e.key==="Enter"){
  //   emailRef.current.focus();
  //   }
  // }
  // const emailKeyDown=(e)=>{
  //   if(e.key==="Enter"){
  //   passwordRef.current.focus();
  //   }
  // }
  // const passwordKeyDown=(e)=>{
  //   if(e.key==="Enter"){
  //     password2Ref.current.focus();
  //     }
  // }
  // const password2KeyDown=(e)=>{
  //   if(e.key==="Enter"){
  //     submitRef.current.focus();
  //     }
  // }

  
  // useEffect(() => {
  //  nameRef.current.focus();
    
  // }, [])

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
        dispatch(SetAlertActionCreator("Passwords do not match","danger"));

      
    } else {
        //console.log("SUCCESS")
        dispatch(AuthActionCreator({name,email,password}));
    }
  };

  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/tests"/>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            //ref={nameRef}
            //onKeyDown={nameKeyDown}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            //ref={emailRef}
            //onKeyDown={emailKeyDown}


          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            //ref={passwordRef}
            //onKeyDown={passwordKeyDown}


          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            //ref={password2Ref}
            //onKeyDown={password2KeyDown}

          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register"  />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};


export default Register;

