export const UPDATE_FAIL = '[Course] Update Fail';

export const updateCourseFail = payload => {
  return {
    type: UPDATE_FAIL,
    payload,
  };
};
