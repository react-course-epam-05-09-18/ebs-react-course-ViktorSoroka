import history from '../../../../../services/history';
import * as courseService from '../../../services/courseService';
import { updateCourseFail } from '../updateCourseFail';
import { updateCourseSuccess } from '../updateCourseSuccess';
import { updateCourseInProgress } from '../updateCourseInProgress';

export const updateCourseCreator = ({
  updateCourseInProgress,
  updateCourseSuccess,
  updateCourseFail,
  history,
  api,
}) => payload => dispatch => {
  dispatch(updateCourseInProgress());

  return api
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
