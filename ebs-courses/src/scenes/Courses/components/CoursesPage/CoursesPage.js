import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Search } from '../../../../components';
import { CoursesList } from '../CoursesList';

export function CoursesPage(props) {
  const { initialSearchValue, courses, deleteCourse, onSubmit } = props;

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <Search
            defaultValue={initialSearchValue}
            onSubmit={onSubmit}
            placeholder="By name or date"
          />
        </div>
        <div className="col-sm-2 col-sm-offset-4 text-right">
          <Button bsStyle="primary">
            <Link to="/courses/new">Add course</Link>
          </Button>
        </div>
      </div>
      <div className="m-t-md">
        <CoursesList courses={courses} deleteCourse={deleteCourse} />
      </div>
    </div>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteCourse: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialSearchValue: PropTypes.string.isRequired,
};
