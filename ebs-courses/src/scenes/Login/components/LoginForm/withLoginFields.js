import { compose, withHandlers, withState } from 'recompose';

import { checkRequired } from '../../../../services';

export const withLoginFields = compose(
  withState('formFields', 'setFormFields', {
    login: {
      value: '',
      isValid: true,
      message: '',
      validators: [checkRequired],
    },
    password: {
      value: '',
      isValid: true,
      message: '',
      validators: [checkRequired],
    },
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
