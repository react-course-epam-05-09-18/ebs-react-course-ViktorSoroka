import { updateCourseSuccess, UPDATE_SUCCESS } from './updateCourseSuccess';

describe('course actions', () => {
  it('should create an action for update course succeeded', () => {
    const expectedAction = {
      type: UPDATE_SUCCESS,
    };

    expect(updateCourseSuccess()).toEqual(expectedAction);
  });
});
