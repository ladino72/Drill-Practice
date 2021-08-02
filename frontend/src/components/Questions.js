import React from "react";
import { AnswerActionCreator } from "../Redux/actions/AnswerActionCreator";
import { useSelector, useDispatch } from "react-redux";
import { loadQuizActionCreator } from "../Redux/actions/loadQuizActionCreator";
import "../style.css"
import uuid from "react-uuid";
import { InlineTex } from 'react-tex';
import getTestValue from "../utils/getTestValue";
import Image from 'react-bootstrap/Image'


//import {InputGroup, FormControl} from 'react-bootstrap'

//https://codesandbox.io/s/mui-radiogroup-rnepu?file=/src/Demo.jsx/
//https://unsplash.com/s/photos/link


function Questions({ move }) {

    const dispatch = useDispatch();

    const { quiz, pager } = useSelector(state => state.QuizReducer)
    const { user } = useSelector(state => state.AuthReducer)
    const { score } = useSelector(state => state.QuizReducer)

    let USER = ""
    if (user !== null) { USER = user.name }

    const questions = quiz.questions

    // Get the total points of the CURRENT test
    // {score} is updated just when the user select an option. So it is necessary to get the total points of the quiz at the onset
    //Otherwise, the total points of the quiz is zero in the quations page

    let t_score = getTestValue(quiz)
    //---------------------------------------------

    const AddandGradeQuestion = (question, option) => {
        let quizT = JSON.parse(JSON.stringify(quiz));
        let q = quizT.questions.find(x => x.id === question.id);
        q.A.forEach((x) => { x.selected = false; });
        q.A.forEach((x) => { x.disabled = true; });


        q.A.find(x => x.id_ === option.id_).selected = true;
        q.A.find(x => x.id_ === option.id_).disabled = true;
        //console.log("q.A from Questions.js","-------++--------",q.A[0].id_===option.id_)

        console.log("*question,, from Questions.js", question)
        console.log("*option.id_ from Questions.js", option.id_)
        console.log("questionId", q.id)

        console.log("*quiz, from Questions.js**", quiz)
        console.log("*q, from Questions.js**///", q)
        let questIndex = quizT.questions.findIndex(x => x.id === q.id)
        console.log("*Index, from Questions.js", questIndex)
        quizT.questions[questIndex] = q
        console.log("*Newquiz, from Questions.js---->", quizT)

        dispatch(loadQuizActionCreator(quizT));

        let load = {}
        load["id"] = q.id;
        load["A"] = option.id_
        dispatch(AnswerActionCreator(load))


    }


    //Here we use callback Hook The next site explain very clearly the reason to use it
    //https://www.youtube.com/watch?v=IL82CzlaCys
    //let questions = questions ?questions.slice(pager.index, pager.index + pager.size) : [];

    return (
        <div className="questions-wrapper">

            <div className="header header-items" >
                <div className="header-item-1">{quiz.name}</div>
                <div className="header-item-2" >{USER}</div>
                <div className="header-item-3" >Score:{score.p_score}/{t_score}</div>
            </div>

            <div id="quiz" className="questions"  >

                {quiz.questions ? questions.slice(pager.index, pager.index + pager.size).map(quest =>
                    <div key={quest.id} className="quest" >
                        <div className=" my-2 quest-number badge rounded-pill bg-primary"><span className="h8">Question {pager.index + 1} of {pager.count}</span> </div>
                        <div className="h6 py-2 quest-body" >{pager.index + 1}. <span><InlineTex texContent={quest.Q} /></span></div>

                        <div className="quest-option">
                            <div className="quest-opt "  >
                                {
                                    quest.A.map(option =>

                                        <div key={uuid()} >
                                            <label className="font-weight-normal d-flex flex-row align-items-center py-1" htmlFor={option.id}>
                                                {/*https://react-bootstrap.netlify.app/components/input-group/#input-group-checkboxes */}
                                                <input type="checkbox" id={option.id} checked={option.selected ? true : false} disabled={option.disabled ? true : false} onChange={() => AddandGradeQuestion(quest, option)} /> <span style={{ fontSize: "0.9rem", marginLeft: "0.25rem" }} ><InlineTex texContent={option.opt} /></span>
                                            </label>
                                        </div>

                                    )
                                }
                            </div>

                            <div className="quest-fig" >

                                {quest.LinkQ ? <Image src={quest.LinkQ} /> : null}

                            </div>

                        </div>


                    </div>
                ) : []}


            </div >

            <div className="upper-controls" >
                <div className="first">
                    {quiz.config.allowBack && <button type="button" className="btn btn-outline-primary" id="first" onClick={(e) => move(e)}>First</button>}
                </div>
                <div className="prev">
                    {quiz.config.allowBack && <button type="button" className="btn btn-outline-primary" id="prev" onClick={(e) => move(e)}>Prev</button>}
                </div>
                <div className="next">
                    <button type="button" className="btn btn-outline-primary" id="next" onClick={(e) => move(e)}>Next</button>
                </div>
                <div className="last">
                    <button type="button" className="btn btn-outline-primary" id="last" onClick={(e) => move(e)}>Last</button>
                </div>
            </div>

        </div>
    )
}

export default Questions;

