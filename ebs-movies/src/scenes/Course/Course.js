import React, { Component } from 'react';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FormatDuration } from '../../components';

export class Course extends Component {
  state = {
    course: {
      id: null,
      duration: 0,
    },
  };

  updateCourse = (prop, val) => {
    this.setState(({ course }) => {
      return {
        course: {
          ...course,
          [prop]: val,
        },
      };
    });
  };

  handleDurationChange = e => {
    const { value } = e.target;

    if (value.length > 4) {
      return;
    }

    this.updateCourse('duration', value);
  };

  render() {
    const {
      course: { duration },
    } = this.state;

    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalName">
          <Col sm={2} componentClass={ControlLabel}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl type="text" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDescription">
          <Col sm={2} componentClass={ControlLabel}>
            Description
          </Col>
          <Col sm={10}>
            <FormControl componentClass="textarea" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDate">
          <Col sm={2} componentClass={ControlLabel}>
            Date
          </Col>
          <Col sm={10}>
            <FormControl type="text" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDuration">
          <Col sm={2} componentClass={ControlLabel}>
            Duration
          </Col>
          <Col sm={2}>
            <FormatDuration duration={duration}>
              {({ formattedDuration }) => (
                <div>
                  <FormControl
                    value={duration}
                    type="number"
                    onChange={this.handleDurationChange}
                  />
                  <span>{formattedDuration}</span>
                </div>
              )}
            </FormatDuration>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={2} componentClass={ControlLabel}>
            Description
          </Col>
          <Col sm={10}>
            <FormControl componentClass="textarea" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit">
                Save
              </Button>{' '}
              <Button bsStyle="danger">
                <Link to={'/courses'}>Cancel</Link>
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}
