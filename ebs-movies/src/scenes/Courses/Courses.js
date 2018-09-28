import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Search } from '../../components';
import { extractQueryString } from '../../services';
import { fetchCourses } from './store/actions';
import { getCourses } from './store/reducers';
import { CourseCard } from './components';

class _Courses extends Component {
  static propTypes = {
    fetchCourses: PropTypes.func.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        state: PropTypes.shape({
          from: PropTypes.shape({}),
        }),
      }).isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
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
    this.props.history.push({
      pathname: '/courses',
      search: `?search=${search}`,
    });
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
            <Search
              defaultValue={this.initialSearchValue}
              onSubmit={this.onSubmit}
              placeholder="By name or date"
            />
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
