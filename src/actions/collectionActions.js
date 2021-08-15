import axios from "axios";
import { GET_USER_BY_ID,VIEW_COLLECTION, COLLECTION_BY_MONTH ,INT_COLLECTION, GET_ERRORS, CHECK_USER_BY_ID, SAVE_COLLECTION, INTQUOTE, } from "./types";
import { setLoading } from './commonActions';

import { getError } from './errorActions';
export const getViewCollection = (sheet_no)=>dispatch=>{
    dispatch(setLoading());

    axios
    .get("viewCollection/"+sheet_no)
    .then(res => {
        dispatch({
            type: VIEW_COLLECTION,
            payload: res.data
        });

    }).catch(err =>
        dispatch(getError(err))
    );
}



export const intCollection = (data)=>dispatch =>{
    dispatch(setLoading());
    axios
        .get("intCollection")
        .then(res => {
            dispatch({
                type: INT_COLLECTION,
                payload: res.data
            });

        }).catch(err =>
            dispatch(getError(err))
        );
}

export const CollectionByMonth = (data) => dispatch =>{
    dispatch(setLoading());
    axios
        .post("CollectionByMonth",data)
        .then(res => {
            dispatch({
                type: COLLECTION_BY_MONTH,
                payload: res.data
            });

        }).catch(err =>
            dispatch(getError(err))
        );
}


export const SaveCollection = (data) => dispatch => {
    dispatch(setLoading());
    axios
        .post("saveCollection", data)
        .then(res => {
            dispatch({
                type: SAVE_COLLECTION,
                payload: res.data
            });

        })
        .catch(err =>
            dispatch(getError(err))
        );
}

export const CheckUserById = (account_number) => dispatch => {
    dispatch(setLoading());
    axios
        .post("checkUserById", { account_number: account_number })
        .then(res => {
            dispatch({
                type: CHECK_USER_BY_ID,
                payload: res.data
            });

        }).catch(err =>{
            dispatch(getError(err));
            // console.log(err);
        }
         
        );
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
        })
        .catch(err =>
            dispatch(getError(err))
        );
};





