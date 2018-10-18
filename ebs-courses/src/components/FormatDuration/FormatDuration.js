import React from 'react';
import PropTypes from 'prop-types';

const pluralize = (type, value) => {
  if (value === 0) return null;

  return `${value} ${type}${value > 1 ? 's' : ''}`;
};

const FormatDuration = ({ duration, children }) => {
  const durationNumber = parseInt(duration);

  if ((!durationNumber && durationNumber <= 0) || isNaN(durationNumber))
    return children({ formattedDuration: null });

  const hours = Math.floor(durationNumber / 60);
  const minutes = durationNumber - hours * 60;

  const hoursStr = pluralize('hour', hours);
  const minutesStr = pluralize('minute', minutes);
  const formattedDuration = [hoursStr, minutesStr].filter(val => val).join(' ');

  return children({ formattedDuration });
};

FormatDuration.propTypes = {
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export { FormatDuration };
