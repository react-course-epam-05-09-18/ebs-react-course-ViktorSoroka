import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../services';

export const FormatDate = ({ date }) => {
  if (!date) return null;

  return <span>{formatDate(date)}</span>;
};

FormatDate.propTypes = {
  date: PropTypes.string.isRequired,
};
