import { goTo } from '../../../../actions';

export const searchCourses = payload => dispatch => {
  dispatch(
    goTo({
      method: 'push',
      args: {
        pathname: '/courses',
        search: `?search=${payload}`,
      },
    })
  );
};
