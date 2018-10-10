import history from '../../../../services/history';

export const LOGIN_IN_PROGRESS = '[Login] Login is in progress';
export const LOGIN_FAIL = '[Login] Login Fail';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGOUT = '[Logout] Logout';

export const loginUser = payload => dispatch => {
  dispatch(loginInProgress());

  return fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (!response.ok) {
        const msg =
          response.status === 401
            ? 'Invalid login or password.'
            : 'Network issues. Try later.';

        throw Error(msg);
      }

      return response.json();
    })
    .then(user => {
      dispatch(loginUserSuccess(user));
      localStorage.setItem('user', JSON.stringify(user));

      const { state: locationState = {} } = history.location;

      history.push(locationState.from || '/');

      return true;
    })
    .catch(e => {
      dispatch(loginUserFail(e.message));

      return false;
    });
};

export const handleAlreadyAuth = user => () => {
  if (user) {
    const { state: locationState = {} } = history.location;

    history.push(locationState.from || '/');
  }
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('user');
};

export const loginInProgress = () => {
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
