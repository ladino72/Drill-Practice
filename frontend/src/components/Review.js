import React from "react";
import { useSelector } from "react-redux";
import ProgressBar from 'react-bootstrap/ProgressBar'



const Review = ({ move }) => {

    const { answerSheet } = useSelector(state => state.QuizReducer)
    //const answerSheet = useSelector(state => state.QuizReducer)
    //console.log("Answersheet",answerSheet)
    const { quiz } = useSelector(state => state.QuizReducer)

    const isAnswered = (q) => {

        return q.A.some(x => x.selected) ? 'Answered' : 'Not Answered';
    }
    let num_quest_answered = answerSheet.filter(checkedAnswerd => checkedAnswerd.A !== null);
    let total_questions = answerSheet.length;
    let Answered_percentage = (num_quest_answered.length / total_questions * 100).toFixed(1)


    return (
        <div >

            <h6 className="text-center font-weight-normal py-3">Progress: {quiz.name}</h6>
            <ProgressBar className="flex-grow-1" style={{ height: "2.5rem" }} now={Answered_percentage} animated label={`${Answered_percentage}%`} />

            <hr />
            <div >
                <div className=" row  text-center"  >
                    {quiz.questions.map((q, index) =>
                        <div key={q.id} className="col-sm-12 col-md-3 col-xl-2 ">
                            <div style={{ borderRadius: "0.5rem", color: "white", cursor: "pointer" }} id={index} onClick={(e) => move(e)} className={`p-2 mb-2 ${isAnswered(q) === 'Answered' ? 'answered_Yes' : 'answered_No'}`}>{index + 1}. {isAnswered(q)}</div>
                        </div>
                    )}
                </div>
            </div>
            <hr />
        </div >
    )

}


export default Review;
