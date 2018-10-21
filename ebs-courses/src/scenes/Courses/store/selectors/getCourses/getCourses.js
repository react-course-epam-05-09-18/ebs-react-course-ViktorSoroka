import { createSelector } from 'reselect';

import { getCoursesEntries } from '../getCoursesEntries';

export const getCourses = createSelector(getCoursesEntries, entities => {
  return Object.keys(entities).map(id => entities[id]);
});
