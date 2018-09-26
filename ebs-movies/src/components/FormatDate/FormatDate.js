import React from 'react';
import PropTypes from 'prop-types';

const FormatDate = ({ date }) => {
  if (!date) return null;

  return <span>{new Date(date).toLocaleDateString()}</span>;
};

FormatDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export { FormatDate };
