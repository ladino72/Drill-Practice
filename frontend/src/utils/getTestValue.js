
const getTestValue = (quiz) => {

        
    const questions=quiz.questions
  
     // Get the total points of a test
     // {score} is updated just when the user select an option. So it is necessary to get the total points of the quiz at the onset
     //Otherwise, the total points of the quiz is zero.
     let t_scores=[];
     questions.forEach(ele=>t_scores.push(ele.Points))
     let t_score=t_scores.reduce((a, b) => a + b, 0)
   //--------------------------------
   
    return t_score
        
}

export default getTestValue
