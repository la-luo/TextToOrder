import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import rootReducer from '../reducers/root_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const preloadedState = {};


const store = createStore(
  rootReducer,
  preloadedState,

  composeWithDevTools(
    /* logger must be the last middleware in chain to log actions */
    applyMiddleware(thunk, logger)
  )
);

export default store;