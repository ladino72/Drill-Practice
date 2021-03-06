import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import Questions from "./Questions";
import Results from './Results';
import Review from "./Review";
import Button from "react-bootstrap/Button";


import { PagerUpdatetActionCreator } from '../Redux/actions/PagerUpdateActionCreator';
import { QuizSubmitActionCreator } from "../Redux/actions/QuizSubmitActionCreator";

const Quiz = () => {
    const dispatch = useDispatch();
    const { mode, pager } = useSelector(state => state.QuizReducer)

    const move = (e) => {
        let id = e.target.id;
        let index = 0;
        if (id === 'first')
            index = 0;
        else if (id === 'prev')
            index = pager.index - 1;
        else if (id === 'next')
            index = pager.index + 1;
        else if (id === 'last')
            index = pager.count - 1;
        else
            index = parseInt(e.target.id, 10);

        if (index >= 0 && index < pager.count) {
            let pag = {
                index: index,
                size: 1,
                count: pager.count
            };
            dispatch(PagerUpdatetActionCreator(pag));
        }
    }

    const setMode = (e) => {
        console.log("Event:", e.target.id)
        dispatch(QuizSubmitActionCreator(e.target.id))
    };


    const renderMode = () => {
        if (mode === 'quiz') {

            return (<Questions move={move} />)

        } else if (mode === 'review') {
            return (<Review move={move} />)
        } else if (mode === 'submit') {
            //if (pager.index + 1 === pager.count) {
            return (<Results move={move} />)
            //} else {
            //dispatch(QuizSubmitActionCreator("quiz"));
            //dispatch(SetAlertActionCreator("Please answer all questions", "danger"));
            //}

        } else { }
    }

    return (
        <div >
            {renderMode()}
            {(mode !== 'submit') &&
                <div className="lower-controls ">
                    <button type="button" className="btn btn-outline-outline-primary" style={{ marginBottom: "0.4rem" }} id="quiz" onClick={(e) => setMode(e)}>Quiz</button>
                    <button type="button" className="btn btn--outline-primary" style={{ marginBottom: "0.4rem" }} id="review" onClick={(e) => setMode(e)}>Review</button>
                    <button type="button" className="btn btn-outline-primary" style={{ marginBottom: "0.4rem" }} id="submit" onClick={(e) => setMode(e)} >Submit</button >
                </div >}

        </div>
    )

}

export default Quiz;