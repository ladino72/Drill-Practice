import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const NavBar = ({ logout }) => {
  const { isAuthenticated, loading } = useSelector(state => state.AuthReducer);

  const authLinks = (
    <Nav className=" ml-auto">
      <Nav.Link href="/tests">Tests</Nav.Link>
      <Nav.Link href="/hallOfame">Hall of fame</Nav.Link>
      <Nav.Link href="/statistics">Statistics </Nav.Link>

      <Nav.Link href="/" onClick={() => logout()} >
        <i className="fas fa-sign-out-alt" />{' '}
        <span className="hide-sm">Logout</span>
      </Nav.Link>
    </Nav>

  );
  const guestLinks = (
    <Nav className="ml-auto" >
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="dark" expand="md" sticky="top" variant="dark" collapseOnSelect >
      <Navbar.Brand>
        <h3>
         Drill & Practice
        </h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
      <Navbar.Collapse>
            
      {!loading && isAuthenticated ? authLinks : guestLinks}
      
    
        
      </Navbar.Collapse>

    </Navbar>
  )
}

export default NavBar
