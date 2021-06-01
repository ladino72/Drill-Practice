import React from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import uuid from "react-uuid"

const PhysNav = ({ tests, setQuizId }) => {

  const physFundamentals = tests.filter(item => (item.area === "Physics" && item.subject === "Fundamentals"));
  //console.log('physFundamentals', physFundamentals);
  const physMechanics = tests.filter(item => (item.area === "Physics" && item.subject === "Mechanics"));
  const physElectromagnetism = tests.filter(item => (item.area === "Physics" && item.subject === "Electromagnetism"));
  const physModern = tests.filter(item => (item.area === "Physics" && item.subject === "Modern"));

  const handleSelect = (eventKey) => { setQuizId(eventKey) };


  return (
<div>



      <Nav variant="pills" activeKey="1" onSelect={handleSelect} className="d-flex flex-row">
        <Nav.Item className="flex-grow-1">
          <NavDropdown title="Fundamental" id="nav-dropdown">
            {physFundamentals.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
          </NavDropdown>
        </Nav.Item>
        <Nav.Item className="flex-grow-1">
          <NavDropdown title="Mechanics" id="nav-dropdown">
            {physMechanics.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
          </NavDropdown>
        </Nav.Item>
        <Nav.Item className="flex-grow-1">
          <NavDropdown title="Electromagnetism" id="nav-dropdown">
            {physElectromagnetism.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
          </NavDropdown>
        </Nav.Item>
        <Nav.Item className="flex-grow-1">
          <NavDropdown title="Modern" id="nav-dropdown">
            {physModern.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
          </NavDropdown>
        </Nav.Item>
      </Nav>

      </div>
  );
}

export default PhysNav
