import axios from "axios";
import { GET_MENU,DELETE_MENU, ADD_MENU, UP_MENU } from "./types";
import { setLoading } from "./commonActions";
import { getError } from "./errorActions";



export const deleteMenu = (id) => (dispatch) => {
  dispatch(setLoading());
  axios
    .delete("/menus/" + id)
    .then((res) =>
      dispatch({
        type: DELETE_MENU,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const upMenu = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .put("/menus/" + data.id, data)
    .then((res) =>
      dispatch({
        type: UP_MENU,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const addMenu = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/menus", data)
    .then((res) =>
      dispatch({
        type: ADD_MENU,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const getMenus = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/menus")
    .then((res) =>
      dispatch({
        type: GET_MENU,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
