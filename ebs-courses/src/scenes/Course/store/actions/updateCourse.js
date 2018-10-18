import history from '../../../../services/history';

export const UPDATE_IN_PROGRESS = '[Course] Updating';
export const UPDATE_FAIL = '[Course] Update Fail';
export const UPDATE_SUCCESS = '[Course] Update Success';

export const updateCourse = payload => dispatch => {
  dispatch(updatingCourseInProgress());

  return fetch(`/courses`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (!response.ok) {
        const msg = 'Network issues. Try later.';

        throw Error(msg);
      }

      return response;
    })
    .then(() => {
      dispatch(updateCourseSuccess());

      history.push('/courses');
    })
    .catch(e => dispatch(updateCourseFail(e.message)));
};

export const updatingCourseInProgress = () => {
  return {
    type: UPDATE_IN_PROGRESS,
  };
};

export const updateCourseSuccess = () => {
  return {
    type: UPDATE_SUCCESS,
  };
};

export const updateCourseFail = payload => {
  return {
    type: UPDATE_FAIL,
    payload,
  };
};
