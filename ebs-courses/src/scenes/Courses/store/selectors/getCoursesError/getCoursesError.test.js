import { getCoursesError } from './getCoursesError';

const state = {
  courses: {
    entries: {
      uuid: 'firstCourse',
    },
    loaded: false,
    loading: false,
    error: 'error',
  },
};

describe('getCoursesError', () => {
  it('should return courses error', () => {
    expect(getCoursesError(state)).toEqual(state.courses.error);
  });
});
