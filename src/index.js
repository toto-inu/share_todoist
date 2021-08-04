import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";

import { InMemoryCache, ApolloProvider, ApolloClient, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import * as serviceWorker from './serviceWorker';

import "~/styles/reset.scss"
import "~/styles/foundation.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './app/store';
import { App } from '~/pages/App/index';
import { Top } from '~/pages/Top/index';
import { ProtectedRoute } from "./ProtectedRoute";


const httpLink = new HttpLink({
  uri: 'https://totoinu-todoist.herokuapp.com/v1/graphql'
})
const wsLink = new WebSocketLink({
  uri: 'wss://totoinu-todoist.herokuapp.com/v1/graphql',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    {/* Apollo Client */}
    <ApolloProvider client={client}>
      {/* Redux Store */}
      <Provider store={store}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
        >
          {/* Routing */}
          <Router>
            <Switch>
              <Route exact path="/" component={Top} />
              <ProtectedRoute path="/app" component={App} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </Auth0Provider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
