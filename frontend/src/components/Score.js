import React from "react";
import {useSelector} from "react-redux";


const Score = () => {

  const {score} = useSelector(state => state.QuizReducer)


  //https://flaviocopes.com/how-to-check-object-empty/
  //https://www.npmjs.com/package/react-materialize
  //http://react-materialize.github.io/react-materialize/?path=/story/react-materialize--welcome
  return (
    <div className="row justify-content-center">
      
      
      <div  className="card text-center mb-3 text-danger " style={{maxWidth: "15rem", marginTop:"30px"}}>
          <div className="card-header h4" >Score</div>
          <div className="card-body text-primary">
              <h5 className="card-title">Your Score</h5>
              <p className="card-text">{score.p_score}/{score.t_score}</p>
          </div>
      </div>
    
   

    </div>
  );
};
export default Score;
