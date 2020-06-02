import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import Home from './Home';
import Login from './Login';
import ChatBox from './ChatBox';
import AddRecipe from './AddRecipe';
import Profile from './Profile';
import RegisterAccount from './RegisterAccount';
import Block from './Block';
import EditProfile from './EditProfile';
import Recipe from './Recipe';

import MyRecipes from './MyRecipes';
import MyRecipeDetail from './MyRecipeDetail';
import history from './History';

// import Profile from './Components/ProfileComponents/Profile';
import App from './App';

ReactDOM.render(

  <Router history={history}>

    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/Login" component={Login} />
      <Route path="/Recipe/:id" component={Recipe} />
      <Route path="/Home/:id" component={Home} />
      <Route path="/Home" component={Home} />
      <Route path="/RegisterAccount" component={RegisterAccount} />
      <Route path="/AddRecipe" component={AddRecipe} />

      {/* <Route path="/Block" component={Block} /> */}
      {/* <Route path="/EditProfile" component={EditProfile} /> */}
      <Route path="/Profile" component={Profile} />
      <Route path="/ChatBox" component={ChatBox}/>
      <Route path="/MyRecipes" component={MyRecipes}/>
      {/* <Route path="/MyRecipeDetail/:id" component={MyRecipeDetail}/> */}
     


    </Switch>

  </Router>, document.getElementById('root')

);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
