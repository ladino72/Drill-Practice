import { GET_TEST,GET_TEST_ERROR} from "../types";

  
  const initialState = {
    loading: true,
    error: {}
  };
  
  function GetTestReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_TEST:
        return {
          ...state,
          loading: false,
          error:payload
        };
        case GET_TEST_ERROR:
          return {
            ...state,
            error: payload,
            loading: false
          };
      
      default:
        return state;
    }
  }
  
  export default GetTestReducer;
  
