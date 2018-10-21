import { loginUserInProgress, LOGIN_IN_PROGRESS } from './loginUserInProgress';

describe('loginUserInProgress', () => {
  it('should create an action for login in progress', () => {
    const expectedAction = {
      type: LOGIN_IN_PROGRESS,
    };

    expect(loginUserInProgress()).toEqual(expectedAction);
  });
});
