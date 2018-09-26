import * as fromLogin from './login';

export const reducers = {
  auth: fromLogin.reducer,
};

export * from './login';
