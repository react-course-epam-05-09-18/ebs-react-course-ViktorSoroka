import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

export class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
  };

  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);
  };

  render() {
    const { placeholder } = this.props;

    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="formInlineName">
          <FormControl
            type="text"
            placeholder={placeholder}
            onChange={this.handleChange}
          />
        </FormGroup>{' '}
        <Button type="submit">Search</Button>
      </Form>
    );
  }
}
