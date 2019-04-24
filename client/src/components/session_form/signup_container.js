import { connect } from 'react-redux';
import React from 'react';
import SessionForm from "./session_form";
import { Link } from 'react-router-dom';
import { signupUser } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
  formType: 'signup',
  session: state.session,
  errors: Object.values(state.errors),
  navLink: <Link to='/login'>Login</Link>
}};

const mapDispatchToProps = dispatch => ({
  processForm: userData => dispatch(signupUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);