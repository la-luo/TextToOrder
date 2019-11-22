import axios from 'axios';
import setAuthToken from '../util/set_auth_token';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_MERCHANT = 'RECEIVE_MERCHANT';
export const RECEIVE_CURRENT_MERCHANT = 'RECEIVE_CURRENT_MERCHANT';

export const receiveCurrentMerchant = merData => {
  return {
    type: RECEIVE_CURRENT_MERCHANT,
    payload: merData
  };
};

export const receiveCurrentUser = userData => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: userData
  };
};

export const receiveMerchant = () => {
  return {
    type: RECEIVE_MERCHANT,
    payload: {info: 'We will follow up shortly'}
  };
};



export const merchantSignup = merchantData => dispatch => {
  axios
    .post('signup', merchantData)
    .then(res => {
      dispatch(receiveMerchant());
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err
      })
    );
}

export const merchantLogin = merData => dispatch => {
  axios
    .post('login', merData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      console.log(token);
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(receiveCurrentMerchant(decoded));
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err
      })
    );
};

export const fetchBasicMerchant = merchantId => dispatch => {
  axios
    .get(`basic/${merchantId}`, merchantId)
    .then(res => {
      console.log('fetch basic merchant info', res.data);
      dispatch(receiveCurrentMerchant(res.data));
    })
    .catch(err => 
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err
      })
    );
};

export const signupUser = userData => dispatch => {
  axios
    .post('api/users/signup', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      console.log(token);
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err.response.data
      })
    );
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth hearder for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(receiveCurrentUser({}));
};

export const logoutMerchant = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(receiveCurrentMerchant({}));
};