import { getSelectedCourse } from './getSelectedCourse';

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
  it('should return selected course', () => {
    expect(getSelectedCourse(state, 'uuid')).toEqual('firstCourse');
  });

  it('should return nothing when there is no match', () => {
    expect(getSelectedCourse(state, 'uuid1')).toBeUndefined();
  });
});
