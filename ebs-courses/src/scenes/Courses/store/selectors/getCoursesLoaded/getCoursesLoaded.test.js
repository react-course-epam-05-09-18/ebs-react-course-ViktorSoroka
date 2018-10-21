import { getCoursesLoaded } from './getCoursesLoaded';

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

describe('getCoursesLoaded', () => {
  it('should return courses loaded value', () => {
    expect(getCoursesLoaded(state)).toEqual(state.courses.loaded);
  });
});
