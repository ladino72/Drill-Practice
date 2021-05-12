import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = ({logout}) => {
  const {isAuthenticated,loading} = useSelector(state => state.AuthReducer);
  
  const authLinks = (
    <ul>
    <li>
        <Link to="/tests">Tests</Link>
      </li>
      <li className="nowrap">
        <Link to="/hallOfame">Hall of fame</Link>
      </li>
      <li>
        <Link to="/statistics">Statistics</Link>
      </li>
      
      <li>
        <Link to ="/" onClick={() =>logout()} >
        <i className="fas fa-sign-out-alt" />{' '}
        <span className="hide-sm">Logout</span>   
        </Link>
      </li>
      
    </ul>
  );
  const guestLinks = (
    <ul>
     
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

    return (
        <nav className="navbar bg-dark" >
        <h1>
            <Link to="/"> <i className="fas fa-globe" /> Drill & Practice  </Link>
        </h1>

        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </nav>
    )
}

export default Navbar
