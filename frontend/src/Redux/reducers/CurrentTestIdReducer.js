
import {CURRENT_TEST_ID} from "../types";
const InitialState={
    
    currentTestId: '',
        
}
const CurrentTestIdReducer=(state=InitialState,action)=>{
    
    switch(action.type){
        case CURRENT_TEST_ID:
            return { 
            ...state, //copying the orignal state
            currentTestId: action.current, 
            }
        
                             
        default:
            return state
    }
}
export default CurrentTestIdReducer;
