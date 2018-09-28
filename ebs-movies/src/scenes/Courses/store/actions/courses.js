import { normalise } from '../../../../services';

export const FETCH_IN_PROGRESS = '[Courses] Fetching';
export const FETCH_FAIL = '[Courses] Fetching Fail';
export const FETCH_SUCCESS = '[Courses] Fetching Success';

export const fetchCourses = search => dispatch => {
  dispatch(fetchingInProgress());

  return fetch(`/courses${search}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(response => {
      if (!response.ok) {
        const msg = 'Network issues. Try later.';

        throw Error(msg);
      }

      return response.json();
    })
    .then(courses => {
      dispatch(fetchCoursesSuccess(normalise(courses)));
    })
    .catch(e => dispatch(fetchCoursesFail(e.message)));
};

export const fetchingInProgress = () => {
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
