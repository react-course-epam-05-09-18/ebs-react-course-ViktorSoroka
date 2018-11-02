import {
  fetchCoursesInProgress,
  FETCH_IN_PROGRESS,
} from './fetchCoursesInProgress';

describe('fetchCoursesInProgress', () => {
  it('should create an action for fetch courses in progress', () => {
    const expectedAction = {
      type: FETCH_IN_PROGRESS,
    };

    expect(fetchCoursesInProgress()).toEqual(expectedAction);
  });
});
