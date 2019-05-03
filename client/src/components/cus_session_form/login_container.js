import { connect } from 'react-redux';
import React from 'react';
import SessionForm from './session_form';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
  formType: 'login',
  session: state.session,
  errors: Object.values(state.errors),
  navLink: <Link to='/signup'>Sign Up</Link>
}};

const mapDispatchToProps = dispatch => ({
  processForm: (userData) => dispatch(loginUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);