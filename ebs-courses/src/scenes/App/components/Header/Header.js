import React from 'react';
import PropTypes from 'prop-types';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';

export const Header = ({ user, logout }) => {
  return (
    <Navbar className="ebs-header">
      <Navbar.Brand>
        <Link to={'/'}>Courses app</Link>
      </Navbar.Brand>
      {user && (
        <div className="ebs-header__user-info pull-right">
          <p>Signed in as: {user.username}</p>
          <p>
            <Button bsStyle="link" onClick={logout}>
              Logout
            </Button>
          </p>
        </div>
      )}
    </Navbar>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  logout: PropTypes.func.isRequired,
};
