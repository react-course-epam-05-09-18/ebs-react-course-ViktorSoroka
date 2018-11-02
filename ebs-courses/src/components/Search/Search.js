import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

export class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
    defaultValue: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value.trim());
  };

  render() {
    const { placeholder, defaultValue } = this.props;

    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="formInlineName" className="m-r-sm">
          <FormControl
            defaultValue={defaultValue}
            type="text"
            placeholder={placeholder}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button type="submit">Search</Button>
      </Form>
    );
  }
}
