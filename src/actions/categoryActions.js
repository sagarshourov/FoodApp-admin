import axios from "axios";
import {
  GET_CATEGORY,
  ADD_CATEGORY,
  DELETE_CAT,
  UPDATE_CATEGORY,
} from "./types";
import { setLoading } from "./commonActions";
import { getError } from "./errorActions";

export const deleteCat = (id) => (dispatch) => {
  dispatch(setLoading());
  axios
    .delete("/category/" + id)
    .then((res) =>
      dispatch({
        type: DELETE_CAT,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const updateCategory = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .put("/category", data)
    .then((res) =>
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
export const addCategory = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/category", data)
    .then((res) =>
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const getCategory = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/category")
    .then((res) =>
      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
