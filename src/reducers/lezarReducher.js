import { VIEW_LAZER, LOADING } from '../actions/types';

const initialState = {
    view_lazer:null,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }

        case VIEW_LAZER:
            return {
                ...state,
                view_lazer: action.payload,
                loading: false
            }









        default:
            return state;
    }
};