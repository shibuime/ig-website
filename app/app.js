import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import RootComponent from './components/root-component';
import Home from './components/home';
import About from './components/about';


class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={RootComponent}>
                    <IndexRoute component={Home} />
                    <Route path='/about' component={About} />
                </Route>
            </Router>
        )
    }
}


export default App