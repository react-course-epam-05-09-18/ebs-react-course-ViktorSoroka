import { getAuth } from './getAuth';

const state = {
  auth: {
    user: {},
    loading: false,
    error: 'error',
  },
};

describe('getAuth', () => {
  it('should return auth', () => {
    expect(getAuth(state)).toEqual(state.auth);
  });
});
