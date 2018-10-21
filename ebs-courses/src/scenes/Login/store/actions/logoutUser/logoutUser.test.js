import sinon from 'sinon';

import { logoutUserCreator, LOGOUT } from './logoutUser';

describe('logoutUser', () => {
  const storage = {
    removeItem: sinon.stub(),
  };
  const dispatchMock = sinon.stub();
  const logoutUser = logoutUserCreator({ storage })();

  beforeEach(() => {
    logoutUser(dispatchMock);
  });

  afterEach(() => {
    storage.removeItem.resetHistory();
    dispatchMock.resetHistory();
  });

  it('should call an action for logout', () => {
    expect(
      dispatchMock.calledWith({
        type: LOGOUT,
      })
    ).toBe(true);
  });

  it('should remove user from storage', () => {
    expect(storage.removeItem.calledWith('user')).toBe(true);
  });
});
