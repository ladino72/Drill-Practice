
import React from "react";
//import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';

import PhysNav from "./PhysNav";
import MathNav from "./MathNav";

const MenuTests = ({ tests, setQuizId }) => {

    return (

        <div style={{backgroundColor:"#f0f8ff"}} className="container">

            <div className="d-flex justify-content-between flex-wrap align-items-center">
                <h4 className=" px-2" >Physics</h4>
                <PhysNav tests={tests} setQuizId={setQuizId} />
            </div>

            <div className="d-flex justify-content-between flex-wrap align-items-center">
                <h4 className=" px-2 ">Math</h4>
                <MathNav tests={tests} setQuizId={setQuizId}/>
            </div>
            <div className="d-flex justify-content-between flex-wrap align-items-center">
                <h4 className=" px-2">Chemistry</h4>
            </div>
            <div className="d-flex justify-content-between flex-wrap align-items-center">
                <h4 className=" px-2">Biology</h4>
            </div>


        </div>


    )
}

export default MenuTests
