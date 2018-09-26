import React from 'react';
import { connect } from 'react-redux';

import { loginUser, getAuth } from './store';
import { LoginForm } from './components';

const mapStateToProps = state => {
  return {
    auth: getAuth(state),
  };
};

const mapDispatchToProps = {
  onSubmit: loginUser,
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
