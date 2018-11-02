import sinon from 'sinon';

import { reducerCreator } from './login';
import {
  loginUserInProgress,
  loginUserFail,
  loginUserSuccess,
  LOGOUT,
} from '../actions';

const state = {
  user: {},
  loading: false,
  error: 'Error',
};

const mockUser = {
  username: 'john_doe',
};

describe('login reducer', () => {
  let reducer;

  const storage = {
    getItem: sinon.stub(),
  };

  describe('when user is not logged in', () => {
    beforeEach(() => {
      storage.getItem.withArgs('user').returns(null);

      reducer = reducerCreator({ storage });
    });

    afterEach(() => {
      storage.getItem.resetHistory();
    });

    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        user: null,
        loading: false,
        error: '',
      });
    });

    it('should return state for login in progress', () => {
      expect(reducer(state, loginUserInProgress())).toMatchObject({
        loading: true,
        error: '',
      });
    });

    it('should return state for login failure', () => {
      expect(reducer(state, loginUserFail('Error message'))).toMatchObject({
        user: null,
        loading: false,
        error: 'Error message',
      });
    });

    it('should return state for login success', () => {
      expect(reducer(state, loginUserSuccess(mockUser))).toMatchObject({
        user: mockUser,
        loading: false,
        error: '',
      });
    });

    it('should return state for logout', () => {
      expect(reducer(state, { type: LOGOUT })).toMatchObject({
        user: null,
        loading: false,
        error: '',
      });
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      storage.getItem.withArgs('user').returns(mockUser);

      reducer = reducerCreator({ storage });
    });

    afterEach(() => {
      storage.getItem.resetHistory();
    });

    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        user: mockUser,
        loading: false,
        error: '',
      });
    });
  });
});
