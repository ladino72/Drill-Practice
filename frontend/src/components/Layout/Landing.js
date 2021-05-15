import React,{useEffect} from "react";

import { Link } from 'react-router-dom';
import {logOutActionCreator} from "../../Redux/actions/AuthActionCreator"; //************* */

import {useDispatch} from "react-redux";

const Landing = () => {
  const dispatch = useDispatch();         //*************** */

  useEffect(() => {
    dispatch(logOutActionCreator());
   
  }, [dispatch])

    return (
        <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Drill and Practice Application in Science </h1>
          <p className='lead'>
            Reinforce basic concepts of physics, mathematics, chemistry, etc. 
            
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'> Sign Up  </Link>
            <Link to='/login' className='btn btn-light'> Login </Link>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing
