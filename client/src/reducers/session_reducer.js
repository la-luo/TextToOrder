import {
    RECEIVE_CURRENT_USER,
    RECEIVE_MERCHANT,
    RECEIVE_CURRENT_MERCHANT
  } from '../actions/session_actions';
  
  const nullUser = Object.freeze({
    id: null
  });
  
  const sessionReducer = (state = nullUser, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_CURRENT_USER:
      if (Object.values(action.payload).length === 0) {
        return nullUser
      } else {
        return {
          id: action.payload.id,
          username: action.payload.username
          };
        }
      case RECEIVE_MERCHANT:
        return {info: action.payload.info}
      case RECEIVE_CURRENT_MERCHANT:
        if (Object.values(action.payload).length === 0) {
          return nullUser
        } else {
          return action.payload;
          }
      default:
        return state;
    }
  };
  
  export default sessionReducer;