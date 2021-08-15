import { GET_MENU, LOADING,DELETE_MENU, ADD_MENU, UP_MENU } from "../actions/types";

const initialState = {
  menu: null,
  add_menu: null,
  del_menu: null,
  up_menu: null,
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
    case ADD_MENU:
      return {
        ...state,
        add_menu: action.payload,
        loading: false,
      };
    case UP_MENU:
      return {
        ...state,
        up_menu: action.payload,
        loading: false,
      };
    case GET_MENU:
      return {
        ...state,
        menu: action.payload,
        loading: false,
      };

      case DELETE_MENU:
        return {
          ...state,
          del_menu: action.payload,
          loading: false,
        };
  
      
    default:
      return state;
  }
};
