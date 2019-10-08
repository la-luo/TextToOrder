import {
    RECEIVE_ITEM
} from '../action/item_actions';

const initialState = {
};

const itemReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_ITEM:
            return action.payload;
        default:
            return state;
    }
}

export default itemReducer;