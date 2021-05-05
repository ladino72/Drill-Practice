
import {ADD_ANSWER, LOAD_QUIZ, LOAD_ANSWER_SHEET, PAGER_UPDATE, QUIZ_SUBMIT, READ_SCORE} from "../types";
const InitialState={
    quiz: {
        config: {},
        questions: []
    },

    answerSheet:[],
    score:{},

    mode: 'quiz',
    pager: {
        index: 0,
        size: 1,
        count: 1
    }
    
}
const QuizReducer=(state=InitialState,action)=>{
    //https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
    //https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061
    switch(action.type){
        case ADD_ANSWER:
            return { 
            ...state, //copying the orignal state
            answerSheet: action.ans, 
            }
        case LOAD_QUIZ:
            return {...state, quiz: action.quiz}

        case LOAD_ANSWER_SHEET:
            return{...state, answerSheet:action.answer_sheet
            }
        case PAGER_UPDATE:
            return {
            ...state, pager: action.pager, mode: 'quiz'  //Watch mode:quiz is put manually, is not trigger from anywhere
        }
        case QUIZ_SUBMIT:
             return {
                ...state, mode: action.mode
            }
        case READ_SCORE:
            return{
                ...state, score:action.score
            }
                             
        default:
            return state
    }
}
export default QuizReducer;
