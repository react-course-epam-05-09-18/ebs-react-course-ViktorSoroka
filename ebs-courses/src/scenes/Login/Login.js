import React from 'react';
import { connect } from 'react-redux';

import { loginUser, handleAlreadyAuth, getAuth } from './store';
import { LoginForm } from './components';

const mapStateToProps = state => ({
  auth: getAuth(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (...args) => dispatch(loginUser(...args)),
  dispatch,
});

const mergeProps = (stateProps, { dispatch, ...otherDispatchProps }, props) => {
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...props,
    onEnterPage: () => {
      dispatch(handleAlreadyAuth(stateProps.auth.user));
    },
  };
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(LoginForm);
