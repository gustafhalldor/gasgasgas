import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Layout from './Components/layout/layout';
import Home from './Components/App';
import Stats from './Components/stats/stats';
import About from './Components/about/about';
import NotFound from './Components/wildcard/notFound.js';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="statistics" component={Stats}></Route>
      <Route path="about" component={About}></Route>
      <Route path="*" component={NotFound}></Route>
    </Route>
  </Router>,
  document.getElementById('app')
);
