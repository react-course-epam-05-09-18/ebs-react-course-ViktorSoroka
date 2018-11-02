import { getUser } from './getUser';

const state = {
  auth: {
    user: {},
    loading: false,
    error: 'error',
  },
};

describe('getUser', () => {
  it('should return auth user', () => {
    expect(getUser(state)).toEqual(state.auth.user);
  });
});
