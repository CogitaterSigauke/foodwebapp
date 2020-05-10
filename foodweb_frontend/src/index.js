import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import Home from './Components/Home';

import Login from './Components/ProfileComponents/Login';

import AddRecipe from './Components/RecipeComponents/AddRecipe';
import Profile from './Components/ProfileComponents/Profile';
import RegisterAccount from './Components/ProfileComponents/RegisterAccount';
import App from './App';

ReactDOM.render(

  <Router>
    
    <Switch>
      <Route path= "/" exact component={App}/>
      <Route path="/Components/ProfileComponents/Login" component={Login} />
      <Route path="/Components/Home" component={Home}/>
      <Route path="/Components/ProfileComponents/RegisterAccount" component={RegisterAccount}/>
      <Route path="/Components/ProfileComponents/AddRecipe" component={AddRecipe}/>

    </Switch>
  </Router>, document.getElementById('root')
    
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 {/* <Route path="/Components/Home" component={Home} />
      <Route path="/Components/ProfileComponents/Login" component={Login} />
      <Route path="/Components/ProfileComponents/SignUp" component={SignUp} />
      <Route path="/Components/ProfileComponents/Profile" component={Profile} />
      <Route path="/Components/RecipeComponents/addRecipe" component={addRecipe} />
        */}