import {
  GET_CATEGORY,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
  DELETE_CAT,
  LOADING,
} from "../actions/types";

const initialState = {
  category: null,
  add_category: null,
  up_category: null,
  del_cat : null,
  loading: false,

};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        add_category: action.payload,
        loading: false,
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        up_category: action.payload,
        loading: false,
      };

      case DELETE_CAT:
        return {
          ...state,
          del_cat: action.payload,
          loading: false,
        };
  

      

    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
