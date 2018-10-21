import * as selectors from './login';

const state = {
  auth: {
    user: {},
    loading: false,
    error: 'error',
  },
};

describe('getAuth', () => {
  it('should return auth', () => {
    expect(selectors.getAuth(state)).toEqual(state.auth);
  });
});

describe('getUser', () => {
  it('should return auth user', () => {
    expect(selectors.getUser(state)).toEqual(state.auth.user);
  });
});

describe('getAuthLoading', () => {
  it('should return auth loading', () => {
    expect(selectors.getAuthLoading(state)).toEqual(state.auth.loading);
  });
});

describe('getAuthError', () => {
  it('should return auth error', () => {
    expect(selectors.getAuthError(state)).toEqual(state.auth.error);
  });
});
