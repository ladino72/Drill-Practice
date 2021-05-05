
import {POST_SCORE} from "../types";
const InitialState={
    
    postScore: false,
        
}
const PostScoreReducer=(state=InitialState,action)=>{
    
    switch(action.type){
        case POST_SCORE:
            return { 
            ...state, //copying the orignal state
            postScore: action.post, 
            }
        
                             
        default:
            return state
    }
}
export default PostScoreReducer;
