import axios from "axios";
import { VIEW_LAZER, } from "./types";
import { setLoading } from './commonActions';

import { getError } from './errorActions';

export const getViewLazer = (product_id,account_number,user_id)=>dispatch=>{
    dispatch(setLoading());

    axios
    .get("getViewLazer/"+product_id+'/'+account_number+'/'+user_id)
    .then(res => {
        dispatch({
            type: VIEW_LAZER,
            payload: res.data
        });

    }).catch(err =>
        dispatch(getError(err))
    );
}

