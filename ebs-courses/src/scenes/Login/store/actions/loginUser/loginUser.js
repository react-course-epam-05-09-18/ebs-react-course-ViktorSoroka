import history from '../../../../../services/history';
import * as storage from '../../../../../services/storage';
import * as loginService from '../../../services/loginService';
import { loginUserFail } from '../loginUserFail';
import { loginUserSuccess } from '../loginUserSuccess';
import { loginUserInProgress } from '../loginUserInProgress';

export const loginUserCreator = ({
  loginUserFail,
  loginUserSuccess,
  loginUserInProgress,
  api,
  storage,
  history,
}) => payload => dispatch => {
  dispatch(loginUserInProgress());

  return api
    .loginUser(payload)
    .then(user => {
      dispatch(loginUserSuccess(user));
      storage.setItem('user', user);

      const { state: locationState = {} } = history.location;

      history.push(locationState.from || '/');
    })
    .catch(e => dispatch(loginUserFail(e.message)));
};

export const loginUser = loginUserCreator({
  loginUserFail,
  loginUserSuccess,
  loginUserInProgress,
  api: loginService,
  storage,
  history,
});
