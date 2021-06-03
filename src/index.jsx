import ReactDom from 'react-dom';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import SignUp from './SignUp';
import AccountVerification from './AccountVerification';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const Index = (
  <Router history={history}>
    <Route path='/sign-up' component={SignUp} />
    <Route
      path='/account-verification/:token'
      component={AccountVerification}
    />
  </Router>
);

ReactDom.render(Index, document.getElementById('root'));
document.getElementById('root');
