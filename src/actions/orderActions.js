import axios from "axios";
import { GET_ORDERS,ORDER_STATUS } from "./types";
import { setLoading } from "./commonActions";
import { getError } from "./errorActions";

export const updateStatus = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .put("/orders/" + data.id, data)
    .then((res) =>
      dispatch({
        type: ORDER_STATUS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
export const getOrders = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/orders")
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
