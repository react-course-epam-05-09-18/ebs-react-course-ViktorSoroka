import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { Header, Footer } from './components';
import { Login, Courses, Course } from '../';
import { getUser, logoutUser } from '../Login';
import { PrivateRoute } from '../../components';

import './styles.css';

export class _App extends Component {
  render() {
    const { user, logoutUser } = this.props;

    return (
      <Router>
        <div className="ebs-app">
          <Header user={user} logout={logoutUser} />
          <main className="ebs-main">
            <div className="container">
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/courses/new" component={Course} />
                <PrivateRoute path="/courses/:id" component={Course} />
                <PrivateRoute path="/courses" component={Courses} />
                <Redirect to="/courses" />
              </Switch>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = {
  logoutUser,
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(_App);
