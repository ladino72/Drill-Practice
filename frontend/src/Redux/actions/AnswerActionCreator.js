import {AnswerAction,ReadScoreAction} from "./actions"

export const AnswerActionCreator=(load)=>(dispatch,getState)=>{
   const {quiz,answerSheet,score}=getState().QuizReducer
   /* console.log("quiz---*",quiz.questions)
   console.log("answerSheet---*",answerSheet) */
   const questions=[...quiz.questions]
   const answer_sheet=[...answerSheet]
   /* console.log("quiz---*",questions)
   console.log("answerSheet---*",answer_sheet) */
   console.log("Score",score)
   

   const index = answer_sheet.findIndex(answer => answer.id === load.id); 
   const newArray = [...answer_sheet]; 
   newArray[index].A = load.A

   const isAnswerIndex = questions[index].A.findIndex(item => item.isAnswer === true); 
   newArray[index].RightAnswerId=questions[index].A[isAnswerIndex].id_


   const OptionIndex =questions[index].A.findIndex(item => item.id_ === parseInt(load.A)); 

   if(questions[index].A[OptionIndex].isAnswer) { 
         newArray[index].Correct=true
         newArray[index].Score=questions[index].Points
         
   }
   else{
         newArray[index].Correct=false  
         newArray[index].Score=0
                     
   }
         
   dispatch(AnswerAction(newArray));

   //Get partial and total score
    const partialScores=answer_sheet.map(x=>x.Score)
    const partialPoints=answer_sheet.map(x=>x.Points)

    const partial_score=partialScores.reduce((accumulator,currentValue)=>{
          return accumulator+currentValue;
    },0)
    const total_score=partialPoints.reduce((accumulator,currentValue)=>{
      return accumulator+currentValue;
    },0)
    let score_payload={}
    score_payload["p_score"]=partial_score;
    score_payload["t_score"]=total_score;

    dispatch(ReadScoreAction(score_payload));


   
}