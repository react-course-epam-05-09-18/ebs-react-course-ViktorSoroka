import sinon from 'sinon';

import { handleLoggedInCreator } from './handleLoggedIn';

describe('handleLoggedIn', () => {
  let handleLoggedIn;

  const mockUser = {
    username: 'gohn_doe',
  };

  const history = {
    location: { state: {} },
    push: sinon.stub(),
  };

  beforeEach(async () => {
    handleLoggedIn = handleLoggedInCreator({
      history,
    });
  });

  afterEach(() => {
    history.push.resetHistory();
  });

  describe('user is logged in', () => {
    beforeEach(async () => {
      await handleLoggedIn(mockUser)();
    });

    it('should call push', () => {
      expect(history.push.calledOnce).toBe(true);
    });

    it('should call push with default location', () => {
      expect(history.push.calledWith('/')).toBe(true);
    });
  });

  describe('user is logged in with previous history state', () => {
    const history = {
      location: { state: { from: 'fromLocation' } },
      push: sinon.stub(),
    };

    beforeEach(async () => {
      handleLoggedIn = handleLoggedInCreator({
        history,
      });

      await handleLoggedIn(mockUser)();
    });

    afterEach(() => {
      history.push.resetHistory();
    });

    it('should call push with predefined location', () => {
      expect(history.push.calledWith('fromLocation')).toBe(true);
    });
  });

  describe('user is not logged in', () => {
    beforeEach(async () => {
      await handleLoggedIn()();
    });

    it('should not call push', () => {
      expect(history.push.notCalled).toBe(true);
    });
  });
});
