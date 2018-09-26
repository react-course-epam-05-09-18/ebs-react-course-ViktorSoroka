import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel } from 'react-bootstrap';

import { FormatDuration, FormatDate } from '../../../../components';
import './styles.css';

export class CourseCard extends Component {
  render() {
    const {
      course: { id, name, description, duration, createDate },
    } = this.props;

    return (
      <Panel className="ebs-course-card row">
        <div className="col-sm-10">
          <div className="row">
            <div className="col-sm-3">
              <h3>{name}</h3>
            </div>
            <div className="col-sm-3">
              <FormatDuration duration={duration}>
                {({ formattedDuration }) => formattedDuration}
              </FormatDuration>
            </div>
            <div className="col-sm-offset-4 col-sm-2 text-right">
              <FormatDate date={createDate} />
            </div>
          </div>
          <p>{description}</p>
        </div>
        <div className="col-sm-2">
          <div>
            <Button bsStyle="primary">
              <Link to={`/courses/${id}`}>Edit</Link>
            </Button>
          </div>
          <div className="m-t-sm">
            <Button bsStyle="danger">Delete</Button>
          </div>
        </div>
      </Panel>
    );
  }
}
