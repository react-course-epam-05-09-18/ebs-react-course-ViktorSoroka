import history from '../../../../services/history';
import * as storage from '../../../../services/storage';
import * as loginService from '../../services/loginService';
import { loginUserInProgress, loginUserFail, loginUserSuccess } from './login';

export const loginUserCreator = ({
  loginUserFail,
  loginUserSuccess,
  loginInProgress,
  api,
  storage,
  history,
}) => payload => dispatch => {
  dispatch(loginInProgress());

  api
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
  loginInProgress: loginUserInProgress,
  api: loginService,
  storage,
  history,
});
