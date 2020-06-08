import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import Login from './Login';
import ChatBox from './ChatBox';
import AddRecipe from './AddRecipe';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Recipe from './Recipe';
import history from './History';
import App from './App';
import EditRecipe from './EditRecipe';


ReactDOM.render(

  <Router history={history}>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/Login" component={Login}/>
      <Route path="/Recipe" component={Recipe} />
      <Route path="/Home" component={Home} />
      <Route path="/AddRecipe" component={AddRecipe} />
      <Route path="/Profile" component={Profile} />
      <Route path="/ChatBox" component={ChatBox}/>
      <Route path="/EditRecipe" component={EditRecipe}/>
    </Switch>
  </Router>, document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
