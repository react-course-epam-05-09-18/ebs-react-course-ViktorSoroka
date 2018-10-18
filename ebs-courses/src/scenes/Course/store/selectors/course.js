export const getSelectedCourse = ({ courses }, id) => id && courses.entries[id];
export const getCourseLoading = ({ course }) => course.loading;
export const getCourseError = ({ course }) => course.error;
