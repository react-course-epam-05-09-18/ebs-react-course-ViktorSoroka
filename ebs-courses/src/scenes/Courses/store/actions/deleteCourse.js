export const DELETE_FAIL = '[Courses] Deleting Fail';
export const DELETE_SUCCESS = '[Courses] Deleting Success';

export const deleteCourse = id => dispatch => {
  return fetch(`/courses/${id}`, {
    method: 'delete',
  })
    .then(response => {
      if (!response.ok) {
        const msg = 'Network issues. Try later.';

        throw Error(msg);
      }

      return response;
    })
    .then(() => {
      dispatch(deleteCoursesSuccess(id));

      return true;
    })
    .catch(e => dispatch(deleteCoursesFail(e.message)));
};

export const deleteCoursesSuccess = payload => {
  return {
    type: DELETE_SUCCESS,
    payload,
  };
};

export const deleteCoursesFail = payload => {
  return {
    type: DELETE_FAIL,
    payload,
  };
};
