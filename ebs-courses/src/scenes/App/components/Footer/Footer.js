import React from 'react';

import './styles.css';

const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const Footer = () => {
  return (
    <footer className="ebs-footer">
      <div className="container">
        <span>© Company {getCurrentYear()}</span>
      </div>
    </footer>
  );
};
