import { compose, lifecycle, withHandlers } from 'recompose';

export const withLoginEnhancer = compose(
  lifecycle({
    componentWillMount() {
      this.props.onEnterPage();
    },
  }),
  withHandlers({
    handleSubmit: props => e => {
      e.preventDefault();

      const {
        auth,
        onSubmit,
        formFields: { login, password },
      } = props;

      if (auth.loading) {
        return;
      }

      const isFormValid = props.validateFields();

      if (!isFormValid) {
        return;
      }

      onSubmit({ login: login.value, password: password.value });
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
