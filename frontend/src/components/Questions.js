import React from "react";
import {AnswerActionCreator} from "../Redux/actions/AnswerActionCreator";
import { useSelector,useDispatch } from "react-redux";
import {loadQuizActionCreator} from "../Redux/actions/loadQuizActionCreator";
import "../style.css"
import uuid from "react-uuid";
import { InlineTex } from 'react-tex';
import getTestValue from "../utils/getTestValue";
import Button from "react-bootstrap/Button";


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
  <div id="quiz" style={{backgroundColor:"#ebf5f0", marginBottom:"0.5rem"}} className="container" >

        <div className="d-flex flex-wrap justify-content-between" style={{color:"#0099CC",fontSize:"1.1rem",marginTop:"1rem", width:"100%"}} >
            <div className="text-left" >{quiz.name}</div>
            <div className="text-center ">{USER}</div>
            <div className="text-right ">Score:{score.p_score}/{t_score}</div>

        </div> 
      
      <hr />
      {quiz.questions?questions.slice(pager.index, pager.index + pager.size).map(quest =>
          <div key={quest.id}>
              <div className="badge badge-primary mb-3">Question {pager.index + 1} of {pager.count}. </div>
              <div className="h6 py-3" >{pager.index + 1}. <InlineTex texContent={quest.Q}/></div>

              <div className="row " >
                  <div className="row col-md-8 "  >
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

                  <div className=" col-md-4 ">
                      <div className="logo d-flex justify-content-center">
                          {quest.LinkQ? <img src={quest.LinkQ} width="150"  alt=""/>:null}
                      </div>
                  </div>
                  
              </div>


          </div>
      ):[]}
     

      <hr />
      <div className="d-flex justify-content-center flex-wrap"  >
            {quiz.config.allowBack &&<Button style={{marginBottom:"0.4rem"}} variant="info" id="first" onClick={(e)=>move(e)}>First</Button>}
            {quiz.config.allowBack &&<Button style={{marginBottom:"0.4rem"}} variant="info" id="prev" onClick={(e)=>move(e)}>Prev</Button>}
            <Button variant="info" id="next" style={{marginBottom:"0.4rem"}} onClick={(e)=>move(e)}>Next</Button>
            <Button variant="info" id="last" style={{marginBottom:"0.4rem"}} onClick={(e)=>move(e)}>Last</Button>
      </div>
        
        <hr />
  </div >
)
}

export default Questions;

