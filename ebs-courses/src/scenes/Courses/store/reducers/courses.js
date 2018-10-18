import {
  FETCH_FAIL,
  FETCH_IN_PROGRESS,
  FETCH_SUCCESS,
  DELETE_SUCCESS,
} from '../actions';

const initialState = {
  entries: {},
  loading: false,
  loaded: false,
  error: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IN_PROGRESS: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }

    case FETCH_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        entries: action.payload,
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case DELETE_SUCCESS: {
      const { [action.payload]: entryToDelete, ...rest } = state.entries;

      return {
        ...state,
        entries: rest,
        loading: false,
        error: '',
      };
    }
  }

  return state;
}
