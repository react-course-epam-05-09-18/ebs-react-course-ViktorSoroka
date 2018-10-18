import { compose, withHandlers } from 'recompose';

export const withFormValidator = compose(
  withHandlers({
    validateField: ({ formFields, updateField }) => key => {
      const { value, validators = [] } = formFields[key];
      const message = validators.reduce(
        (res, validator) => (res ? res : validator(key, value)),
        ''
      );
      const isValid = !message;

      updateField(key, {
        isValid,
        message,
      });

      return isValid;
    },
  }),
  withHandlers({
    validateFields: props => () => {
      return Object.keys(props.formFields).reduce((valid, key) => {
        return props.validateField(key) && valid;
      }, true);
    },
  })
);
