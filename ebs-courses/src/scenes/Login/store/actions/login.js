import * as storage from '../../../../services/storage';

export const LOGIN_IN_PROGRESS = '[Login] Login is in progress';
export const LOGIN_FAIL = '[Login] Login Fail';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGOUT = '[Logout] Logout';

export const logoutUserCreator = ({ storage }) => () => dispatch => {
  dispatch({ type: LOGOUT });
  storage.removeItem('user');
};

export const logoutUser = logoutUserCreator({ storage });

export const loginUserInProgress = () => {
  return {
    type: LOGIN_IN_PROGRESS,
  };
};

export const loginUserSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const loginUserFail = payload => {
  return {
    type: LOGIN_FAIL,
    payload,
  };
};
