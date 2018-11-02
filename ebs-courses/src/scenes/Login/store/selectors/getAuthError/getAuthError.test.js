import { getAuthError } from './getAuthError';

const state = {
  auth: {
    user: {},
    loading: false,
    error: 'error',
  },
};

describe('getAuthError', () => {
  it('should return auth error', () => {
    expect(getAuthError(state)).toEqual(state.auth.error);
  });
});
