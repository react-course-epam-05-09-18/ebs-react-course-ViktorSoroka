import {
  fetchCoursesInProgress,
  fetchCoursesSuccess,
  fetchCoursesFail,
  deleteCourseSuccess,
} from '../actions';
import { reducer } from './courses';

const initialState = {
  entries: {},
  loading: false,
  loaded: false,
  error: '',
};

describe('courses reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return state for fetch courses in progress', () => {
    expect(reducer(initialState, fetchCoursesInProgress())).toMatchObject({
      loading: true,
      error: '',
    });
  });

  it('should return state for fetch courses fail', () => {
    expect(
      reducer(initialState, fetchCoursesFail('Error message'))
    ).toMatchObject({
      loading: false,
      loaded: false,
      error: 'Error message',
    });
  });

  it('should return state for fetch courses success', () => {
    const entries = [{ id: 'uuid' }];
    const action = fetchCoursesSuccess(entries);

    expect(reducer(initialState, action)).toMatchObject({
      loading: false,
      loaded: true,
      error: '',
      entries: action.payload,
    });
  });

  it('should return state for course deletion success', () => {
    const entries = { uuid: { id: 'uuid' }, uuid1: { id: 'uuid1' } };
    const state = { ...initialState, entries };
    const action = deleteCourseSuccess('uuid');

    expect(reducer(state, action)).toMatchObject({
      loading: false,
      error: '',
      entries: { uuid1: { id: 'uuid1' } },
    });
  });
});
