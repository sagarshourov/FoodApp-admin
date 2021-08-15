import axios from "axios";
import { GET_USER_SETTINGS,GET_TIME_SETTINGS, UPDATE_USER_PASSWORD, UPDATE_USER_SETTINGS } from "./types";
import { getError } from './errorActions';



export const getCommonRestClientSettings = () => dispatch => {
    axios
        .get('/prodconf_CommonAppDataApiService/retrieveCommonRestClientSettings')
        .then(res => 
            dispatch({
                type: GET_TIME_SETTINGS,
                payload: res.data
            },
          localStorage.setItem('time_settings', JSON.stringify(res.data && res.data.payLoad)))
        )
        .catch(err =>
            dispatch(getError(err))
        );
};




export const getUserSettings = () => dispatch => {
    axios
        .get('retrieveUserSettings')
        .then(res => 
            dispatch({
                type: GET_USER_SETTINGS,
                payload: res.data
            }, localStorage.setItem('language', JSON.stringify(res.data && res.data.payLoad.language)))
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

export const updateUserPassword = passwordData => dispatch => {
    axios
        .post('/prodconf_UserSettingsApiService/updateUserPassword', passwordData)
        .then(res => 
            dispatch({
                type: UPDATE_USER_PASSWORD,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

export const updateUserSettings = settingsData => dispatch => {
    axios
        .post('/prodconf_UserSettingsApiService/updateUserSettings', settingsData)
        .then(res => 
            dispatch({
                type: UPDATE_USER_SETTINGS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};