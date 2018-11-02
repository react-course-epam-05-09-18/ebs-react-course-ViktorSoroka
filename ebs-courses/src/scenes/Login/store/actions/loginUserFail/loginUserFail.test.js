import { loginUserFail, LOGIN_FAIL } from './loginUserFail';

describe('loginUserFail', () => {
  it('should create an action for failed login', () => {
    const error = 'Network error';

    const expectedAction = {
      type: LOGIN_FAIL,
      payload: error,
    };

    expect(loginUserFail(error)).toEqual(expectedAction);
  });
});
