import { getCourseLoading } from './getCourseLoading';

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

describe('getCourseLoading', () => {
  it('should return course loading', () => {
    expect(getCourseLoading(state)).toEqual(state.course.loading);
  });
});
