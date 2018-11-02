import { getCourseError } from './getCourseError';

const state = {
  courses: {
    entries: {
      uuid: 'firstCourse',
    },
  },
  course: {
    loading: false,
    error: 'error',
  },
};

describe('getCourseError', () => {
  it('should return course error', () => {
    expect(getCourseError(state)).toEqual(state.course.error);
  });
});
