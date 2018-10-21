import history from '../../../../services/history';

export const searchCoursesCreator = ({ history }) => payload => () => {
  history.push({
    pathname: '/courses',
    search: `?search=${payload}`,
  });
};

export const searchCourses = searchCoursesCreator({ history });
