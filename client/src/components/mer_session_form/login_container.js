import { connect } from 'react-redux';
import React from 'react';
import LoginForm from './login_form';
import { Link } from 'react-router-dom';
import { merchantLogin } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
  formType: 'login',
  session: state.session,
  errors: Object.values(state.errors),
  navLink: <Link to='/signup'>Sign Up</Link>
}};

const mapDispatchToProps = dispatch => ({
  processForm: (userData) => dispatch(merchantLogin(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);