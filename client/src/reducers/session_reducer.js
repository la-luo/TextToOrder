import {
    RECEIVE_CURRENT_USER,
    RECEIVE_MERCHANT
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
          username: action.payload.username,
          email: action.payload.email };
        }
      case RECEIVE_MERCHANT:
        return {info: action.payload.info}
      default:
        return state;
    }
  };
  
  export default sessionReducer;