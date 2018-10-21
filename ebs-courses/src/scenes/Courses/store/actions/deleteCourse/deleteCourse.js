import * as coursesService from '../../../services/coursesService';
import { deleteCourseSuccess } from '../deleteCourseSuccess';
import { deleteCourseFail } from '../deleteCourseFail';

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
