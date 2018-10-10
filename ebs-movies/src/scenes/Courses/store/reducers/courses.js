import {
  FETCH_FAIL,
  FETCH_IN_PROGRESS,
  FETCH_SUCCESS,
  DELETE_SUCCESS,
} from '../actions';

const initialState = {
  entries: {},
  loading: false,
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
        error: action.payload,
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        entries: action.payload,
        error: '',
        loading: false,
      };
    }

    case DELETE_SUCCESS: {
      const { [action.payload]: entryToDelete, ...rest } = state.entries;

      return {
        ...state,
        entries: rest,
        error: '',
        loading: false,
      };
    }
  }

  return state;
}
