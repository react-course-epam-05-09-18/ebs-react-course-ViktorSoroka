import {
  LOGIN_FAIL,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions';
import * as storage from '../../../../services/storage';

export const reducerCreator = ({ storage }) => {
  const user = storage.getItem('user');

  const initialState = {
    user,
    loading: false,
    error: '',
  };

  return (state = initialState, action) => {
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
          user: null,
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
  };
};

export const reducer = reducerCreator({ storage });
