import { fetchCoursesSuccess, FETCH_SUCCESS } from './fetchCoursesSuccess';

describe('fetchCoursesSuccess', () => {
  it('should create an action for fetch courses success', () => {
    const courses = [{ id: 'uuid', data: 'Some data' }];

    const expectedAction = {
      type: FETCH_SUCCESS,
      payload: {
        uuid: { id: 'uuid', data: 'Some data' },
      },
    };

    expect(fetchCoursesSuccess(courses)).toEqual(expectedAction);
  });
});
