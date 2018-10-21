import { getCoursesLoading } from './getCoursesLoading';

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

describe('getCoursesLoading', () => {
  it('should return courses loading value', () => {
    expect(getCoursesLoading(state)).toEqual(state.courses.loading);
  });
});
