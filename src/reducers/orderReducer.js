import { GET_ORDERS,ORDER_STATUS, LOADING } from "../actions/types";

const initialState = {
  orders: null,
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
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

      case ORDER_STATUS:
        return {
          ...state,
          status: action.payload,
          loading: false,
        };
  

      

    default:
      return state;
  }
};
