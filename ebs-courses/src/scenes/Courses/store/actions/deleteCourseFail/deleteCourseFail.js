export const DELETE_FAIL = '[Courses] Deleting Fail';

export const deleteCourseFail = payload => {
  return {
    type: DELETE_FAIL,
    payload,
  };
};
