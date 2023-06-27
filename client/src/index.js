import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/';
import App from './components/App.js'

ReactDOM.render(
  <Router>
    <switch>
    <Route>
    <App/>
    </Route>
    </switch>
  </Router>,
  document.getElementById('root')
);