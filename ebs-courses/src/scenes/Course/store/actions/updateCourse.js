import history from '../../../../services/history';
import * as courseService from '../../services/courseService';
import {
  updateCourseFail,
  updateCourseSuccess,
  updateCourseInProgress,
} from './course';

export const updateCourseCreator = ({
  updateCourseInProgress,
  updateCourseSuccess,
  updateCourseFail,
  history,
  api,
}) => payload => dispatch => {
  dispatch(updateCourseInProgress());

  api
    .updateCourse(payload)
    .then(() => {
      dispatch(updateCourseSuccess());

      history.push('/courses');
    })
    .catch(e => dispatch(updateCourseFail(e.message)));
};

export const updateCourse = updateCourseCreator({
  api: courseService,
  history,
  updateCourseFail,
  updateCourseSuccess,
  updateCourseInProgress,
});
