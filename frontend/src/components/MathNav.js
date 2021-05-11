import React from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import uuid from "react-uuid"


const MathNav = ({ tests, setQuizId }) => {

  const mathAlgebra = tests.filter(item => (item.area === "Math" && item.subject === "Algebra"));
 
  const handleSelect = (eventKey) => {setQuizId(eventKey)};


  return (
    <Nav variant="pills" activeKey="1" onSelect={handleSelect} >
     
      <Nav.Item>
        <NavDropdown title="Algebra" id="nav-dropdown">
        {mathAlgebra.map(item => <NavDropdown.Item  key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}

        </NavDropdown>
      </Nav.Item>
      <Nav.Item>
        <NavDropdown title="Trigonometry" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
      <Nav.Item>
        <NavDropdown title="Calculus 1" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
      <Nav.Item>
        <NavDropdown title="Calculus 2" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
      <Nav.Item>
        <NavDropdown title="Calculus 3" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
      
      
     
      
    </Nav>
  );
}



export default MathNav
