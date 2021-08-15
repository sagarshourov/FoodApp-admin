import { GET_PRODUCT_CONFIGURATION_BY_ARTICLE,GET_ALL_QUOTES, SAVE_PRODUCT_CONFIGURATION, LOADING, GET_ALL_PRODUCT_CONFIGURATIONS, UPDATE_PRODUCT_CONFIGURATION, DELETE_PRODUCT_CONFIGURATION } from '../actions/types';

const initialState = {
    prod_config : null,
    all_configs : null,
    update_status : null,
    delete_status : null,
    save_config : null,
    loading : false
};
 
export default (state = initialState, action) => {
    switch (action.type){
    case LOADING:
        return {
            ...state,
            loading : true
        }

    case GET_ALL_QUOTES:
        return {
            ...state,
            prod_config : action.payload
        }
    case GET_PRODUCT_CONFIGURATION_BY_ARTICLE:
        return {
            ...state,
            prod_config : action.payload
        }
    case SAVE_PRODUCT_CONFIGURATION:
        return {
            ...state,
            save_config : action.payload
        }
    case GET_ALL_PRODUCT_CONFIGURATIONS: 
        return {
            ...state,
            all_configs : action.payload,
            loading : false
        }
    case UPDATE_PRODUCT_CONFIGURATION: 
        return {
            ...state,
            update_status : action.payload
        }
    case DELETE_PRODUCT_CONFIGURATION: 
        return {
            ...state,
            delete_status : action.payload
        }
    default:
        return state;
    }
};