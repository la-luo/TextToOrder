import axios from 'axios';

export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveItem = payload => ({
   type:  RECEIVE_ITEM,
   payload
});

export const createItem = itemData => dispatch => {
    axios
        .post('api/merchants/add-item', itemData)
        .then(res => dispatch(receiveItem(res.data)))
        .catch(err => 
            dispatch({
               type: RECEIVE_ERRORS,
               payload: err.response.data
            })
        );
};