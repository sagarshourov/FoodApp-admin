import axios from "axios";
import { GET_PRODUCTS, GET_PRODUCT,EDIT_PRODUCT, ADD_PRODUCT, UPLOAD ,CLEAR_STATE, DELETE } from "./types";
import { setLoading } from "./commonActions";
import { getError } from "./errorActions";




export const deleteProduct = (id) => (dispatch) => {
  dispatch(setLoading());
  axios
    .delete("/products/" + id)
    .then((res) =>
      dispatch({
        type: DELETE,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};


export const clearState = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
    payload: null,
  });
};

export const upload = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/upload", data, {
      "Content-Type": "multipart/form-data",
    })
    .then((res) =>
      dispatch({
        type: UPLOAD,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const editProducts = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .put("/products/" + data.id, data)
    .then((res) =>
      dispatch({
        type: EDIT_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const addProducts = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/products", data)
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const getProducts = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/products")
    .then((res) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const getProduct = (productID) => (dispatch) => {
  axios
    .get(`/products/${productID}`)
    .then((res) =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
