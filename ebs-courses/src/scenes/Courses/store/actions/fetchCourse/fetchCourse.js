import * as coursesService from '../../../services/coursesService';
import { fetchCoursesInProgress } from '../fetchCoursesInProgress';
import { fetchCoursesFail } from '../fetchCourseFail';
import { fetchCoursesSuccess } from '../fetchCoursesSuccess';

export const fetchCoursesCreator = ({
  fetchCoursesInProgress,
  fetchCoursesSuccess,
  fetchCoursesFail,
  api,
}) => (search = '') => dispatch => {
  dispatch(fetchCoursesInProgress());

  return api
    .fetchCourses(search)
    .then(courses => dispatch(fetchCoursesSuccess(courses)))
    .catch(e => dispatch(fetchCoursesFail(e.message)));
};

export const fetchCourses = fetchCoursesCreator({
  fetchCoursesInProgress,
  fetchCoursesFail,
  fetchCoursesSuccess,
  api: coursesService,
});
