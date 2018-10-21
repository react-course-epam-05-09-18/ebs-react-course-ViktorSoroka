import * as coursesService from '../../services/coursesService';

export const DELETE_SUCCESS = '[Courses] Deleting Success';
export const DELETE_FAIL = '[Courses] Deleting Fail';

export const deleteCourseSuccess = payload => {
  return {
    type: DELETE_SUCCESS,
    payload,
  };
};

export const deleteCourseFail = payload => {
  return {
    type: DELETE_FAIL,
    payload,
  };
};

export const deleteCourseCreator = ({
  api,
  deleteCourseSuccess,
  deleteCourseFail,
}) => id => dispatch => {
  return api
    .deleteCourse(id)
    .then(() => {
      dispatch(deleteCourseSuccess(id));

      return true;
    })
    .catch(e => dispatch(deleteCourseFail(e.message)));
};

export const deleteCourse = deleteCourseCreator({
  api: coursesService,
  deleteCourseSuccess,
  deleteCourseFail,
});
