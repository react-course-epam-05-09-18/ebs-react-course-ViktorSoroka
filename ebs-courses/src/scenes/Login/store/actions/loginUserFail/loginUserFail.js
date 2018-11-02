export const LOGIN_FAIL = '[Login] Login Fail';

export const loginUserFail = payload => {
  return {
    type: LOGIN_FAIL,
    payload,
  };
};
