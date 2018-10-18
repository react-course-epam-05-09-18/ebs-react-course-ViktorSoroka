import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withProps } from 'recompose';

import { withSpinnerWhileLoading } from '../../hoc';
import { AlertModal } from '../../components';

import { fetchCourses, getCoursesLoaded, getCoursesLoading } from '../Courses';
import {
  getCourseError,
  getCourseLoading,
  getSelectedCourse,
  updateCourse,
} from './store';
import { CourseForm } from './components';

export function CourseComponent(props) {
  const {
    courseError,
    courseLoading,
    selectedCourse,
    modalRef,
    handleSubmitValidationErrors,
    onSubmit,
  } = props;

  return (
    <div>
      <CourseForm
        error={courseError}
        onSubmit={onSubmit}
        loading={courseLoading}
        course={selectedCourse}
        handleSubmitValidationErrors={handleSubmitValidationErrors}
      />
      <AlertModal ref={modalRef} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  coursesLoaded: getCoursesLoaded(state),
  coursesLoading: getCoursesLoading(state),
  courseLoading: getCourseLoading(state),
  courseError: getCourseError(state),
  selectedCourse: getSelectedCourse(state, ownProps.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  fetchCourses: (...args) => dispatch(fetchCourses(...args)),
  onSubmit: (...args) => dispatch(updateCourse(...args)),
});

export const Course = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.coursesLoaded) {
        this.props.fetchCourses();
      }
    },
  }),
  withSpinnerWhileLoading(
    ({ coursesLoading, coursesLoaded }) => coursesLoading || !coursesLoaded
  ),
  lifecycle({
    componentDidMount() {
      const courseNotExists =
        this.props.coursesLoaded &&
        this.props.match.params.id &&
        !this.props.selectedCourse;

      if (courseNotExists) {
        this.props.history.push('/courses/not-found');
      }
    },
  }),
  withProps(() => ({
    modalRef: React.createRef(),
  })),
  withHandlers({
    handleSubmitValidationErrors: props => () => {
      const { modalRef } = props;

      modalRef.current.show({
        modalTitle: 'There are validation errors. Please enter valid data.',
      });
    },
  })
)(CourseComponent);
