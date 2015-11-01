import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, Link, History } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
, document.getElementById('root'));