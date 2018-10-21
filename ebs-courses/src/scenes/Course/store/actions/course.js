export const UPDATE_IN_PROGRESS = '[Course] Updating';
export const UPDATE_FAIL = '[Course] Update Fail';
export const UPDATE_SUCCESS = '[Course] Update Success';

export const updateCourseInProgress = () => {
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
