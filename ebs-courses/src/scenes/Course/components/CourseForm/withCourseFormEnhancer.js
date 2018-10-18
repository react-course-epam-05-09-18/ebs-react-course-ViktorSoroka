import { compose, withHandlers } from 'recompose';

export const withCourseFormEnhancer = compose(
  withHandlers({
    handleSubmit: props => e => {
      e.preventDefault();

      if (props.loading) {
        return;
      }

      const isFormValid = props.validateFields();

      if (!isFormValid) {
        props.handleSubmitValidationErrors();

        return;
      }

      const { onSubmit } = props;
      const formData = props.serializeForm({
        id: props.course && props.course.id,
      });

      onSubmit(formData);
    },
    handleChange: props => e => {
      props.updateField(e.target.name, { value: e.target.value });
    },
    handleBlur: props => e => {
      const key = e.target.name;
      const { value, validators = [] } = props.formFields[e.target.name];
      const message = validators.reduce(
        (res, validator) => (res ? res : validator(key, value)),
        ''
      );

      props.updateField(e.target.name, {
        isValid: !message,
        message,
      });
    },
  })
);
