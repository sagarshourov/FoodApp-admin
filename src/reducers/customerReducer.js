import {
  GET_ALL_CUSTOMERS,
  DELETE_CUSTOMER,
  INT_REGISTRATION,
  CUSTOMER_REGISTRATION,
  GET_USER_BY_ID,
  LOADING,
  CUSTOMER_SEARCH,
  GET_SINGLE_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER_BY_ID,
} from "../actions/types";

const initialState = {
  create_status: null,
  all_customers: null,
  single_customer: null,
  update_status: null,
  delete_status: null,
  validate_status: null,
  customer_search: null,
  create_customer: null,
  customer_registration: null,
  get_user_by_id: null,
  int_registration: null,
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

    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        all_customers: action.payload,
        loading: false,
      };
    case GET_SINGLE_CUSTOMER:
      return {
        ...state,
        single_customer: action.payload,
        loading: false,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        update_status: action.payload,
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        delete_status: action.payload,
      };

    case CUSTOMER_SEARCH:
      return {
        ...state,
        customer_search: action.payload,
        loading: false,
      };

    case CUSTOMER_REGISTRATION:
      return {
        ...state,
        customer_registration: action.payload,
        get_user_by_id: null,
        loading: false,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        get_user_by_id: action.payload,
        loading: false,
      };
    case DELETE_CUSTOMER_BY_ID:
      return {
        ...state,
        get_user_by_id: null,
        loading: false,
      };

    default:
      return state;
  }
};
