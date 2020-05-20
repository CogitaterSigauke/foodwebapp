import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom'

// axios.defaults.baseURL = 'https://new-my-recipes-app-myrecipesapp.azuremicroservices.io/app';

// apiKey=""
//                 appId=""
axios.defaults.baseURL = "http://localhost:8080/app";
// axios.defaults.baseURL = 'https://my-recipe-web-app-foodweb.azuremicroservices.io/app';


// axios.defaults.baseURL = 'https://primary:wUi8KxKin1N8UEplHFd6hltkx4fZEWBwk6T2HsxFNvJlUettM7mJXppQ0cenBrpi@new-my-recipes-app.test.azuremicroservices.io/myrecipesapp/default/app';
const searchClient = algoliasearch(
  '2RJQDQ5U0W',
  '2c9dd00a80a65a207001e057e93e81e5'
);


// -----------START CUSTOMIZED SEARCH--------------


let index = searchClient.initIndex('recipes');


class App extends Component{
  

  state = {
        value: "",
        Hits: [],
        query: ""
  };

  search() {

//  =================QUERY===================

    index.search(this.state.query).then(({hits}) => {
      console.log(hits);
      this.setState({
        Hits: hits
      });

    });
  
  }

  componentDidMount(){
    //load hits on start
    this.search();
  }

  handleChange = (e) =>{

    this.setState({
      value: e.target.value,
      query: e.target.value
    });

    this.search();

  }

  render() {

  return (

    <div className="App">
     

    
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
            <a className="collapse-item" href="">Cocktail</a>
            <a className="collapse-item" href="">Hot Drinks</a>
            <a className="collapse-item" href="">Smoothies</a>
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
            <a className="collapse-item" href="">Ice Creams</a>
            <a className="collapse-item" href="">Cakes</a>
            <a className="collapse-item" href="">Cookies</a>
            <a className="collapse-item" href="">Fruits</a>
            
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
            <a className="collapse-item" href="">Ethiopian</a>
            <a className="collapse-item" href="">Indian</a>
            <a className="collapse-item" href="">Chinese</a>
            <a className="collapse-item" href="">Italian</a>
            <a className="collapse-item" href="">Mexican</a>
            <a className="collapse-item" href="">American</a>
            
          </div>
        </div>
      </li>

  

      <li className="nav-item active">
        <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fas fa-blender"></i>
          <span>Meals</span>
        </a>
        <div id="collapsePages" className="collapse show" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Main Dishes</h6>
            <a className="collapse-item active" href="">Breakfast</a>
            <a className="collapse-item active" href="">Lunch</a>
            <a className="collapse-item active" href="">Dinner</a>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Side Dishes</h6>
            <a className="collapse-item active" href="">Vegetable</a>
            <a className="collapse-item active" href="">Grain</a>
            <a className="collapse-item active" href="">Seasonal</a>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="">
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


              <div className="input-group">
                <form class="form-inline">
                  <i class="fas fa-search" aria-hidden="true"></i>
                  <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                    aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
                </form>         
              </div>

          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown no-arrow d-sm-none">
              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-search fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..rrrrrrrrr." aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
          
            

            {/* <div className="topbar-divider d-none d-sm-block"></div> */}
            <Link  to="/Login">
              <li>Log In</li>
           
            </Link>
            

          </ul>

        </nav>



        <div className="container-fluid">
          <div className="container">


              <div className="row">
                {/* card one */}

                
                {
                    this.state.Hits.map((hit)=>(
                      <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                          <img src={hit.imageString} className="card-img-top" alt="..."/>
                          <div className="card-body text-center">
                            <h4 className="card-title">
                                <a href="#">{hit.mealName}</a>
                            </h4>
                    <h6><a className="fas fa-user" href="#">{hit.userName}</a></h6>
                    <p className="card-text">{hit.dietAndHealth}</p>
                          </div>
                          <div className="card-footer">
                              <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                          </div>
                        </div>
                      </div> 
                    ))
                }

              </div>
            </div>   
         

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


  );
  }
}

export default App;
