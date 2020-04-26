import React from 'react';
//import ReactDom from 'react-dom';
import '../../App.css';
// import Logo from '../../logo.svg';
import recipeCard from './addRecipe.jpg';
function addRecipe() {
  return ( 
    <div className = "addRecipe">
        <h2>This is addRecipe Page</h2>
        {/* <img src={Logo} /> */}
        <img src={recipeCard} />
    </div>
  );
}

export default addRecipe;