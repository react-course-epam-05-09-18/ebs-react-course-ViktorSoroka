import { loginUserSuccess, LOGIN_SUCCESS } from './loginUserSuccess';

describe('loginUserSuccess', () => {
  it('should create an action for succeeded login', () => {
    const user = {};

    const expectedAction = {
      type: LOGIN_SUCCESS,
      payload: user,
    };

    expect(loginUserSuccess(user)).toEqual(expectedAction);
  });
});
