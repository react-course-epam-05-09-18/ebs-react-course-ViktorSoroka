import { updateCourseFail, UPDATE_FAIL } from './updateCourseFail';

describe('updateCourseFail', () => {
  it('should create an action for update course fail', () => {
    const error = 'Network error';

    const expectedAction = {
      type: UPDATE_FAIL,
      payload: error,
    };

    expect(updateCourseFail(error)).toEqual(expectedAction);
  });
});
