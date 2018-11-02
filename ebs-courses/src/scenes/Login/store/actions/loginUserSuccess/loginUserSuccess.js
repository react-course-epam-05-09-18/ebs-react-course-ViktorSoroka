export const LOGIN_SUCCESS = '[Login] Login Success';

export const loginUserSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};
