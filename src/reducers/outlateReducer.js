import {
  GET_OUTLATE,
  ADD_OUTLATE,
  DELETE_OUTLATE,
  UPDATE_OUTLATE,
  LOADING,
} from "../actions/types";

const initialState = {
  outlates: null,
  add_outlate: null,
  up_outlate: null,
  del_outlate : null,
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
    case ADD_OUTLATE:
      return {
        ...state,
        add_outlate: action.payload,
        loading: false,
      };

    case UPDATE_OUTLATE:
      return {
        ...state,
        up_outlate: action.payload,
        loading: false,
      };

      case DELETE_OUTLATE:
        return {
          ...state,
          del_outlate: action.payload,
          loading: false,
        };
  

      

    case GET_OUTLATE:
      return {
        ...state,
        outlates: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
