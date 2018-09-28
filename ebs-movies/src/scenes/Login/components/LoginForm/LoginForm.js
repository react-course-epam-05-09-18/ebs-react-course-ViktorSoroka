import React, { Component } from 'react';
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

export class LoginForm extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }),
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        state: PropTypes.shape({
          from: PropTypes.shape({}),
        }),
      }).isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  formFields = {
    login: { value: '', isValid: true, message: '' },
    password: { value: '', isValid: true, message: '' },
  };

  state = {
    ...this.formFields,
  };

  componentWillMount() {
    this.navigateIfAlreadyAuthorized();
  }

  navigateIfAlreadyAuthorized() {
    const {
      history,
      auth: { user },
    } = this.props;
    const { state: locationState = {} } = history.location;

    if (user) {
      history.push(locationState.from || '/');
    }
  }

  handleChange = e => {
    const state = {
      ...this.state,
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value,
      },
    };

    this.setState(state);
  };

  checkRequired = key => {
    const value = this.state[key].value;

    if (!value) {
      return `Please enter the ${key}`;
    }

    return '';
  };

  validateField = key => {
    const message = this.checkRequired(key);
    const isValid = !message;

    this.setState(state => ({
      [key]: {
        ...state[key],
        isValid,
        message,
      },
    }));

    return isValid;
  };

  validateFields = fields => {
    return fields.reduce((valid, key) => {
      return this.validateField(key) && valid;
    }, true);
  };

  validateOnBlur = e => {
    const message = this.checkRequired(e.target.name);

    const state = {
      ...this.state,
      [e.target.name]: {
        ...this.state[e.target.name],
        isValid: !message,
        message,
      },
    };

    this.setState(state);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { auth, onSubmit, history } = this.props;
    const isFormValid = this.validateFields(Object.keys(this.formFields));

    if (auth.loading || !isFormValid) {
      return false;
    }

    const { login, password } = this.state;

    onSubmit({ login: login.value, password: password.value }).then(success => {
      if (!success) return;

      const { state: locationState = {} } = history.location;

      history.push(locationState.from || '/');
    });
  };

  render() {
    const { error, loading } = this.props.auth;
    const { login, password } = this.state;

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
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
              onChange={this.handleChange}
              onBlur={this.validateOnBlur}
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
              onChange={this.handleChange}
              onBlur={this.validateOnBlur}
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
  }
}
