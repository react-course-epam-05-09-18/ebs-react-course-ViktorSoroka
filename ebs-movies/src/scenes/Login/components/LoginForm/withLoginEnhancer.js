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
      const isFormValid = props.validateFields(Object.keys(props.formFields));

      if (auth.loading || !isFormValid) {
        return false;
      }

      onSubmit({ login: login.value, password: password.value });
    },
    handleChange: props => e => {
      props.updateField(e.target.name, { value: e.target.value });
    },
    handleBlur: props => e => {
      const key = e.target.name;
      const value = props.formFields[e.target.name].value;
      const message = props.checkRequired(key, value);

      props.updateField(e.target.name, {
        isValid: !message,
        message,
      });
    },
  })
);
