import { fetchCoursesFail, FETCH_FAIL } from './fetchCourseFail';

describe('fetchCourseFail', () => {
  it('should create an action for fetch courses fail', () => {
    const error = 'Network error';

    const expectedAction = {
      type: FETCH_FAIL,
      payload: error,
    };

    expect(fetchCoursesFail(error)).toEqual(expectedAction);
  });
});
