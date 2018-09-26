import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Search } from '../../components';
import { CourseCard } from './components';
import { fetchCourses } from './store/actions';
import { getCourses } from './store/reducers/courses';

class _Courses extends Component {
  static propTypes = {
    fetchCourses: PropTypes.func.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        createDate: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  componentDidMount() {
    this.props.fetchCourses();
  }

  onSubmit = () => {
    console.log('submit');
  };

  renderCourses() {
    const { courses } = this.props;

    return (
      <div>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <Search onSubmit={this.onSubmit} placeholder="By name or date" />
          </div>
          <div className="col-sm-2 col-sm-offset-4 text-right">
            <Button bsStyle="primary">
              <Link to={'/courses/new'}>Add course</Link>
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
};

export const Courses = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Courses);
