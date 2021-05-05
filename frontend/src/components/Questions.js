import React from "react";
import {AnswerActionCreator} from "../Redux/actions/AnswerActionCreator";
import { useSelector,useDispatch } from "react-redux";
import {loadQuizActionCreator} from "../Redux/actions/loadQuizActionCreator";
import "../style.css"
import uuid from "react-uuid";
import { InlineTex } from 'react-tex';
import getTestValue from "../utils/getTestValue";

//import {InputGroup, FormControl} from 'react-bootstrap'

//https://codesandbox.io/s/mui-radiogroup-rnepu?file=/src/Demo.jsx/
//https://unsplash.com/s/photos/link


function Questions({ move}) {
    
  const  dispatch = useDispatch();

  const {quiz,pager} = useSelector(state => state.QuizReducer)
  const {user} = useSelector(state => state.AuthReducer)
  const {score} = useSelector(state => state.QuizReducer)
  
  let USER=""
  if (user!==null){USER=user.name}

  const questions=quiz.questions

   // Get the total points of the CURRENT test
   // {score} is updated just when the user select an option. So it is necessary to get the total points of the quiz at the onset
   //Otherwise, the total points of the quiz is zero in the quations page
   
  let t_score=getTestValue(quiz)
  //---------------------------------------------

  const AddandGradeQuestion=(question, option) =>{
    let quizT = JSON.parse(JSON.stringify(quiz));
    let q = quizT.questions.find(x => x.id === question.id);
    q.A.forEach((x) => { x.selected = false; });
    q.A.forEach((x) => { x.disabled = true; });

    
    q.A.find(x => x.id_ === option.id_).selected = true;
    q.A.find(x => x.id_ === option.id_).disabled = true;
    //console.log("q.A from Questions.js","-------++--------",q.A[0].id_===option.id_)

    console.log("*question,, from Questions.js",question)
    console.log("*option.id_ from Questions.js",option.id_)
    console.log("questionId",q.id)

    console.log("*quiz, from Questions.js**",quiz)
    console.log("*q, from Questions.js**///",q)
    let questIndex= quizT.questions.findIndex(x=>x.id===q.id)
    console.log("*Index, from Questions.js",questIndex)
    quizT.questions[questIndex]=q
    console.log("*Newquiz, from Questions.js---->",quizT)

    dispatch(loadQuizActionCreator(quizT)); 

    let load={}
    load["id"]=q.id;
    load["A"]=option.id_
    dispatch(AnswerActionCreator(load))
    
    
}

 
 //Here we use callback Hook The next site explain very clearly the reason to use it
//https://www.youtube.com/watch?v=IL82CzlaCys
//let questions = questions ?questions.slice(pager.index, pager.index + pager.size) : [];
    
return (
  <div id="quiz" style={{backgroundColor:"#ebf5f0"}} >

        <div className="row " style={{color:"navy",fontSize:"1.2rem",marginTop:"1rem"}}>
            <div className="col-4 text-left" >{quiz.name}</div>
            <div className="col-4 text-center ">{USER}</div>
            <div className="col-4 text-right ">Score:{score.p_score}/{t_score}</div>

        </div> 
      
      <hr />
      {quiz.questions?questions.slice(pager.index, pager.index + pager.size).map(quest =>
          <div key={quest.id}>
              <div className="badge badge-primary mb-3">Question {pager.index + 1} of {pager.count}. </div>
              <div className="h6 py-3" >{pager.index + 1}. <InlineTex texContent={quest.Q}/></div>

              <div className="row " >
                  <div className="row col-md-7 "  >
                  {
                      
                      quest.A.map(option =>
                          
                          <div key={uuid()} className="col-8 ">
                           <label className="font-weight-normal " htmlFor={option.id}> 
                                {/*https://react-bootstrap.netlify.app/components/input-group/#input-group-checkboxes */} 
                                 <input type="checkbox" id={option.id} checked={option.selected?true:false}  disabled ={option.disabled?true:false}  onChange={() => AddandGradeQuestion(quest, option)}/> <InlineTex texContent={option.opt}/> 
                           </label>
                          </div>
                        
                      )
                  } 
                  </div>

                  <div className=" col-md-5 ">
                      <div className="logo d-flex justify-content-center">
                          {quest.LinkQ? <img src={quest.LinkQ} width="150"  alt=""/>:null}
                      </div>
                  </div>
                  
              </div>


          </div>
      ):[]}
     

      <hr />
      <div className="row justify-content-center"  >
            {quiz.config.allowBack &&<button id="first" className="btn btn-info   col-md-1 " style={{margin:"5px 10px"}} onClick={(e)=>move(e)}>First</button>}
            {quiz.config.allowBack &&<button id="prev" className="btn btn-info   col-md-1 " style={{margin:"5px 10px"}} onClick={(e)=>move(e)}>Prev</button>}
            <button id="next" className="btn btn-info col-md-1 "style={{margin:"5px 10px"}}  onClick={(e)=>move(e)}>Next</button>
            <button id="last" className="btn btn-info   col-md-1 " style={{margin:"5px 10px"}}  onClick={(e)=>move(e)}>Last</button>
      </div>
        
        <hr />
  </div >
)
}

export default Questions;

