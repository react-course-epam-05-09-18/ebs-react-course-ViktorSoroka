import {
  LOGIN_FAIL,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions';

import { getUserFromStorage } from '../../../../services';

const user = getUserFromStorage();

const initialState = {
  user: user,
  loading: false,
  error: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_IN_PROGRESS: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }

    case LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        error: '',
        loading: false,
      };
    }

    case LOGOUT: {
      return {
        ...initialState,
        user: null,
      };
    }
  }

  return state;
}
