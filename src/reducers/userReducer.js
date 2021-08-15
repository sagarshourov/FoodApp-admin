import { GET_USER_SETTINGS, UPDATE_USER_PASSWORD, UPDATE_USER_SETTINGS } from '../actions/types';

const initialState = {
    userSettings : null,
    passwordStatus : null,
    settingsStatus : null
};
 
export default (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_SETTINGS: 
        return {
           ...state,
           userSettings : action.payload
      };
      case UPDATE_USER_PASSWORD: 
        return {
           ...state,
           passwordStatus : action.payload
      };
      case UPDATE_USER_SETTINGS: 
        return {
           ...state,
           settingsStatus : action.payload
      };
      default:
        return state;
    }
};