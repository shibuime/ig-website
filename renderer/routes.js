import React from 'react';
import MainPage from './containers/MainPage.jsx';
import App from './App';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Button from './components/button/button';




export default <Router history={hashHistory}>
  <Route path='/' component={App}>
    <Route component={MainPage}>
      <IndexRoute component={Button}/>
    </Route>
  </Route>
</Router>;