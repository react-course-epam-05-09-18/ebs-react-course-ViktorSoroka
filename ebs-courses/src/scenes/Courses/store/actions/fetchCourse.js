import { normalise } from '../../../../services';
import * as coursesService from '../../services/coursesService';

export const FETCH_IN_PROGRESS = '[Courses] Fetching';
export const FETCH_SUCCESS = '[Courses] Fetching Success';
export const FETCH_FAIL = '[Courses] Fetching Fail';

export const fetchCoursesInProgress = () => {
  return {
    type: FETCH_IN_PROGRESS,
  };
};

export const fetchCoursesSuccess = payload => {
  return {
    type: FETCH_SUCCESS,
    payload,
  };
};

export const fetchCoursesFail = payload => {
  return {
    type: FETCH_FAIL,
    payload,
  };
};

export const fetchCoursesCreator = ({
  fetchCoursesInProgress,
  fetchCoursesSuccess,
  fetchCoursesFail,
  api,
}) => (search = '') => dispatch => {
  dispatch(fetchCoursesInProgress());

  return api
    .fetchCourses(search)
    .then(courses => dispatch(fetchCoursesSuccess(normalise(courses))))
    .catch(e => dispatch(fetchCoursesFail(e.message)));
};

export const fetchCourses = fetchCoursesCreator({
  fetchCoursesInProgress,
  fetchCoursesFail,
  fetchCoursesSuccess,
  api: coursesService,
});
