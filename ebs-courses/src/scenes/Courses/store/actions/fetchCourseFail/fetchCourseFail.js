export const FETCH_FAIL = '[Courses] Fetching Fail';

export const fetchCoursesFail = payload => {
  return {
    type: FETCH_FAIL,
    payload,
  };
};
