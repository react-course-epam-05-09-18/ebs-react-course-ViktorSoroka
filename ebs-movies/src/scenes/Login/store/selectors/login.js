export const getAuth = ({ auth }) => auth;
export const getUser = ({ auth }) => auth.user;
export const getAuthLoading = ({ auth }) => auth.loading;
export const getAuthError = ({ auth }) => auth.error;
