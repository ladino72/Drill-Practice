import React, { useState, useEffect, Fragment } from "react";
import { useDispatch} from "react-redux";

import { GetTestActionCreator} from "../Redux/actions/GetTestActionCreator";



import Quiz from "./Quiz";

import MenuTests from "./MenuTests";
import axios from "axios";

//https://codesandbox.io/s/mui-radiogroup-rnepu?file=/src/Demo.jsx

function App() {
  const dispatch = useDispatch();

  const [tests, getTests] = useState([]);
  const [quizId, setQuizId] = useState("60294174b4d3640ce78bf544");

  //https://levelup.gitconnected.com/fetch-api-data-with-axios-and-display-it-in-a-react-app-with-hooks-3f9c8fa89e7b
  useEffect(() => {
    getAllTests();
  }, []);

  //console.log("quizId",quizId,"quizId2",quizId2,"quizId",quizId);

  
  //Here we use callback Hook The next site explain very clearly the reason to use it
  //https://www.youtube.com/watch?v=IL82CzlaCys
  
  useEffect(() => {
    dispatch(GetTestActionCreator(quizId));
  }, [quizId,dispatch]);

  const getAllTests = () => {
    axios
      .get("/api/tests") //Notice, we are using the proxy declared in the package.json file located in the frontend folder.
      .then((response) => {
        getTests(response.data);
        //I installed -wrap  console log simple-. Pressing Shift+ ele simplifies having to write console.log
      })
      .catch((error) => alert(`Error: ${error}`));
  };

  return (
    <Fragment>
      {tests.length > 0 ? (
        <MenuTests tests={tests} setQuizId={setQuizId} />
      ) : null}
      <Quiz />

    </Fragment>
  );
}

export default App;
