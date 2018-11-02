import sinon from 'sinon';

import { handleLoggedInCreator } from './handleLoggedIn';

describe('handleLoggedIn', () => {
  let handleLoggedIn;

  const mockUser = {
    username: 'john_doe',
  };

  const history = {
    location: { state: {} },
    push: sinon.stub(),
  };

  beforeEach(() => {
    handleLoggedIn = handleLoggedInCreator({
      history,
    });
  });

  afterEach(() => {
    history.push.resetHistory();
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      handleLoggedIn(mockUser)();
    });

    it('should redirect once', () => {
      expect(history.push.calledOnce).toBe(true);
    });

    it('should redirect to the home page', () => {
      expect(history.push.calledWith('/')).toBe(true);
    });
  });

  describe('when user is logged in with previous history state', () => {
    const history = {
      location: { state: { from: 'fromLocation' } },
      push: sinon.stub(),
    };

    beforeEach(() => {
      handleLoggedIn = handleLoggedInCreator({
        history,
      });

      handleLoggedIn(mockUser)();
    });

    afterEach(() => {
      history.push.resetHistory();
    });

    it('should redirect to the previous history state', () => {
      expect(history.push.calledWith('fromLocation')).toBe(true);
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      handleLoggedIn()();
    });

    it('should not redirect', () => {
      expect(history.push.notCalled).toBe(true);
    });
  });
});
