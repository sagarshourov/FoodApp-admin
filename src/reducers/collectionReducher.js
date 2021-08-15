import { CHECK_USER_BY_ID, VIEW_COLLECTION ,COLLECTION_BY_MONTH, INT_COLLECTION, SAVE_COLLECTION, LOADING } from '../actions/types';

const initialState = {
    check_user_by_id: null,
    products: null,
    collection_by_month: null,
    view_collection:null,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }

        case INT_COLLECTION:
            return {
                ...state,
                int_collection: action.payload,
                loading: false
            }
        case CHECK_USER_BY_ID:
            return {
                ...state,
                check_user_by_id: action.payload,
                loading: false
            }
        case SAVE_COLLECTION:
            return {
                ...state,
                save_collection: action.payload,
                loading: false
            }


        case COLLECTION_BY_MONTH:
            return {
                ...state,
                collection_by_month: action.payload,
                loading: false
            }


        case VIEW_COLLECTION:
            return {
                ...state,
                view_collection: action.payload,
                loading: false
            }








        default:
            return state;
    }
};