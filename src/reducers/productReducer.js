import {
  GET_PRODUCTS,
  LOADING,
  GET_PRODUCT,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  UPLOAD,
  CLEAR_STATE,
  DELETE,
} from "../actions/types";

const initialState = {
  top_products: null,
  child_products: null,
  category_products: null,
  product_hierarchy: null,
  product: null,
  edit_product: null,
  add_product: null,
  products: null,
  product_id: null,
  delete: null,
  upload: null,
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
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case UPLOAD:
      return {
        ...state,
        upload: action.payload,
        loading: false,
      };
    case DELETE:
      return {
        ...state,
        delete: action.payload,
        loading: false,
      };

    case CLEAR_STATE:
      return {
        ...state,
        upload: null,
        edit_product: null,
        loading: false,
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        add_product: action.payload,
        loading: false,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        edit_product: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
