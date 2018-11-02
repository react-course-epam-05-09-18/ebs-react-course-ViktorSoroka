import { validateFormattedDate } from './date';

export const checkRequired = (key, value) => {
  return !value ? `Please enter the ${key}` : '';
};

export const maxLength = len => (key, value) => {
  return value.length > len ? `${key} length should be less then ${len}` : '';
};

export const validatedDate = (key, value) => {
  return !validateFormattedDate(value) ? `${key} should be valid Date` : '';
};
