import axios from 'axios';

export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    itemId
});

export const receiveItem = newItem => ({
   type:  RECEIVE_ITEM,
   newItem
});

export const receiveItems = items => ({
    type: RECEIVE_ITEMS,
    items
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

export const updateItem = itemData => dispatch => {
    axios
        .put(`api/merchants/edit-item/${itemData._id}`, itemData)
        .then(res => dispatch(receiveItem(res.data)))
        .catch(err => 
            dispatch({
                type: RECEIVE_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteItem = (itemId) => dispatch => {
    axios
        .delete(`api/merchants/delete-item/${itemId}`, itemId)
        .then(res => dispatch(receiveItems(res.data)))
        .catch(err => 
            dispatch({
                type:RECEIVE_ERRORS,
                payload: err.response.data
            }));
};

export const fetchItems = merchantId => dispatch => {
    axios
        .get(`api/merchants/${merchantId}/items`, merchantId)
        .then(res => dispatch(receiveItems(res.data)))
        .catch(err => 
            dispatch({
                type: RECEIVE_ERRORS,
                payload: err.response.data
            })
        );
};

