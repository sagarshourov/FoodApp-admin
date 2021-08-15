import axios from "axios";
import { GET_USER_BY_ID,DELETE_USER_BY_ID, INT_REGISTRATION, GET_ERRORS, CUSTOMER_REGISTRATION, GET_ALL_CUSTOMERS, CUSTOMER_SEARCH } from "./types";
import { setLoading } from './commonActions';
import { getError } from './errorActions';



export const intRegistration = () => dispatch => {
    dispatch(setLoading());
    axios
        .get("intRegistration")
        .then(res => {
            dispatch({
                type: INT_REGISTRATION,
                payload: res.data
            });
        }).catch(err =>
            dispatch(getError(err))
        );

};

export const deleteUserById = () =>{
    //console.log('delete user by id');
    
    return {
        type: DELETE_USER_BY_ID
      }
}


export const checkCustomer = (type, customerNo) => dispatch => {


    //  console.log(customerNo);
    dispatch(setLoading());
    axios
        .post("getUserById", { type: type, customerNo: customerNo })
        .then(res => {
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data
            });
            //console.log('sucess');
        }).catch(err =>
            dispatch(getError(err))
        );
       
};


export const saveCustomer = (data) => dispatch => {
    dispatch(setLoading());
    axios
        .post("customerregistration", data)
        .then(res => {

            dispatch({
                type: CUSTOMER_REGISTRATION,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(getError(err))
        );

}


export const getAllCustomers = () => dispatch => {
    dispatch(setLoading());

    axios
        .post("/customer/all")
        .then(res =>
            dispatch({
                type: GET_ALL_CUSTOMERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};
export const CustomersSearch = (data) => dispatch => {
    dispatch(setLoading());

    axios
        .post("/customer/search", data)
        .then(res =>
            dispatch({
                type: CUSTOMER_SEARCH,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );

}


export const getSingleCustomer = () => {

}

export const deleteCustomer = () => {

}