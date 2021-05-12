import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { QuizSubmitActionCreator } from "../Redux/actions/QuizSubmitActionCreator";
import { InlineTex } from 'react-tex';

import { FaCheck, FaTimes } from 'react-icons/fa';
import uuid from "react-uuid"
import axios from "axios";
import { PostScoreActionCreator } from '../Redux/actions/PostScoreActionCreator';
import Button from "react-bootstrap/Button";

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
  const { currentTestId } = useSelector(state => state.CurrentTestIdReducer)
  console.log('currentTestId', currentTestId);
  console.log(">>>>>>>>Config", config)
  console.log("Stallon!")




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


      <div className="d-flex flex-wrap justify-content-between" style={{ color: "#0099CC", fontSize: "1.1rem", marginTop: "0.5rem", marginBottom: "0.5rem",width: "100%" }} >
        <div className="text-left" >{quiz.name}</div>
        <div className="text-center ">{user.name}</div>
        <div className="text-right ">Score:{score.p_score}/{score.t_score}</div>

      </div>

      {questions.map((quest, index) => {

        return (

          <div key={uuid()} className="border-right border-left border-success p-3 mb-2 bg-light text-dark">
            <p><span style={{ color: "red" }}>Q{index + 1}{": "}</span><InlineTex texContent={quest.Q} /></p>

            <div className="row" >
              <div className="col-md-7 d-flex flex-column justify-content-start ">
                {quest.A.map(opt => (

                  <div key={uuid()} >
                    <div className="d-flex align-items-center">
                      <input id={opt.id} type="checkbox" disabled={opt.disabled} checked={opt.selected} readOnly />
                      {(answer_sheet[index] !== undefined ? (opt.id_ === answer_sheet[index].RightAnswerId && answer_sheet[index].A !== null) : null) ?
                        <FaCheck style={{ color: "blue", fontSize: "1.5rem" }} />
                        : null}
                      {answer_sheet[index] !== undefined ? ((answer_sheet[index] !== null && parseInt(answer_sheet[index].A) !== answer_sheet[index].RightAnswerId && parseInt(answer_sheet[index].A) === opt.id_) ? <FaTimes style={{ color: "red", fontSize: "1.1rem" }} />

                        : (answer_sheet[index] !== undefined ? (opt.id_ !== answer_sheet[index].RightAnswerId && answer_sheet[index].A !== null) : null) ? <FaTimes style={{ color: "gray", fontSize: "1.1rem" }} /> : null)

                        : null}

                      <InlineTex texContent={opt.opt} />
                    </div>
                  </div>

                ))}
              </div>

              <div className="col-md-5">
                {/*Here the figure goes */}
                <div className="d-flex justify-content-center">
                  {quest.LinkQ ? <img src={quest.LinkQ} width="100%" height="null" alt="" /> : null}
                </div>
              </div>
            </div>
            <div className="row  mt-1 "  >
              <div className="col-md-7 ">
                {/*Here the explanation goes */}

                <div >
                  {answer_sheet[index] !== undefined && answer_sheet[index].A !== null ? <h6>Explanation:</h6> : null}
                  {answer_sheet[index] !== undefined && answer_sheet[index].A !== null ? <InlineTex texContent={quest.E} /> : null}
                </div>

              </div>
              <div className="col-md-5 ">
                {/*Here the figure accompanying the explanation goes */}
                <div className="d-flex justify-content-center">
                  {answer_sheet[index] !== undefined && answer_sheet[index].A !== null && quest.LinkA ? <img src={quest.LinkA} width="100%" height="null" alt="" /> : null}
                </div>
              </div>
            </div>

            <p style={{ color: "red" }}>Points:{answer_sheet[index] !== undefined ? answer_sheet[index].Score : null}/{quest.Points}  {answer_sheet[index] !== undefined ? (answer_sheet[index].A == null ? "Not answered" : null) : null}</p>


          </div>
        )
      })

      }
      <div><Button onClick={(e) => handleClick(e)}>Go back</Button></div>
    </div>
  )
}

export default Results;
