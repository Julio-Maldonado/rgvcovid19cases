import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from "react-router-dom";

import Routes from './components/Routes';
import history from './utils/history';
import MyNavBar from './components/MyNavBar';

import ReactGA from 'react-ga';

import * as serviceWorker from './serviceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';

ReactDOM.render(
  <Router history={history}>
    <MyNavBar />
    <Routes />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
