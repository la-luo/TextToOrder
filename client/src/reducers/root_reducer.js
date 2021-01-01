import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
import items from './items_reducer';
import order from './order_reducer';


const rootReducer = combineReducers({
  session,
  items,
  order,
  errors
});

export default rootReducer;