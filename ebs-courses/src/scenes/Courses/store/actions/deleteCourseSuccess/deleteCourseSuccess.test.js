import { deleteCourseSuccess, DELETE_SUCCESS } from './deleteCourseSuccess';

describe('deleteCourseSuccess', () => {
  it('should create an action for delete course success', () => {
    const expectedAction = {
      type: DELETE_SUCCESS,
      payload: 'uuid',
    };

    expect(deleteCourseSuccess('uuid')).toEqual(expectedAction);
  });
});
