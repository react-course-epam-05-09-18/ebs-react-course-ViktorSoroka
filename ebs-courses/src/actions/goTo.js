import history from '../services/history';

export const goTo = payload => () => {
  history[payload.method](payload.args);
};
