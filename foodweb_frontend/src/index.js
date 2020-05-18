import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import Home from './Home';
import Login from './Login';

import AddRecipe from './AddRecipe';

import RegisterAccount from './RegisterAccount';
import App from './App';
import Recipe from './Recipe';
import SideBar from './SideBar';

import ChatBox from './ChatBox';
import Block from './Block';
import EditProfile from './EditProfile';
import Following from './Following';
import Profile from './Profile';

ReactDOM.render(


  <Router>
    {/* <Home/> */}
    <Switch>
      <Route path= "/" exact component={App}/>      
      <Route path="/Login" component={Login}/>
      <Route path="/Home" component={Home}/>
      <Route path="/RegisterAccount" component={RegisterAccount}/>
      <Route path="/AddRecipe" component={AddRecipe}/>
      <Route path="/Recipe/:id" component={Recipe}/> 
      <Route path="/ChatBox" component={ChatBox}/>
    </Switch>

  </Router>, document.getElementById('root')

);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
