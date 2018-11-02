import { getCoursesEntries } from './getCoursesEntries';

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

describe('getCoursesEntries', () => {
  it('should return courses entries', () => {
    expect(getCoursesEntries(state)).toEqual(state.courses.entries);
  });
});
