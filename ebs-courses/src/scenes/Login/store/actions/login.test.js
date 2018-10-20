import sinon from 'sinon';

import * as actions from './login';

describe('login actions', () => {
  it('should create an action for login in progress', () => {
    const expectedAction = {
      type: actions.LOGIN_IN_PROGRESS,
    };

    expect(actions.loginInProgress()).toEqual(expectedAction);
  });

  it('should create an action for succeeded login', () => {
    const user = {};

    const expectedAction = {
      type: actions.LOGIN_SUCCESS,
      payload: user,
    };

    expect(actions.loginUserSuccess(user)).toEqual(expectedAction);
  });

  it('should create an action for failed login', () => {
    const error = 'Network error';

    const expectedAction = {
      type: actions.LOGIN_FAIL,
      payload: error,
    };

    expect(actions.loginUserFail(error)).toEqual(expectedAction);
  });
});

describe('logout actions', () => {
  const storage = {
    removeItem: sinon.stub(),
  };
  const dispatchMock = sinon.stub();
  const logoutUser = actions.logoutUserCreator({ storage })();

  beforeEach(() => {
    logoutUser(dispatchMock);
  });

  afterEach(() => {
    storage.removeItem.resetHistory();
    dispatchMock.resetHistory();
  });

  it('should call an action for LOGOUT', () => {
    expect(
      dispatchMock.calledWith({
        type: actions.LOGOUT,
      })
    ).toBe(true);
  });

  it('should remove user from storage', () => {
    expect(storage.removeItem.calledWith('user')).toBe(true);
  });
});
