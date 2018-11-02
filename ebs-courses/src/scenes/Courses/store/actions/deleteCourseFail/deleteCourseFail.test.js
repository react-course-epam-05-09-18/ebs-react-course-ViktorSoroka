import { deleteCourseFail, DELETE_FAIL } from './deleteCourseFail';

describe('deleteCourseFail', () => {
  it('should create an action for delete course fail', () => {
    const error = 'Network error';

    const expectedAction = {
      type: DELETE_FAIL,
      payload: error,
    };

    expect(deleteCourseFail(error)).toEqual(expectedAction);
  });
});
