// // import React from 'react';
// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">

import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';

import { Link } from 'react-router-dom'

// apiKey=""
//                 appId=""

const searchClient = algoliasearch(
  '2RJQDQ5U0W',
  '2c9dd00a80a65a207001e057e93e81e5'
);

const Hit = ({hit}) => 
  <div className="hit">
    <div>
      ${hit.name}
    </div>
    <div>
      ${hit.familyName}
    </div>
    <div>
      ${hit.userNname}
    </div>
  </div>

const Sidebar = () => 

  <div>

  </div>

const UserContent = () => 

  <div>
      <Hits hitComponent={Hit}/>
  </div>

const RecipeContent = () =>
 <div>
   <div className="row">
   <Hits hitComponent={RecipeHit}/>
   </div>
   
 </div>


const RecipeHit = ({hit}) => 
  
  <div>
    {/* card one */}

    <div className="hit col-lg-4 col-md-6 mb-4">
      <div className="card border-0 shadow">
          <img src={hit.imageString} className="card-img-top" alt="..."/>
          <div className="card-body text-center">
              <h4 className="card-title">
                <a href="#">${hit.mealType}</a>
              </h4>
              <h6><a className="fas fa-user" href="#">${hit.userName}</a></h6>
              <p className="card-text">${hit.objectID}</p>
          </div>
          <div className="card-footer">
              <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
          </div>
        </div>
      </div>
  </div>


class App extends Component{
  
  
  render() {

  return (

    <InstantSearch
    searchClient={searchClient}
    indexName="recipes"
    >
    <div className="App">
     

     {/* fas fa-blender, 	fas fa-cocktail, fas fa-coffee, 	fas fa-cookie-bite , fas fa-glass-cheers*/}
    <div id="wrapper">

    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-blender"></i>
        </div>
        <div className="sidebar-brand-text mx-3">My Recipes <sup><i className="fas fa-laugh-wink"></i></sup></div>
      </a>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Recipe Cards</span></a>
      </li>

      <hr className="sidebar-divider"/>

      <div className="sidebar-heading">
        Menu
      </div>

      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-coffee"></i>
          <span>Drinks</span>
        </a>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Drinks Menu</h6>
            <a className="collapse-item" href="buttons.html">Cocktail</a>
            <a className="collapse-item" href="cards.html">Hot Drinks</a>
            <a className="collapse-item" href="cards.html">Smoothies</a>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i className="fas fa-cookie-bite"></i>
          <span>Deserts</span>
        </a>
        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Sweet's Menu</h6>
            <a className="collapse-item" href="utilities-color.html">Ice Creams</a>
            <a className="collapse-item" href="utilities-border.html">Cakes</a>
            <a className="collapse-item" href="utilities-animation.html">Cookies</a>
            <a className="collapse-item" href="utilities-animation.html">Fruits</a>
            
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i className="fas fa-globe"></i>
          <span>World Cuisine</span>
        </a>
        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Countries</h6>
            <a className="collapse-item" href="utilities-color.html">Ethiopian</a>
            <a className="collapse-item" href="utilities-border.html">Indian</a>
            <a className="collapse-item" href="utilities-animation.html">Chinese</a>
            <a className="collapse-item" href="utilities-animation.html">Italian</a>
            <a className="collapse-item" href="utilities-animation.html">Mexican</a>
            <a className="collapse-item" href="utilities-animation.html">American</a>
            
          </div>
        </div>
      </li>

      {/* <hr className="sidebar-divider"/>

      <div className="sidebar-heading">
        Main Dish
      </div> */}

      <li className="nav-item active">
        <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fas fa-blender"></i>
          <span>Meals</span>
        </a>
        <div id="collapsePages" className="collapse show" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Main Dishes</h6>
            <a className="collapse-item active" href="login.html">Breakfast</a>
            <a className="collapse-item active" href="register.html">Lunch</a>
            <a className="collapse-item active" href="forgot-password.html">Dinner</a>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Side Dishes</h6>
            <a className="collapse-item active" href="404.html">Vegetable</a>
            <a className="collapse-item active" href="blank.html">Grain</a>
            <a className="collapse-item active" href="blank.html">Seasonal</a>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-hand-holding-heart"></i>
          <span>Dite And Health</span></a>
      </li>

     

      <hr className="sidebar-divider d-none d-md-block"/>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>

    <div id="content-wrapper" className="d-flex flex-column">

      <div id="content">

        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>
        {/* Search Bar */}
          {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form> */}
          {/* nav bar  */}


                <header>
                  <div className="input-group">
                  < SearchBox translations={{placeholder: 'Search for Recipes'}}/>
                  </div>
                </header>

          

         

         

          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown no-arrow d-sm-none">
              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-search fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
          
                 {/* Register Button */}
            {/* <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i>
                
              </a>
             
            </li> */}

            

            <div className="topbar-divider d-none d-sm-block"></div>
            <Link  to="/Components/ProfileComponents/Login">
              <li>Log In</li>
              {/* <li className="nav-item dropdown no-arrow mx-1" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">Log In</span>
                  <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                </a>
              
              </li> */}
            </Link>
            

          </ul>

        </nav>



        <div className="container-fluid">
          <div className="container">

            {/* TEST InstantSearch */}

            
            

                <main>
                  
                  <RecipeContent/>
                  
                </main>
            

            {/* END InstantSearch */}


              <div className="row">
                {/* card one */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card border-0 shadow">
                    <img src="http://placehold.it/500x350" className="card-img-top" alt="..."/>
                    <div className="card-body text-center">
                      <h4 className="card-title">
                          <a href="#">Item One</a>
                      </h4>
                      <h6><a className="fas fa-user" href="#">Contact Owner</a></h6>
                      <p className="card-text">Cogi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                    </div>
                    
                    <div className="card-footer">
                        <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                    </div>
                  </div>
                </div>




              </div>
            </div>   
           {/* <h1 className= "-4 text-gray-800">Blank Page</h1> */}

        </div>

      </div>

      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>

    </div>

  </div>





    </div>

    </InstantSearch>
  );
  }
}




export default App;
// //         <img src={logo} className="App-logo" alt="logo" />



// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// import React from 'react';
// import { render } from '@testing-library/react';
// import axios from 'axios';
// import App from './App';
// axios.defaults.baseURL = 'https://my-recipe-web-app-foodweb.azuremicroservices.io/app';


// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });