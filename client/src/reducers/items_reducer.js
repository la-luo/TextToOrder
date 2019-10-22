import { RECEIVE_CURRENT_MERCHANT } from '../actions/session_actions';
import { RECEIVE_ITEM, RECEIVE_ITEMS } from '../actions/item_actions';

const initialState = Object.freeze({
    items: []
})

const itemsReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_MERCHANT: 
        if (Object.values(action.payload).length === 0) {
            return initialState;
          } else {
            return action.payload.items;
            }
        case RECEIVE_ITEM:
            return [...state, action.newItem];
        case RECEIVE_ITEMS:
            return action.items;
        default:
            return state;
    }
}

export default itemsReducer;