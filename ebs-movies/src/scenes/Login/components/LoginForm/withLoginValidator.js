import { compose, withHandlers } from 'recompose';

const checkRequired = (key, value) => {
  return !value ? `Please enter the ${key}` : '';
};

export const withLoginValidator = compose(
  withHandlers({
    checkRequired: () => checkRequired,
  }),
  withHandlers({
    validateField: ({ formFields, updateField }) => key => {
      const { value } = formFields[key];
      const message = checkRequired(key, value);
      const isValid = !message;

      updateField(key, {
        isValid,
        message,
      });

      return isValid;
    },
  }),
  withHandlers({
    validateFields: props => fields => {
      return fields.reduce((valid, key) => {
        return props.validateField(key) && valid;
      }, true);
    },
  })
);
