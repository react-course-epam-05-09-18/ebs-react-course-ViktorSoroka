import * as selectors from './course';

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

describe('getSelectedCourse', () => {
  it('should return auth', () => {
    expect(selectors.getSelectedCourse(state, 'uuid')).toEqual('firstCourse');
  });

  it('should return nothing when there is no match', () => {
    expect(selectors.getSelectedCourse(state, 'uuid1')).toBeUndefined();
  });
});

describe('getCourseLoading', () => {
  it('should return auth loading', () => {
    expect(selectors.getCourseLoading(state)).toEqual(state.course.loading);
  });
});

describe('getCourseError', () => {
  it('should return auth error', () => {
    expect(selectors.getCourseError(state)).toEqual(state.course.error);
  });
});
