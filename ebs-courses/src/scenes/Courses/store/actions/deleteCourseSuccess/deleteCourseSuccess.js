export const DELETE_SUCCESS = '[Courses] Deleting Success';

export const deleteCourseSuccess = payload => {
  return {
    type: DELETE_SUCCESS,
    payload,
  };
};
