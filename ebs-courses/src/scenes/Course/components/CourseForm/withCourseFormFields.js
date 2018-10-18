import { compose, withHandlers, withState } from 'recompose';

import {
  checkRequired,
  convertFromFormatToDate,
  formatDate,
  maxLength,
  validatedDate,
} from '../../../../services';

export const withCourseFormFields = compose(
  withState('formFields', 'setFormFields', ({ course = {} }) => ({
    name: {
      value: course.name || '',
      isValid: true,
      message: '',
      validators: [checkRequired],
      serializer: val => val,
    },
    duration: {
      value: course.duration || '',
      isValid: true,
      message: '',
      validators: [checkRequired, maxLength(4)],
      serializer: val => Number(val),
    },
    createDate: {
      value: course.createDate ? formatDate(course.createDate) : '',
      isValid: true,
      message: '',
      validators: [checkRequired, validatedDate],
      serializer: val => convertFromFormatToDate(val),
    },
    description: {
      value: course.description || '',
      isValid: true,
      message: '',
      validators: [checkRequired],
      serializer: val => val,
    },
  })),
  withHandlers({
    updateField: ({ setFormFields }) => (key, value) => {
      setFormFields(old => ({
        ...old,
        [key]: { ...old[key], ...value },
      }));
    },
    serializeForm: ({ formFields }) => (data = {}) => {
      return Object.keys(formFields).reduce((res, key) => {
        const { value, serializer } = formFields[key];

        return {
          ...res,
          [key]: serializer(value),
        };
      }, data);
    },
  })
);
