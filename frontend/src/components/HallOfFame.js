import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useSelector } from "react-redux";

import { withRouter } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { FaTrophy, FaAward } from 'react-icons/fa';


import axios from "axios"

//import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import uuid from "react-uuid"

const HallOfFame = (props) => {
    //https://www.youtube.com/watch?v=8m8Q4wqFez0
    //React Router DOM v4 desde cero: BrowserRouter, Route, Switch, Redirect, Link, history
    //https://www.npmjs.com/package/react-alert
    const alert = useAlert()

    const { user } = useSelector(state => state.AuthReducer)


    const { history } = props
    const [tests, getTests] = useState([]);
    const [score, getScore] = useState([]);

    const getAllTests = useCallback(() => {
        axios
            .get("/api/tests") //Notice, we are using the proxy declared in the package.json file located in the frontend folder.
            .then((response) => {
                getTests(response.data);
                //I installed -wrap  console log simple-. Pressing Shift+ ele simplifies having to write console.log
            }).catch((error) => alert.show(`${error.response.data.message}`));

    }, [alert]);

    //https://levelup.gitconnected.com/fetch-api-data-with-axios-and-display-it-in-a-react-app-with-hooks-3f9c8fa89e7b
    useEffect(() => {
        getAllTests();
    }, [getAllTests]);




    const physFundamentals = tests.filter(item => (item.area === "Physics" && item.subject === "Fundamentals"));
    //console.log('physFundamentals', physFundamentals);
    const physMechanics = tests.filter(item => (item.area === "Physics" && item.subject === "Mechanics"));
    const physElectromagnetism = tests.filter(item => (item.area === "Physics" && item.subject === "Electromagnetism"));
    const physModern = tests.filter(item => (item.area === "Physics" && item.subject === "Modern"));

    const mathAlgebra = tests.filter(item => (item.area === "Math" && item.subject === "Algebra"));
    const mathCalculus1 = tests.filter(item => (item.area === "Math" && item.subject === "Calculus 1"));
    const mathCalculus2 = tests.filter(item => (item.area === "Math" && item.subject === "Calculus 2"));
    const mathCalculus3 = tests.filter(item => (item.area === "Math" && item.subject === "Calculus 3"));



    const getScores = useCallback((id) => {
        console.log("id", id)
        axios
            .get(`/api/ranking/${id}`) //Notice, we are using the proxy declared in the package.json file located in the frontend folder.
            .then((response) => {
                getScore(response.data);
                //I installed -wrap  console log simple-. Pressing Shift+ ele simplifies having to write console.log
            }).catch((error) => alert.show(`${error.response.data.message}`));

    }, [alert]);


    useEffect(() => {
        //We load a default test and this one is kinematic (Mechanics) whose id is "60f379bfa357fc0d2b30d3f2". This value was assigned 
        //by MongoDb in the "problems collection". The same is done in the statistics component.

        getScores("60f379bfa357fc0d2b30d3f2")
    }, [getScores]);

    //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    if (score[0] !== undefined) {
        score[0].topScores.sort((a, b) => (a.score > b.score) ? -1 : 1)
    }

    const handleClick = (e) => {
        history.push("/tests")
    }
    const handleSelect = (eventKey) => { getScores(eventKey) };



    return (
        <Fragment>
            <div className="d-flex  flex-column">

                <div className="d-flex justify-content-between flex-wrap" style={{ backgroundColor: "#f0f8ff" }}>
                    <h5 className=" px-2">Physics</h5>
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
                    <h5 className=" px-2">Math</h5>
                    <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
                        <Nav.Item>
                            <NavDropdown title="Algebra" id="nav-dropdown">
                                {mathAlgebra.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Calculus 1" id="nav-dropdown">
                                {mathCalculus1.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Calculus 2" id="nav-dropdown">
                                {mathCalculus2.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Calculus 3" id="nav-dropdown">
                                {mathCalculus3.map(item => <NavDropdown.Item key={uuid()} eventKey={item._id} >{item.topic}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>


            {score[0] !== undefined ?
                <div style={{ marginTop: "10px" }} >
                    <div>
                        <h6 style={{ color: "#0099CC" }}>{score[0].name} / {score[0].value.toFixed(2)} points</h6>
                        <h6 style={{ color: "#0099CC" }}>RANKING</h6>
                    </div>

                    <div>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>#</th>
                                    <th> Name</th>
                                    <th style={{ textAlign: "center" }}>Score</th>
                                    <th style={{ textAlign: "center" }}>Prize</th>
                                </tr>
                            </thead>
                            <tbody>
                                {score[0].topScores.map((q, index) =>
                                    <tr key={q._id}>
                                        {user.name === q.name ? <th style={{ color: "red", textAlign: "center" }} scope="row">{index + 1}</th> : <th style={{ textAlign: "center" }} scope="row">{index + 1}</th>}
                                        {user.name === q.name ? <td style={{ color: "red" }}>{q.name}</td> : <td>{q.name}</td>}
                                        {user.name === q.name ? <td style={{ color: "red", textAlign: "center" }}>{q.score.toFixed(2)}</td> : <td style={{ textAlign: "center" }}>{q.score.toFixed(2)}</td>}
                                        {q.score === 1.0 * score[0].value ?
                                            <td style={{ color: "gold", textAlign: "center", fontSize: "1.3rem" }}><FaTrophy />{" "}<FaTrophy />{" "}<FaTrophy /></td> :
                                            (q.score >= 0.9 * score[0].value && q.score < 1.0 * score[0].value) ?
                                                <td style={{ color: "gold", textAlign: "center", fontSize: "1.3rem" }}><FaTrophy />{" "}<FaTrophy /></td> :
                                                (q.score >= 0.8 * score[0].value && q.score < 0.9 * score[0].value) ?
                                                    <td style={{ color: "gold", textAlign: "center", fontSize: "1.3rem" }}><FaTrophy /></td> :
                                                    <td style={{ color: "black", textAlign: "center", fontSize: "1.0rem", opacity: "0.4" }}><FaAward /></td>}
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                    <Button onClick={(e) => handleClick(e)}>Go back</Button>

                </div> : null}

        </Fragment>
    )
}

export default withRouter(HallOfFame)
