import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Search } from '../../components';
import { extractQueryString } from '../../services';
import { getCourses, fetchCourses, searchCourses, deleteCourse } from './store';
import { CourseCard } from './components';

class CoursesComponent extends Component {
  static propTypes = {
    fetchCourses: PropTypes.func.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);

    this.initialSearchValue = decodeURIComponent(
      extractQueryString(props.location.search).search || ''
    );
  }

  componentDidMount() {
    const { search } = this.props.location;

    this.props.fetchCourses(search);
  }

  componentDidUpdate(prevProps) {
    const { search: prevSearch } = prevProps.location;
    const { search } = this.props.location;

    if (prevSearch !== search) {
      this.props.fetchCourses(search);
    }
  }

  onSubmit = search => {
    this.props.searchCourses(search);
  };

  renderCourses() {
    const { courses, deleteCourse } = this.props;

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
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <Search
              defaultValue={this.initialSearchValue}
              onSubmit={this.onSubmit}
              placeholder="By name or date"
            />
          </div>
          <div className="col-sm-2 col-sm-offset-4 text-right">
            <Button bsStyle="primary">
              <Link to="/courses/new">Add course</Link>
            </Button>
          </div>
        </div>
        <div className="m-t-md">{this.renderCourses()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: getCourses(state),
});

const mapDispatchToProps = {
  fetchCourses,
  searchCourses,
  deleteCourse,
};

export const Courses = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesComponent);
