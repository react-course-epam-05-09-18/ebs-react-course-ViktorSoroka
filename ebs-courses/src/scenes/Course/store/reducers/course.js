import { UPDATE_FAIL, UPDATE_IN_PROGRESS, UPDATE_SUCCESS } from '../actions';

const initialState = {
  loading: false,
  error: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IN_PROGRESS: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }

    case UPDATE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }
  }

  return state;
}
