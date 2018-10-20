import { getItem } from './storage';

export const isAuthenticated = () => {
  return getItem('user') !== null;
};
