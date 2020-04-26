import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import Home from './Components/Home';
import Nav from './Components/Nav';
import Login from './Components/ProfileComponents/Login';
import SignUp from './Components/ProfileComponents/SignUp';
// import Profile from './Components/ProfileComponents/Profile';
ReactDOM.render(

  <Router>
      <Nav/>
      <Route path="/" exact component={Home} />
      <Route path="./Components/ProfileComponents/Login" exact component={Login} />
      <Route path="./Components/ProfileComponents/SignUp" exact component={SignUp} />
      {/* <Route path="./Components/ProfileComponents/Profile" component={Profile} /> */}
       
  </Router>, document.getElementById('root')
    
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();