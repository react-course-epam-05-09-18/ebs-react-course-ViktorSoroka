import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { compose } from 'recompose';

import { withLoginValidator } from './withLoginValidator';
import { withLoginFields } from './withLoginFields';
import { withLoginEnhancer } from './withLoginEnhancer';

const LoginFormComponent = props => {
  const {
    auth: { error, loading },
    formFields: { login, password },
    handleSubmit,
    handleChange,
    handleBlur,
  } = props;

  return (
    <Form horizontal onSubmit={handleSubmit}>
      {error && (
        <Alert bsStyle="warning">
          <strong>{error}</strong>
        </Alert>
      )}
      <FormGroup
        controlId="ebs-login-name"
        validationState={!login.isValid ? 'error' : null}
      >
        <Col componentClass={ControlLabel} sm={2}>
          Login
        </Col>
        <Col sm={8}>
          <FormControl
            name="login"
            type="text"
            value={login.value}
            placeholder="Login"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!login.isValid && (
            <span className="help-block">{login.message}</span>
          )}
        </Col>
      </FormGroup>

      <FormGroup
        controlId="ebs-login-password"
        validationState={!password.isValid ? 'error' : null}
      >
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={8}>
          <FormControl
            name="password"
            type="password"
            value={password.value}
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!password.isValid && (
            <span className="help-block">{password.message}</span>
          )}
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit" disabled={loading}>
            Sign in
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

LoginFormComponent.ownProps = {
  onSubmit: () => {},
};

LoginFormComponent.propTypes = {
  auth: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onSubmit: PropTypes.func,
};

export const LoginForm = compose(
  withLoginFields,
  withLoginValidator,
  withLoginEnhancer
)(LoginFormComponent);
