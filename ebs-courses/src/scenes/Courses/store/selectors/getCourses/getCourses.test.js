import { getCourses } from './getCourses';

const state = {
  courses: {
    entries: {
      uuid: 'firstCourse',
      uuid2: 'secondCourse',
    },
    loaded: false,
    loading: false,
    error: 'error',
  },
};

describe('getCourses', () => {
  it('should return courses', () => {
    expect(getCourses(state)).toEqual(['firstCourse', 'secondCourse']);
  });
});
