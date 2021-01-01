import { RECEIVE_ORDER} from '../actions/order_actions';


const orderReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_ORDER:
            return action.order;
        default:
            return state;
    }
}

export default orderReducer;