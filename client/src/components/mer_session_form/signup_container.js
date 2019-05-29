import { connect } from 'react-redux';
import React from 'react';
import SignupForm from "./signup_form";
import { Link } from 'react-router-dom';
import { merchantSignup } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
  formType: 'signup',
  session: state.session,
  errors: Object.values(state.errors),
  navLink: <Link to='/login'>Login</Link>
}};

const mapDispatchToProps = dispatch => ({
  processForm: (merchantData) => dispatch(merchantSignup(merchantData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);