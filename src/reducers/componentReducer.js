import { GET_AVAILABLE_COMPONENTS, LOADING, GET_AVAILABLE_ARTICLES } from '../actions/types';

const initialState = {
    available_components : null,
    available_articles : null,
    product : null,
    loading : false
};
 
export default (state = initialState, action) => {
    switch (action.type) {
      case LOADING:
        return {
           ...state,
           loading : true
        }
      case GET_AVAILABLE_COMPONENTS: 
        return {
           ...state,
           available_components : action.payload,
           product : action.productID,
           loading : false
      }
      case GET_AVAILABLE_ARTICLES: 
        return {
           ...state,
           available_articles : action.payload,
           loading : false
      }
      default:
        return state;
    }
};