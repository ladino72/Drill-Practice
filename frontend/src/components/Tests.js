import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GetTestActionCreator } from "../Redux/actions/GetTestActionCreator";

import Quiz from "./Quiz";
import MenuTests from "./MenuTests";
import axios from "axios";
import { useAlert } from 'react-alert'

//https://codesandbox.io/s/mui-radiogroup-rnepu?file=/src/Demo.jsx

function App() {
  const alert = useAlert()

  const dispatch = useDispatch();

  const [tests, getTests] = useState([]);
  const [quizId, setQuizId] = useState("60fed236f07cdb0dfd82b5f9");

  const getAllTests = useCallback(() => {
    axios
      .get("/api/tests") //Notice, we are using the proxy declared in the package.json file located in the frontend folder.
      .then((response) => {
        getTests(response.data);
        //I installed -wrap  console log simple-. Pressing Shift+ ele simplifies having to write console.log
      })
      //.catch((error) => alert(`${error.response.data.message}`));
      .catch((error) => alert.show(`${error.response.data.message}`));

  }, [alert]);

  //https://levelup.gitconnected.com/fetch-api-data-with-axios-and-display-it-in-a-react-app-with-hooks-3f9c8fa89e7b
  useEffect(() => {
    getAllTests();
  }, [getAllTests]);

  //console.log("quizId",quizId,"quizId2",quizId2,"quizId",quizId);


  //Here we use callback Hook The next site explain very clearly the reason to use it
  //https://www.youtube.com/watch?v=IL82CzlaCys

  useEffect(() => {
    dispatch(GetTestActionCreator(quizId));
  }, [quizId, dispatch]);



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
