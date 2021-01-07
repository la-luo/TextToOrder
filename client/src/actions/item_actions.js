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
        .post('http://localhost:3001/merchants/add-item', itemData)
        .then(res => dispatch(receiveItem(res.data)))
        .catch(err => 
            dispatch({
               type: RECEIVE_ERRORS,
               payload: err
            })
        );
};

export const updateItem = itemData => dispatch => {
    console.log('update item...', itemData._id);
    axios
        .put(`http://localhost:3001/merchants/edit-item/${itemData._id}`, itemData)
        .then(res => {console.log('update item action result:', res.data); dispatch(receiveItems(res.data))})
        .catch(err => 
            dispatch({
                type: RECEIVE_ERRORS,
                payload: err
            })
        );
};

export const deleteItem = (itemId) => dispatch => {
    axios
        .delete(`http://localhost:3001/merchants/delete-item/${itemId}`, itemId)
        .then(res => dispatch(receiveItems(res.data)))
        .catch(err => 
            dispatch({
                type:RECEIVE_ERRORS,
                payload: err
            }));
};

export const fetchItems = merchantId => dispatch => {
    console.log('axios would try fetch items of merchant:', merchantId);
    axios
        .get(`http://localhost:3001/merchants/${merchantId}/items`)
        .then(res => {dispatch(receiveItems(res.data))})
        .catch(err => 
            dispatch({
                type: RECEIVE_ERRORS,
                payload: err
            })
        );
};