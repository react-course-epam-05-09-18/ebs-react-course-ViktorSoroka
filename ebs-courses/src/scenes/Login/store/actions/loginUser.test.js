import sinon from 'sinon';

import { loginUserCreator } from './loginUser';

describe('loginUser', () => {
  let loginUser;

  const loginUserPayload = 'loginUserPayload';

  const mockUser = {
    username: 'john_doe',
  };

  const api = {
    loginUser: sinon.stub(),
  };

  const history = {
    location: { state: {} },
    push: sinon.stub(),
  };

  const storage = {
    setItem: sinon.stub(),
  };

  const loginInProgress = sinon.stub();
  const loginUserFail = sinon.stub();
  const loginUserSuccess = sinon.stub();
  const dispatchMock = sinon.stub();

  beforeEach(async () => {
    loginUser = loginUserCreator({
      api,
      loginUserFail,
      loginUserSuccess,
      loginInProgress,
      storage,
      history,
    })(loginUserPayload);
  });

  afterEach(() => {
    api.loginUser.resetHistory();
    history.push.resetHistory();
    dispatchMock.resetHistory();
  });

  describe('when response is succeeded', () => {
    beforeEach(async () => {
      api.loginUser.returns(Promise.resolve(mockUser));

      await loginUser(dispatchMock);
    });

    it('should call loginUserInProgress', () => {
      expect(loginInProgress.calledOnce).toBe(true);
    });

    it('should call loginUser from api', () => {
      expect(api.loginUser.calledOnce).toBe(true);
    });

    it('should call loginUser with payload', () => {
      expect(api.loginUser.calledWith(loginUserPayload)).toBe(true);
    });

    it('should call loginUserSuccess on success response', () => {
      expect(loginUserSuccess.calledWith(mockUser)).toBe(true);
    });

    it('should store user', () => {
      expect(storage.setItem.calledWith('user', mockUser)).toBe(true);
    });

    it('should redirect', () => {
      expect(history.push.calledOnce).toBe(true);
    });

    it('should redirect to the home page', () => {
      expect(history.push.calledWith('/')).toBe(true);
    });

    it('should redirect to the previous history location', async () => {
      const history = {
        location: { state: { from: 'fromLocation' } },
        push: sinon.stub(),
      };

      loginUser = loginUserCreator({
        api,
        loginUserFail,
        loginUserSuccess,
        loginInProgress,
        storage,
        history,
      })(loginUserPayload);

      api.loginUser.returns(Promise.resolve(mockUser));

      await loginUser(dispatchMock);

      expect(history.push.calledWith('fromLocation')).toBe(true);
    });

    it('should call dispatchMock twice', () => {
      expect(dispatchMock.calledTwice).toBe(true);
    });
  });

  describe('when response is errored', () => {
    beforeEach(async () => {
      api.loginUser.returns(Promise.reject(new Error('Error')));

      await loginUser(dispatchMock);
    });

    it('should call loginUserFail', () => {
      expect(loginUserFail.calledOnce).toBe(true);
    });

    it('should call loginUserFail with error message', () => {
      expect(loginUserFail.calledWith('Error')).toBe(true);
    });
  });
});
