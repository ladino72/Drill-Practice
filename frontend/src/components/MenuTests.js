
import React from "react";
//import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';

import PhysNav from "./PhysNav";
import MathNav from "./MathNav";

const MenuTests = ({ tests, setQuizId }) => {

    return (

        <div style={{ backgroundColor: "#f0f8ff" }} className="d-flex flex-column">

            <div className="d-flex justify-content-between flex-wrap ">
                <h5 className=" px-2" >Physics</h5>
                <PhysNav tests={tests} setQuizId={setQuizId} />
            </div>

            <div className="d-flex justify-content-between flex-wrap ">
                <h5 className=" px-2">Math</h5>
                <MathNav tests={tests} setQuizId={setQuizId} />
            </div>

        </div>


    )
}

export default MenuTests
