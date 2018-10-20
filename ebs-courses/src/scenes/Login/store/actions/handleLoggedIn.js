import history from '../../../../services/history';

export const handleLoggedInCreator = ({ history }) => user => () => {
  if (user) {
    const { state: locationState = {} } = history.location;

    history.push(locationState.from || '/');
  }
};

export const handleLoggedIn = handleLoggedInCreator({ history });
