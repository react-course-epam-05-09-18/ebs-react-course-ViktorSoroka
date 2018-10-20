import history from '../../../../services/history';

export const searchCourses = payload => () => {
  history.push({
    pathname: '/courses',
    search: `?search=${payload}`,
  });
};
