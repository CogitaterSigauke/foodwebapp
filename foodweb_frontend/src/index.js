import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import Home from './Components/Home';

import Login from './Login';

import AddRecipe from './Components/RecipeComponents/AddRecipe';
import Recipe from './Components/RecipeComponents/Recipe';
import Profile from './Components/ProfileComponents/Profile';
import RegisterAccount from './Components/ProfileComponents/RegisterAccount';
import Signup2 from './Components/ProfileComponents/Signup2';
import App from './App';

ReactDOM.render(

  <Router>
    {/* <Signup2/> */}
    <Switch>
      <Route path= "/" exact component={App}/>
      <Route path="/Login" component={Login} /> 
      <Route path="/Components/Home" component={Home}/>
      <Route path="/Components/ProfileComponents/RegisterAccount" component={RegisterAccount}/>
      <Route path="/Components/RecipeComponents/AddRecipe" component={AddRecipe}/> 

    </Switch>
  </Router>, document.getElementById('root')
    
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
