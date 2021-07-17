import React from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import uuid from "react-uuid";
import { useAlert } from 'react-alert';



const MathNav = ({ tests, setQuizId }) => {
  const alert = useAlert()

  if (tests === null) alert.show("Network connection issues")
  const mathAlgebra = tests.filter(item => (item.area === "Math" && item.subject === "Algebra"));
  const mathCalculus1 = tests.filter(item => (item.area === "Math" && item.subject === "Calculus 1"));
  const mathCalculus2 = tests.filter(item => (item.area === "Math" && item.subject === "Calculus 2"));
  const mathCalculus3 = tests.filter(item => (item.area === "Math" && item.subject === "Calculus 3"));


  const handleSelect = (eventKey) => { setQuizId(eventKey) };


  return (
    <Nav variant="pills" activeKey="1" onSelect={handleSelect} className="d-flex flex-row" >

      <Nav.Item>
        <NavDropdown title="Algebra" id="nav-dropdown">
          {mathAlgebra.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}

        </NavDropdown>
      </Nav.Item>

      <Nav.Item className="flex-grow-1">
        <NavDropdown title="Calculus 1" id="nav-dropdown">
          {mathCalculus1.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
        </NavDropdown>
      </Nav.Item>
      <Nav.Item className="flex-grow-1">
        <NavDropdown title="Calculus 2" id="nav-dropdown">
          {mathCalculus2.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
      <Nav.Item className="flex-grow-1">
        <NavDropdown title="Calculus 3" id="nav-dropdown">

          {mathCalculus3.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}

        </NavDropdown>
      </Nav.Item>




    </Nav>
  );
}



export default MathNav
