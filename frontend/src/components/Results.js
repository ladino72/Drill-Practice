import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { QuizSubmitActionCreator } from "../Redux/actions/QuizSubmitActionCreator";
import { InlineTex } from 'react-tex';

import { FaCheck, FaTimes } from 'react-icons/fa';
import uuid from "react-uuid"
import axios from "axios";
import { PostScoreActionCreator } from '../Redux/actions/PostScoreActionCreator';
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import { useAlert } from 'react-alert'



const Results = () => {
  const dispatch = useDispatch()
  const postScore = useSelector(state => state.PostScoreReducer.postScore)
  const answer_sheet = useSelector(state => state.QuizReducer.answerSheet);
  const { questions } = useSelector(state => state.QuizReducer.quiz)
  const { quiz } = useSelector(state => state.QuizReducer)

  const { config } = useSelector(state => state.QuizReducer.quiz)
  const { score } = useSelector(state => state.QuizReducer)
  const { user } = useSelector(state => state.AuthReducer)
  const alert = useAlert();

  //console.log('currentTestId', currentTestId);
  console.log(">>>>>>>>Config", config)
  console.log(">>>>>>>>testId", "+++++++++", quiz._id)
  let currentTestId = quiz._id;

  //console.log("AnswerSheet***********", answer_sheet)

  useEffect(() => {
    if (!postScore) {
      console.log('postScore', typeof (postScore));

      //SaveScore(currentTestId,score.p_score)
      const registerScore = (currentTestId) => {
        const axiosconfig = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        try {
          let string_table = [];
          let big_string = "";
          //Just send answered questions
          answer_sheet.forEach((ele) => ele.A !== null ? string_table.push(`C=${ele.Correct}-Id=${ele.id}`) : null)
          string_table.forEach(ele => big_string += ele.toString() + "/")
          axios.post("/api/ranking", { "ID": currentTestId, "score": big_string }, axiosconfig)

        } catch (error) {
          alert.show(`${error.response.data.message}`)
        }
      };

      registerScore(currentTestId);

      dispatch(PostScoreActionCreator(true))
    };

  }, [postScore, currentTestId, dispatch, answer_sheet, alert]);

  let questions_Filtered = []

  let answer_sheet_Filtered = answer_sheet.filter(ele => ele.A !== null);
  for (let k = 0; k < answer_sheet_Filtered.length; k++) {
    let id = answer_sheet_Filtered[k].id;
    questions_Filtered[k] = questions[questions.findIndex(ele => ele.id === id)]

  }

  console.log("answer_sheet_Filtered", answer_sheet_Filtered)
  console.log("questions_Filtered", questions_Filtered)




  //https://react-icons.github.io/react-icons/icons?name=fa
  // I installed react-icons: npm install react-icons --save
  //Go to this place to select diffretent icon libraries including font-awsome BsXSquare

  const handleClick = (e) => {
    dispatch(QuizSubmitActionCreator("quiz"));
  }

  return (

    <div >

      <div className="header header-items" >
        <div className="header-item-1">{quiz.name}</div>
        <div className="header-item-2" >{user.name}</div>
        <div className="header-item-3" >Score:{score.p_score}/{score.t_score}</div>
      </div>

      {questions.map((quest, index) => {

        return (
          <div>
            {answer_sheet[index].A !== null && answer_sheet[index] !== undefined ?
              <div key={uuid()} className="results-wrapper border-right border-left border-success p-3 mb-2 bg-light text-dark">

                <div className="points" style={{ color: "red" }}>Points:{answer_sheet[index] !== undefined ? answer_sheet[index].Score : null}/{quest.Points}  {answer_sheet[index] !== undefined ? (answer_sheet[index].A == null ? "Not answered" : null) : null}</div>

                <div className="question-body"><span style={{ color: "red" }}>Q{index + 1}{": "}</span><InlineTex texContent={quest.Q} /></div>

                <div className="question-option" >
                  <div className="question-opt">
                    {quest.A.map((opt) => (
                      <div key={uuid()} >
                        <div className="d-flex align-items-center py-2 flex-row ">
                          <input id={opt.id} type="checkbox" disabled={opt.disabled} checked={opt.selected} readOnly />
                          {(answer_sheet[index] !== undefined ? (opt.id_ === answer_sheet[index].RightAnswerId && answer_sheet[index].A !== null) : null) ?
                            <FaCheck style={{ color: "blue", fontSize: "1.1rem" }} />
                            : null}
                          {answer_sheet[index] !== undefined ? ((answer_sheet[index] !== null && parseInt(answer_sheet[index].A) !== answer_sheet[index].RightAnswerId && parseInt(answer_sheet[index].A) === opt.id_) ? <FaTimes style={{ color: "red", fontSize: "1.1rem" }} />

                            : (answer_sheet[index] !== undefined ? (opt.id_ !== answer_sheet[index].RightAnswerId && answer_sheet[index].A !== null) : null) ? <FaTimes style={{ color: "gray", fontSize: "1.1rem" }} /> : null)

                            : null}

                          <span style={{ fontSize: "0.9rem", marginLeft: "0.25rem" }} > <InlineTex texContent={opt.opt} /></span>
                        </div>
                      </div>

                    ))}
                  </div>

                  <div className="question-figure">
                    {/*Here the figure goes */}
                    {quest.LinkQ ? <Image src={quest.LinkQ} /> : null}
                  </div>
                </div>
                <div className="question-answer"  >
                  <div className="question-explanation">
                    {/*Here the explanation goes */}

                    <div >
                      {answer_sheet[index] !== undefined && answer_sheet[index].A !== null ? <h6 style={{ fontWeight: "bold", color: "black" }}>Solution:</h6> : null}
                      {answer_sheet[index] !== undefined && answer_sheet[index].A !== null ? <InlineTex texContent={quest.E} /> : null}
                    </div>

                  </div>
                  <div className="question-explt-fig">
                    {/*Here the figure accompanying the explanation goes */}

                    {answer_sheet[index] !== undefined && answer_sheet[index].A !== null && quest.LinkA ? <Image src={quest.LinkA} /> : null}
                  </div>
                </div>

              </div>
              : null}
          </div>
        )
      })

      }
      <div><Button onClick={(e) => handleClick(e)}>Go back</Button></div>
    </div>
  )
}

export default Results;
