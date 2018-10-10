import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Redirect, Route, Switch } from 'react-router-dom';

import history from '../../services/history';
import { PrivateRoute } from '../../components';
import { getUser, logoutUser } from '../Login';
import { Login, Courses, Course } from '../';
import { Header, Footer } from './components';

import './styles.css';

export class AppComponent extends Component {
  render() {
    const { user, logoutUser } = this.props;

    return (
      <Router history={history}>
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
)(AppComponent);
