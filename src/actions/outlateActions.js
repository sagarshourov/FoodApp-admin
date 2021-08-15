import axios from "axios";
import {
  GET_OUTLATE,
  ADD_OUTLATE,
  DELETE_OUTLATE,
  UPDATE_OUTLATE,
} from "./types";
import { setLoading } from "./commonActions";
import { getError } from "./errorActions";

export const deleteOutlate = (id) => (dispatch) => {
  dispatch(setLoading());
  axios
    .delete("/outlets/" + id)
    .then((res) =>
      dispatch({
        type: DELETE_OUTLATE,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const updateOutlate = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .put("/outlets/"+data.id, data)
    .then((res) =>
      dispatch({
        type: UPDATE_OUTLATE,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
export const addOutlate = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/outlets", data)
    .then((res) =>
      dispatch({
        type: ADD_OUTLATE,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const getOutlate = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/outlets")
    .then((res) =>
      dispatch({
        type: GET_OUTLATE,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
