import dayjs from 'dayjs';

export const formatDate = date => dayjs(date).format('DD/MM/YYYY');
export const validateDate = date => dayjs(date).isValid();
export const convertFromFormatToDate = dateStr => {
  const [dd, mm, yy] = dateStr.split('/');

  return new Date(yy, mm, dd);
};

export const validateFormattedDate = dateStr => {
  const dateRegex = /^\d?\d\/\d\d?\/\d\d\d\d$/;

  return (
    dateRegex.test(dateStr) && validateDate(convertFromFormatToDate(dateStr))
  );
};
