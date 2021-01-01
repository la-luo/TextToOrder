import axios from 'axios';

export const RECEIVE_ORDER = 'RECEIVE_ORDER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveOrder = order => ({
    type:  RECEIVE_ORDER,
    order
 });

 export const fetchOrder = orderId => dispatch => {
    axios
        .get(`/orders/${orderId}`, orderId)
        .then(res => dispatch(receiveOrder(res.data)))
        .catch(err => 
            dispatch({
                type: RECEIVE_ERRORS,
                payload: err
            })
        );
};