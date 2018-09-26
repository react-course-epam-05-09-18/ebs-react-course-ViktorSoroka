import { createSelector } from 'reselect';

import { FETCH_FAIL, FETCH_IN_PROGRESS, FETCH_SUCCESS } from '../actions';

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
  }

  return state;
}

export const getCoursesEntries = ({ courses }) => courses.entries;
export const getCourses = createSelector(getCoursesEntries, entities => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getCoursesLoading = ({ courses }) => courses.loading;
export const getCoursesError = ({ courses }) => courses.error;
