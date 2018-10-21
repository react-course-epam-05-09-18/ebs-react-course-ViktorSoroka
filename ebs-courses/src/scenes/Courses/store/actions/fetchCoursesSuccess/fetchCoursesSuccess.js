import { normalise } from '../../../../../services';

export const FETCH_SUCCESS = '[Courses] Fetching Success';

export const fetchCoursesSuccess = payload => {
  return {
    type: FETCH_SUCCESS,
    payload: normalise(payload),
  };
};
