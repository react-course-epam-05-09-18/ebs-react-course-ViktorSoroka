import * as actions from './course';

describe('course actions', () => {
  it('should create an action for update course in progress', () => {
    const expectedAction = {
      type: actions.UPDATE_IN_PROGRESS,
    };

    expect(actions.updateCourseInProgress()).toEqual(expectedAction);
  });

  it('should create an action for update course succeeded', () => {
    const expectedAction = {
      type: actions.UPDATE_SUCCESS,
    };

    expect(actions.updateCourseSuccess()).toEqual(expectedAction);
  });

  it('should create an action for update course fail', () => {
    const error = 'Network error';

    const expectedAction = {
      type: actions.UPDATE_FAIL,
      payload: error,
    };

    expect(actions.updateCourseFail(error)).toEqual(expectedAction);
  });
});
