import api from "../../utils/api";
import axios from "axios";

import { GetTestFailAction } from "../actions/actions";
import { GetTestAction } from "../actions/actions";

import { Qconfig } from "../../QuizConfig";
import ShuffleArray from "../../utils/ShuffleArray";

import { loadQuizActionCreator } from "../actions/loadQuizActionCreator";
import { loadAnswerSheetActionCreator } from "../actions/loadAnswerSheetActionCreator";
import { ReadScoreActionCreator } from "../actions/ReadScoreActionCreator";
import { PostScoreActionCreator } from "../actions/PostScoreActionCreator";
import { PagerUpdatetActionCreator } from "../actions/PagerUpdateActionCreator";


var CryptoJS = require("crypto-js");

const DecryptAnswersOneDocument = (encrypt) => {
  //First index refers to the document, second index refers to the number of problem.
  //The answers of each problem are encrypted in an array
  let decryptedArray = [];
  encrypt.forEach((item) => {
    let bytes = CryptoJS.AES.decrypt(item, "secret key 123");
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //console.log(decryptedData)
    decryptedArray.push(decryptedData);
  });
  return decryptedArray;
};

const CU_AnswerTable = async (currentTestId, big_string) => {
  const axiosconfig = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {

    await axios.post("/api/ranking/88", { "ID": currentTestId, "packedAnswerTable": big_string }, axiosconfig) //88 is to create a new post route

  } catch (error) {
    console.error("Fail to create the reference answer table")
  }
};


// Get test. Here we are using a Redux thunk (to make an asynchronous call). A shorter way is as follows:
// export const GetTestActionCreator = (id) => async dispatch => { .........}
export const GetTestActionCreator = (id) => {
  return async function (dispatch) {
    try {
      const res = await api.get(`/tests/${id}`);

      dispatch(GetTestAction({}));
      let Quiz = res.data;

      // Decrypt answers in problem
      var encryptAnswers = [];
      for (let j = 0; j < Quiz.questions.length; j++) {
        encryptAnswers.push(Quiz.questions[j].A);
      }
      //console.log("-------------",encryptAnswers)
      for (let j = 0; j < Quiz.questions.length; j++) {
        Quiz.questions[j].A = DecryptAnswersOneDocument(encryptAnswers[j]);
      }
      // End of Decrypt answers

      Quiz.questions.forEach((q) => {
        q.A.forEach((o) => {
          o.selected = false;
          o.disabled = false;
        });
      });

      //const{ID,name,description}=quiz
      //quiz.config={"ID":ID,"name":name,"description":description}

      Quiz.config = Object.assign({}, Qconfig);
      //console.log("Quiz-**-->",Quiz);

      //Shuffle questions and options
      let shuffle_quest = Quiz.questions;
      if (Qconfig.shuffleQuestions) {
        shuffle_quest = ShuffleArray(Quiz.questions);
      }

      if (Qconfig.shuffleOptions) {
        for (let i = 0; i < shuffle_quest.length; i++) {
          let temp;
          temp = ShuffleArray(shuffle_quest[i].A);
          shuffle_quest[i].A = temp;
        }
      }

      console.log("Random questions and answers", shuffle_quest);
      Quiz.questions = shuffle_quest;
      //End of Shuffle questions and options

      //Prepare the answer sheet
      let answerSheet = [];
      for (let k = 0; k < Quiz.questions.length; k++) {
        let entry = {};
        let isAnswerIndex = Quiz.questions[k].A.findIndex(
          (item) => item.isAnswer === true
        );
        entry["RightAnswerId"] = Quiz.questions[k].A[isAnswerIndex].id_;
        entry["Points"] = Quiz.questions[k].Points;
        entry["Correct"] = false;
        entry["Score"] = 0;
        entry["A"] = null;
        entry["id"] = Quiz.questions[k].id;
        answerSheet.push(entry);
      }

      //console.log("AnswerSheet",answerSheet)

      //--------------Begins here 
      // The idea here is to create a table to be used in the backend,it contains the problem id and the number of points 
      //for each problem comprising the test. All info is packed in the form of a string, for example:  P=7-Id=3/P=8-Id=1/P=9-Id=2/
      //where a slash symbol is used to separate the info. In the backed this string is decoded or unpacked.
      // In the backend, it is used a reference to update the hallOfFame page.
      // This table is different from the Answersheet, as this one is used by Redux in the frontend to handle and administer the test.
      //Thus, every single time a test is loaded the test value and the official test answers are updated.
      let string_table = [];
      let big_string = "";
      answerSheet.forEach((ele) => string_table.push(`P=${ele.Points}-Id=${ele.id}`))
      string_table.forEach(ele => big_string += ele.toString() + "/") // It creates a string of the form:  P=7-Id=3/P=8-Id=1/P=9-Id=2/

      //console.log('string-Table', big_string);
      CU_AnswerTable(id, big_string)

      //---------Ends here---------------------------

      const pager = { index: 0, size: 1, count: 1 };
      pager.count = Quiz.questions.length / pager.size;

      //Reset Score

      const score = { p_score: 0, t_score: 0 };
      dispatch(loadQuizActionCreator(Quiz));
      dispatch(PagerUpdatetActionCreator(pager));
      dispatch(ReadScoreActionCreator(score));
      dispatch(loadAnswerSheetActionCreator(answerSheet));
      dispatch(PostScoreActionCreator(false));

    } catch (error) {
      dispatch(GetTestFailAction({ "Error": error.message }));
      console.error("Fail to create the test:", error.message)
    }
  }
};