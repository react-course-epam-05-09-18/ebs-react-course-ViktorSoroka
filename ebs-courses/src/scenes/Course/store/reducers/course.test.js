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

  it('should return state for update course in progress', () => {
    expect(reducer(state, updateCourseInProgress())).toMatchObject({
      loading: true,
      error: '',
    });
  });

  it('should return state for update course failure', () => {
    expect(reducer(state, updateCourseFail('Error message'))).toMatchObject({
      loading: false,
      error: 'Error message',
    });
  });

  it('should return state for update course success', () => {
    expect(reducer(undefined, updateCourseSuccess())).toMatchObject({
      loading: false,
      error: '',
    });
  });
});
