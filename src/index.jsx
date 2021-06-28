import ReactDom from 'react-dom';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignUp from './SignUp';
import AccountVerification from './AccountVerification';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const Index = (
  <ApolloProvider client={client}>
  <BrowserRouter history={history}>
    <Route path='/sign-up' component={SignUp} />
    <Route
      path='/account-verification/:token'
      component={AccountVerification}
    />
  </BrowserRouter>
  </ApolloProvider>
);

ReactDom.render(Index, document.getElementById('root'));
document.getElementById('root');
