import * as storage from '../../../../../services/storage';

export const LOGOUT = '[Logout] Logout';

export const logoutUserCreator = ({ storage }) => () => dispatch => {
  dispatch({ type: LOGOUT });
  storage.removeItem('user');
};

export const logoutUser = logoutUserCreator({ storage });
