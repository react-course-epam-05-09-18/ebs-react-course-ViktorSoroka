import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withSpinnerWhileLoading } from '../../../../hoc';
import { getCoursesLoading } from '../../store/selectors';
import { CourseCard } from '../CourseCard';

const CoursesListComponent = ({ courses, deleteCourse }) => {
  return (
    <div>
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          deleteCourse={deleteCourse}
        />
      ))}
    </div>
  );
};

CoursesListComponent.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getCoursesLoading(state),
});

const enhance = compose(
  connect(mapStateToProps),
  withSpinnerWhileLoading(({ loading }) => loading)
);

export const CoursesList = enhance(CoursesListComponent);
