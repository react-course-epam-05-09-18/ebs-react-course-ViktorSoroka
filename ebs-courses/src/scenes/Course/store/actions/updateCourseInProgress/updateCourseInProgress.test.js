import {
  updateCourseInProgress,
  UPDATE_IN_PROGRESS,
} from './updateCourseInProgress';

describe('updateCourseInProgress', () => {
  it('should create an action for update course in progress', () => {
    const expectedAction = {
      type: UPDATE_IN_PROGRESS,
    };

    expect(updateCourseInProgress()).toEqual(expectedAction);
  });
});
