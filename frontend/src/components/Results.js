import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { QuizSubmitActionCreator } from "../Redux/actions/QuizSubmitActionCreator";
import { InlineTex } from 'react-tex';

import { FaCheck, FaTimes } from 'react-icons/fa';
import uuid from "react-uuid"
import axios from "axios";
import { PostScoreActionCreator } from '../Redux/actions/PostScoreActionCreator';
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image'


function getResults(id) {
  axios.get(`/api/ranking/${id}`)
    .then(res => {
      const high_scores = res.data[0].topScores.filter(result => (result.score > 20 && result.score <= 24));
      high_scores.forEach(result => console.log("From Results component,", "Name:", result.userid, "Score:", result.score))
    })
    .catch(error => error.message)
};


const Results = () => {
  const dispatch = useDispatch()
  const postScore = useSelector(state => state.PostScoreReducer.postScore)
  const answer_sheet = useSelector(state => state.QuizReducer.answerSheet);
  const { questions } = useSelector(state => state.QuizReducer.quiz)
  const { quiz } = useSelector(state => state.QuizReducer)

  const { config } = useSelector(state => state.QuizReducer.quiz)
  const { score } = useSelector(state => state.QuizReducer)
  const { user } = useSelector(state => state.AuthReducer)


  //console.log('currentTestId', currentTestId);
  console.log(">>>>>>>>Config", config)
  console.log(">>>>>>>>testId","+++++++++",quiz._id)
  let currentTestId=quiz._id;

  useEffect(() => {
    if (!postScore) {
      console.log('postScore', typeof (postScore));

      //SaveScore(currentTestId,score.p_score)
      const CU_AnswerTable = (currentTestId) => {
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
          console.error("Server error")
        }
      };

      CU_AnswerTable(currentTestId);

      dispatch(PostScoreActionCreator(true))
    };

  }, [postScore, currentTestId, dispatch, answer_sheet]);

  //getResults("602941a4b4d3640ce78bf546")
  getResults("605cd1108ceecf08c78124af");


  //console.log("AnswerSheet***********",answer_sheet)

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

          <div key={uuid()} className="results-wrapper border-right border-left border-success p-3 mb-2 bg-light text-dark">

            <div className="points" style={{ color: "red" }}>Points:{answer_sheet[index] !== undefined ? answer_sheet[index].Score : null}/{quest.Points}  {answer_sheet[index] !== undefined ? (answer_sheet[index].A == null ? "Not answered" : null) : null}</div>

            <div className="question-body"><span style={{ color: "red" }}>Q{index + 1}{": "}</span><InlineTex texContent={quest.Q} /></div>

            <div className="question-option" >
              <div className="question-opt">
                {quest.A.map(opt => (

                  <div key={uuid()} >
                    <div className="d-flex align-items-center py-2">
                      <input id={opt.id} type="checkbox" disabled={opt.disabled} checked={opt.selected} readOnly />
                      {(answer_sheet[index] !== undefined ? (opt.id_ === answer_sheet[index].RightAnswerId && answer_sheet[index].A !== null) : null) ?
                        <FaCheck style={{ color: "blue", fontSize: "1.1rem" }} />
                        : null}
                      {answer_sheet[index] !== undefined ? ((answer_sheet[index] !== null && parseInt(answer_sheet[index].A) !== answer_sheet[index].RightAnswerId && parseInt(answer_sheet[index].A) === opt.id_) ? <FaTimes style={{ color: "red", fontSize: "1.1rem" }} />

                        : (answer_sheet[index] !== undefined ? (opt.id_ !== answer_sheet[index].RightAnswerId && answer_sheet[index].A !== null) : null) ? <FaTimes style={{ color: "gray", fontSize: "1.1rem" }} /> : null)

                        : null}

                      <span style={{ fontSize: "0.9rem" }} > <InlineTex texContent={opt.opt} /></span>
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
        )
      })

      }
      <div><Button onClick={(e) => handleClick(e)}>Go back</Button></div>
    </div>
  )
}

export default Results;
