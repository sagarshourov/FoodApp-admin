import { GET_SINGLE_QUOTE, LOADING,INTQUOTE, GET_ALL_QUOTES } from '../actions/types';

const initialState = {
    loading : false,
    single_quote:null,
    int_quote : null,
    get_all_quotes : null
};
 
export default (state = initialState, action) => {
    switch (action.type) {

      
      case LOADING:
        return {
           ...state,
           loading : true
        }
      case GET_SINGLE_QUOTE:
        return {
            ...state,
            single_quote : action.payload,
            loading : false
        }
        case GET_ALL_QUOTES:
          return {
              ...state,
              get_all_quotes : action.payload,
              loading : false
          }
        case INTQUOTE:
          return {
              ...state,
              int_quote : action.payload,
              loading : false
          }
      default:
        return state;
    }
};