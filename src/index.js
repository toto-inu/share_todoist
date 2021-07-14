import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import "~/styles/reset.scss"
import "~/styles/foundation.scss"

import { store } from './app/store';
import { App } from '~/pages/App/index';

ReactDOM.render(
  <React.StrictMode>
    {/* Redux Store */}
    <Provider store={store}>
      {/* Routing */}
      <Router>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
