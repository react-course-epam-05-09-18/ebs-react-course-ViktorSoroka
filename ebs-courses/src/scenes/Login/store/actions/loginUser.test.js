import sinon from 'sinon';

import { loginUserCreator } from './loginUser';

describe('loginUser', () => {
  let loginUser;

  const loginFormPayload = {
    login: 'login',
    password: 'password',
  };

  const mockUser = {
    username: 'gohn_doe',
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
    })(loginFormPayload);
  });

  afterEach(() => {
    api.loginUser.resetHistory();
    history.push.resetHistory();
    dispatchMock.resetHistory();
  });

  describe('success response', () => {
    beforeEach(async () => {
      api.loginUser.returns(Promise.resolve(mockUser));

      await loginUser(dispatchMock);
    });

    it('should call loginInProgress', () => {
      expect(loginInProgress.calledOnce).toBe(true);
    });

    it('should call loginUser from api', () => {
      expect(api.loginUser.calledOnce).toBe(true);
    });

    it('should call loginUser with payload', () => {
      expect(api.loginUser.calledWith(loginFormPayload)).toBe(true);
    });

    it('should call loginUserSuccess on success response', () => {
      expect(loginUserSuccess.calledWith(mockUser)).toBe(true);
    });

    it('should store user', () => {
      expect(storage.setItem.calledWith('user', mockUser)).toBe(true);
    });

    it('should call push', () => {
      expect(history.push.calledOnce).toBe(true);
    });

    it('should call push with default route', () => {
      expect(history.push.calledWith('/')).toBe(true);
    });

    it('should call push with predefined route', async () => {
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
      })(loginFormPayload);

      api.loginUser.returns(Promise.resolve(mockUser));

      await loginUser(dispatchMock);

      expect(history.push.calledWith('fromLocation')).toBe(true);
    });

    it('should call dispatchMock twice', () => {
      expect(dispatchMock.calledTwice).toBe(true);
    });
  });

  describe('error response', () => {
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
