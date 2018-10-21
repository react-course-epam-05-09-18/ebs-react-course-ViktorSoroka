import { getAuthLoading } from './getAuthLoading';

const state = {
  auth: {
    user: {},
    loading: false,
    error: 'error',
  },
};

describe('getAuthLoading', () => {
  it('should return auth loading', () => {
    expect(getAuthLoading(state)).toEqual(state.auth.loading);
  });
});
