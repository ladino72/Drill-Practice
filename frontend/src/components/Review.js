import React from "react";
import {useSelector} from "react-redux";
 

const Review = ({move}) => {
    //const {answerSheet}= useSelector(state => state.QuizReducer)}
    //const answerSheet = useSelector(state => state.QuizReducer)
    //console.log("Answersheet",answerSheet)
    const {quiz} = useSelector(state => state.QuizReducer)
    
    const isAnswered = (q) => {
            
            return q.A.some(x => x.selected) ? 'Answered' : 'Not Answered';
        }

        return (
        <div >

            <h6 className="text-center font-weight-normal py-3">Review: {quiz.name}</h6>
            <hr/>
            <div >
                <div className=" row  text-center"  >
                    {quiz.questions.map((q, index) =>
                        <div key={q.id} className="col-sm-4 col-md-4 cursor-pointer">
                            <div id={index} onClick={(e)=>move(e)} className={`p-2 mb-2 ${isAnswered(q) === 'Answered' ? 'bg-info' : 'bg-warning'}`}>{index + 1}. {isAnswered(q)}</div>
                        </div>
                    )}
                </div>
            </div>
            <hr/>
        </div >
        )
        
    }


export default Review;
