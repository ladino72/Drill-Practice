import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import Button from "react-bootstrap/Button";

import Chart from "./Chart"


import axios from "axios"

//import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Jumbotron from "react-bootstrap/Jumbotron"
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import uuid from "react-uuid"

const Statistics = (props) => {
    //https://www.youtube.com/watch?v=8m8Q4wqFez0
    //React Router DOM v4 desde cero: BrowserRouter, Route, Switch, Redirect, Link, history

    const [tests, getTests] = useState([]);
    const [statData, setData] = useState({});
    const { history } = props

    //https://levelup.gitconnected.com/fetch-api-data-with-axios-and-display-it-in-a-react-app-with-hooks-3f9c8fa89e7b
    useEffect(() => {
        getAllTests();
    }, []);



    const getAllTests = () => {
        axios
            .get("/api/tests") //Notice, we are using the proxy declared in the package.json file located in the frontend folder.
            .then((response) => {
                getTests(response.data);
                //I installed -wrap  console log simple-. Pressing Shift+ ele simplifies having to write console.log
            })
            .catch((error) => alert(`Error: ${error}`));
    };


    const physFundamentals = tests.filter(item => (item.area === "Physics" && item.subject === "Fundamentals"));
    //console.log('physFundamentals', physFundamentals);
    const physMechanics = tests.filter(item => (item.area === "Physics" && item.subject === "Mechanics"));
    const physElectromagnetism = tests.filter(item => (item.area === "Physics" && item.subject === "Electromagnetism"));
    const physModern = tests.filter(item => (item.area === "Physics" && item.subject === "Modern"));

    const mathAlgebra = tests.filter(item => (item.area === "Math" && item.subject === "Algebra"));


    const getStatsData = (id) => {
        console.log("From Statistics component, id:", id)
        axios
            .get(`/api/statistics/${id}`) //Notice, we are using the proxy declared in the package.json file located in the frontend folder.
            .then((response) => {
                setData(response.data);
                console.log("--------Answer from axios-------------", response.data)
                //I installed -wrap  console log simple-. Pressing Shift+ ele simplifies having to write console.log
            })
            .catch((error) => alert(`Error: ${error}`));
    };

    useEffect(() => {
        //We load a default test and this one is kinematic (Mechanics) whose id is "60294174b4d3640ce78bf544". This value was assigned 
        //by MongoDb in the "problems collection". The same is done in the hallOfFame component.
        getStatsData("60294174b4d3640ce78bf544");
    }, [])

    const handleClick = (e) => {
        history.push("/tests")
    }
    const handleSelect = (eventKey) => { getStatsData(eventKey) };

    //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/


    return (
        <Fragment>

            <div className="d-flex  flex-column">

                <div className="d-flex justify-content-between flex-wrap" style={{ backgroundColor: "#f0f8ff" }}>
                    <h4 className=" px-2">Physics</h4>
                    <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
                        <Nav.Item>
                            <NavDropdown title="Fundamental" id="nav-dropdown">
                                {physFundamentals.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Mechanics" id="nav-dropdown">
                                {physMechanics.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Electromagnetism" id="nav-dropdown">
                                {physElectromagnetism.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Modern" id="nav-dropdown">
                                {physModern.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </div>

                <div className="d-flex justify-content-between flex-wrap" style={{ backgroundColor: "#f0f8ff" }}>
                    <h4 className=" px-2">Math</h4>
                    <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
                        <Nav.Item>
                            <NavDropdown title="Algebra" id="nav-dropdown">
                                {mathAlgebra.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Calculus I" id="nav-dropdown">
                                {physMechanics.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Calculus II" id="nav-dropdown">
                                {physElectromagnetism.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Calculus III" id="nav-dropdown">
                                {physModern.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </div>

                <div className="d-flex justify-content-between flex-wrap" style={{ backgroundColor: "#f0f8ff" }}>
                    <h4 className=" px-2">Chemistry</h4>

                    <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
                        <Nav.Item>
                            <NavDropdown title="Chemistry 1" id="nav-dropdown">
                                {mathAlgebra.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>

                        <Nav.Item>
                            <NavDropdown title="Chemistry 2" id="nav-dropdown">
                                {physModern.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Chemistry 3" id="nav-dropdown">
                                {physModern.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
            <h6 style={{ color: "blue", paddingTop: "10px", fontSize: "1.2rem" }}>
                This section shows the statistics of the average scores in percentage form of all the participants. Please select a topic to see the stattistics.
    </h6>


            {statData.data !== undefined ?
                <div>
                    <h5 style={{ color: "red", paddingTop: "10px" }}> TOTAL TEST TAKERS: {statData.particpant_num}</h5>
                    <Chart chartDatos={statData} />
                </div>
                : null}

                <Button onClick={(e) => handleClick(e)}>Go back </Button>

        </Fragment>
    )
}

export default withRouter(Statistics)
