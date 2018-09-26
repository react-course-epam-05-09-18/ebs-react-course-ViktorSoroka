import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { App } from './scenes';
import * as fromLogin from './scenes/Login';
import * as fromCourses from './scenes/Courses';

import './index.css';

const reducers = combineReducers({
  ...fromLogin.reducers,
  ...fromCourses.reducers,
});

const middleware = [thunk];
const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
