import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { LoginFormComponent } from './LoginForm';

const handleSubmit = sinon.stub();
const handleChange = sinon.stub();
const handleBlur = sinon.stub();

function generateWrapper(passedProps, method = mount) {
  const defaultProps = {
    auth: {
      error: '',
      loading: false,
    },
    formFields: {
      login: {
        isValid: true,
        value: '',
        message: '',
      },
      password: {
        isValid: true,
        value: '',
        message: '',
      },
    },
    handleSubmit,
    handleChange,
    handleBlur,
  };
  const props = { ...defaultProps, ...passedProps };

  return method(<LoginFormComponent {...props} />);
}

describe('<LoginForm />', () => {
  let wrapper;
  let loginField;
  let passwordField;

  beforeEach(() => {
    wrapper = generateWrapper();
  });

  afterEach(() => {
    handleSubmit.resetHistory();
    handleChange.resetHistory();
    handleBlur.resetHistory();
  });

  afterAll(() => {
    loginField = null;
    passwordField = null;
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('login field', () => {
    it('should render', () => {
      const loginField = wrapper.find('input[name="login"]');

      expect(loginField.exists()).toBe(true);
    });

    it('should have passed in value', () => {
      const loginFieldValue = 'login value';

      wrapper = generateWrapper({
        formFields: {
          login: {
            isValid: true,
            value: loginFieldValue,
            message: '',
          },
          password: {
            isValid: true,
            value: '',
            message: '',
          },
        },
      });
      const loginField = wrapper.find('input[name="login"]');

      expect(loginField.props().value).toBe(loginFieldValue);
    });

    it('should call change callback when field is changed', () => {
      const loginField = wrapper.find('input[name="login"]');

      expect(handleChange.calledOnce).toBe(false);

      loginField.simulate('change', {
        target: { value: 'hello' },
      });

      expect(handleChange.calledOnce).toBe(true);
    });

    it('should call blur callback when field is blurred', () => {
      const loginField = wrapper.find('input[name="login"]');

      expect(handleBlur.calledOnce).toBe(false);

      loginField.simulate('blur', {
        target: { value: 'hello' },
      });

      expect(handleBlur.calledOnce).toBe(true);
    });

    describe('error scenario', () => {
      it('should not have error when field is valid', () => {
        const loginFieldError = wrapper.find(
          'FormControl[name="login"] + span'
        );

        expect(loginFieldError.exists()).toBe(false);
      });

      it('should have error when field is invalid', () => {
        const loginErrorMsg = 'login failed';

        wrapper = generateWrapper({
          formFields: {
            login: {
              isValid: false,
              value: '',
              message: loginErrorMsg,
            },
            password: {
              isValid: true,
              value: '',
              message: '',
            },
          },
        });

        const loginFieldError = wrapper.find(
          'FormControl[name="login"] + span'
        );

        expect(loginFieldError.exists()).toBe(true);
        expect(loginFieldError.contains(loginErrorMsg)).toBe(true);
      });
    });
  });

  describe('password field', () => {
    it('should render', () => {
      const passwordField = wrapper.find('input[name="password"]');

      expect(passwordField.exists()).toBe(true);
    });

    it('should have passed in value', () => {
      const passwordFieldValue = 'password value';

      wrapper = generateWrapper({
        formFields: {
          password: {
            isValid: true,
            value: passwordFieldValue,
            message: '',
          },
          login: {
            isValid: true,
            value: '',
            message: '',
          },
        },
      });
      const loginField = wrapper.find('input[name="password"]');

      expect(loginField.props().value).toBe(passwordFieldValue);
    });

    it('should call change callback when field is changed', () => {
      const passwordField = wrapper.find('input[name="password"]');

      expect(handleChange.calledOnce).toBe(false);

      passwordField.simulate('change', {
        target: { value: 'hello' },
      });

      expect(handleChange.calledOnce).toBe(true);
    });

    it('should call blur callback when field is blurred', () => {
      const passwordField = wrapper.find('input[name="password"]');

      expect(handleBlur.calledOnce).toBe(false);

      passwordField.simulate('blur', {
        target: { value: 'hello' },
      });

      expect(handleBlur.calledOnce).toBe(true);
    });

    describe('error scenario', () => {
      it('should not have error when field is valid', () => {
        const passwordFieldError = wrapper.find(
          'FormControl[name="password"] + span'
        );

        expect(passwordFieldError.exists()).toBe(false);
      });

      it('should have error when field is invalid', () => {
        const passwordErrorMsg = 'password invalid';

        wrapper = generateWrapper({
          formFields: {
            password: {
              isValid: false,
              value: '',
              message: passwordErrorMsg,
            },
            login: {
              isValid: true,
              value: '',
              message: '',
            },
          },
        });

        const loginFieldError = wrapper.find(
          'FormControl[name="password"] + span'
        );

        expect(loginFieldError.exists()).toBe(true);
        expect(loginFieldError.contains(passwordErrorMsg)).toBe(true);
      });
    });
  });

  describe('error scenario', () => {
    it('should not display an error when error prop is not passed', () => {
      const err = wrapper.find('Alert');

      expect(err.exists()).toBe(false);
    });

    it('should display an error when error prop is not passed', () => {
      const errorMsg = 'Error message';

      wrapper = generateWrapper({ auth: { loading: false, error: errorMsg } });
      const err = wrapper.find('Alert');

      expect(err.exists()).toBe(true);
      expect(err.contains(errorMsg)).toBe(true);
    });
  });

  describe('loading scenario', () => {
    describe('when form is not loading', () => {
      it('submit btn should not be disabled', () => {
        const btn = wrapper.find('button.loginFormBtn');

        expect(btn.props().disabled).toBe(false);
      });
    });

    describe('when form is loading', () => {
      beforeEach(() => {
        wrapper = generateWrapper({ auth: { loading: true, error: '' } });
      });

      it('submit btn should be disabled', () => {
        const btn = wrapper.find('button.loginFormBtn');

        btn.simulate('click');

        expect(btn.props().disabled).toBe(true);
      });
    });
  });

  describe('when form is submitted', () => {
    it('submit callback should be called', () => {
      const btn = wrapper.find('button.loginFormBtn');

      expect(handleSubmit.calledOnce).toBe(false);

      btn.simulate('submit');

      expect(handleSubmit.calledOnce).toBe(true);
    });
  });
});
