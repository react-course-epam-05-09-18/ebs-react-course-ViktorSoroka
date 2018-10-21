import { reducer } from './course';
import {
  updateCourseInProgress,
  updateCourseFail,
  updateCourseSuccess,
} from '../actions';

const state = {
  loading: false,
  error: 'Error',
};

describe('course reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: '',
    });
  });

  it('should return UPDATE_IN_PROGRESS state', () => {
    expect(reducer(state, updateCourseInProgress())).toEqual({
      ...state,
      loading: true,
      error: '',
    });
  });

  it('should return UPDATE_FAIL state', () => {
    expect(reducer(state, updateCourseFail('Error message'))).toEqual({
      ...state,
      loading: false,
      error: 'Error message',
    });
  });

  it('should return UPDATE_SUCCESS state', () => {
    expect(reducer(undefined, updateCourseSuccess())).toEqual({
      ...state,
      loading: false,
      error: '',
    });
  });
});
