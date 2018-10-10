import { createSelector } from 'reselect';

export const getCoursesEntries = ({ courses }) => courses.entries;
export const getCourses = createSelector(getCoursesEntries, entities => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getCoursesLoading = ({ courses }) => courses.loading;
export const getCoursesError = ({ courses }) => courses.error;
