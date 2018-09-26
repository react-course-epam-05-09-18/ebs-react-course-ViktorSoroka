export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const isAuthenticated = () => {
  return getUserFromStorage() !== null;
};
