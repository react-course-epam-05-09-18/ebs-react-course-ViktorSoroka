import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withProps } from 'recompose';

import { extractQueryString } from '../../services';
import { getCourses, fetchCourses, searchCourses, deleteCourse } from './store';
import { CoursesPage } from './components';

const withCourses = compose(
  withProps(props => {
    return {
      initialSearchValue: decodeURIComponent(
        extractQueryString(props.location.search).search || ''
      ),
    };
  }),
  withHandlers({
    onSubmit: ({ searchCourses }) => search => {
      searchCourses(search);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { search } = this.props.location;

      this.props.fetchCourses(search);
    },
    componentDidUpdate(prevProps) {
      const { search: prevSearch } = prevProps.location;
      const { search } = this.props.location;

      if (prevSearch !== search) {
        this.props.fetchCourses(search);
      }
    },
  })
);

const mapStateToProps = state => ({
  courses: getCourses(state),
});

const mapDispatchToProps = {
  fetchCourses,
  searchCourses,
  deleteCourse,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withCourses
);

export const Courses = enhance(CoursesPage);
