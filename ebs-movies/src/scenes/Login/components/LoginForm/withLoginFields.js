import { compose, withHandlers, withState } from 'recompose';

export const withLoginFields = compose(
  withState('formFields', 'setFormFields', {
    login: { value: '', isValid: true, message: '' },
    password: { value: '', isValid: true, message: '' },
  }),
  withHandlers({
    updateField: ({ setFormFields }) => (key, value) => {
      setFormFields(old => ({
        ...old,
        [key]: { ...old[key], ...value },
      }));
    },
  })
);
