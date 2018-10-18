import React, { Component } from 'react';
import {
  Alert,
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { FormatDuration } from '../../../../components';
import { withFormValidator } from '../../../../hoc';
import { withCourseFormFields } from './withCourseFormFields';
import { withCourseFormEnhancer } from './withCourseFormEnhancer';

export class CourseFormComponent extends Component {
  render() {
    const {
      formFields: { duration, name, description, createDate },
      handleSubmit,
      error,
      loading,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        {error && (
          <Alert bsStyle="warning">
            <strong>{error}</strong>
          </Alert>
        )}
        <FormGroup
          controlId="formHorizontalName"
          validationState={!name.isValid ? 'error' : null}
        >
          <Col sm={2} componentClass={ControlLabel}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="name"
              value={name.value}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {!name.isValid && (
              <span className="help-block">{name.message}</span>
            )}
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalDescription"
          validationState={!description.isValid ? 'error' : null}
        >
          <Col sm={2} componentClass={ControlLabel}>
            Description
          </Col>
          <Col sm={10}>
            <FormControl
              componentClass="textarea"
              name="description"
              value={description.value}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {!description.isValid && (
              <span className="help-block">{description.message}</span>
            )}
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalDate"
          validationState={!createDate.isValid ? 'error' : null}
        >
          <Col sm={2} componentClass={ControlLabel}>
            Date
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="createDate"
              value={createDate.value}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {!createDate.isValid && (
              <span className="help-block">{createDate.message}</span>
            )}
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalDuration"
          validationState={!duration.isValid ? 'error' : null}
        >
          <Col sm={2} componentClass={ControlLabel}>
            Duration
          </Col>
          <Col sm={2}>
            <FormatDuration duration={duration.value}>
              {({ formattedDuration }) => (
                <div>
                  <FormControl
                    type="number"
                    name="duration"
                    value={duration.value}
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                  />
                  <span>{formattedDuration}</span>
                </div>
              )}
            </FormatDuration>
            {!duration.isValid && (
              <span className="help-block">{duration.message}</span>
            )}
          </Col>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col smOffset={2} sm={10}>
              <Button
                bsStyle="primary"
                className="m-r-sm"
                type="submit"
                disabled={loading}
              >
                Save
              </Button>
              <Button bsStyle="danger" disabled={loading}>
                <Link to="/courses">Cancel</Link>
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

export const CourseForm = compose(
  withCourseFormFields,
  withFormValidator,
  withCourseFormEnhancer
)(CourseFormComponent);
