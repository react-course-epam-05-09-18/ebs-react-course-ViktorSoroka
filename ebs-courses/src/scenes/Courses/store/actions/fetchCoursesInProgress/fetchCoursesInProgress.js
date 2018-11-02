export const FETCH_IN_PROGRESS = '[Courses] Fetching';

export const fetchCoursesInProgress = () => {
  return {
    type: FETCH_IN_PROGRESS,
  };
};
