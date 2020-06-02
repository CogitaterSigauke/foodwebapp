// see all the recipes that are registered under my id
// edit recipe

// delete recipe


// for displaying all the recipes under a user - get the recipe hits from algolia based on a user id
// compare the current user id with the one that is saved and bring all the recipes under that id
// every single recipe hit will have a link to that specific recipe description page
// when they click edit - they will be able to edit the recipe that they saved 
// when they click delte the will be able to delte that recipe


// To do list:
// create my recipes page and get all the hits from algolia - if u can do this u will also be able to do the side bars
// on home page
// make sure that all the displaed recipe hits link to the specific recipe page that you already have and plus u will have 
// buttons like edit and delte which leads to a different component - inorder to perform those actions
// 

import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { Link } from 'react-router-dom'


const searchClient = algoliasearch(
  '2RJQDQ5U0W',
  '2c9dd00a80a65a207001e057e93e81e5'
);

let index = searchClient.initIndex('recipes');

class MyRecipes extends React.Component{

  state = {
    value: "",
    Hits: [],
    query: ""
  };

  search() {
    // index.search('query', {
    //     facetFilters: [
    //         'mealType: '
    //     ]
    // , {  filters: '_tags:"Rediet Negash"'
  // }
  
    //   })
  //  =================QUERY===================
  

  index.search(this.state.query)
  .then(({hits}) => {
    console.log(hits);
    this.setState({
      Hits: hits
    });


  });
}


filterByDrink = (e) => {
  debugger;
  this.setState({
  
    query: "Coffee"
  });

  this.search();
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

    <div className="Home">
     

    
    <div id="wrapper">

    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <Link to="/Home" className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-blender"></i>
        </div>
        <div className="sidebar-brand-text mx-3">My Recipes <sup><i className="fas fa-laugh-wink"></i></sup></div>
      </Link>

      <hr className="sidebar-divider my-0"/>
      <Link to="/Home">
      <li className="nav-item">
        <p className="nav-link" >
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Recipe Cards</span>
        </p>
      </li>
      </Link>
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
            <p className="collapse-item"  value={this.state.value} onClick={this.filterByDrink}>Hot Drinks</p>
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
            {/* Search Bar */}
          
              <div className="input-group">
                <form className="form-inline">
                  <i className="fas fa-search" aria-hidden="true"></i>
                  <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                    aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
                </form>         
              </div>
         
            {/* nav bar  */}
        
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
          
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i>
                <span className="badge badge-danger badge-counter">3+</span>
              </a>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                  Alerts Center
                </h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 12, 2019</div>
                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-success">
                      <i className="fas fa-donate text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 7, 2019</div>
                    $290.29 has been deposited into your account!
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-warning">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 2, 2019</div>
                    Spending Alert: We've noticed unusually high spending for your account.
                  </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow mx-1">
            <Link to="/ChatBox" className="nav-link dropdown-toggle" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
                <span className="badge badge-danger badge-counter">7</span>
            </Link>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                  Message Center
                </h6>
                <Link to="/ChatBox" className="dropdown-item d-flex align-items-center" >
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt=""/>
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div className="font-weight-bold">
                    <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                  </div>
                </Link>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt=""/>
                    <div className="status-indicator"></div>
                  </div>
                  <div>
                    <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                    <div className="small text-gray-500">Jae Chun · 1d</div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt=""/>
                    <div className="status-indicator bg-warning"></div>
                  </div>
                  <div>
                    <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                    <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt=""/>
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div>
                    <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                    <div className="small text-gray-500">Chicken the Dog · 2w</div>
                  </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <Link to = "/MyRecipes">
                  <p className="dropdown-item">
                    <i className="fas fa-glass-cheers fa-sm fa-fw mr-2 text-gray-400"></i>
                    My Recipe
                  </p>
                </Link>
                <Link to = "/AddRecipe">
                  <p className="dropdown-item">
                    <i className="fas fa-glass-cheers fa-sm fa-fw mr-2 text-gray-400"></i>
                    Add Recipe
                  </p>
                </Link>
                <div className="dropdown-divider"></div>
                <Link to= "/">
                  <p className="dropdown-item"  data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </p>
                </Link>
              </div>
            </li>

          </ul>

        </nav>



        <div className="container-fluid">
          <div className="container">
                {/* HITS Display*/}

              <div className="row">
            
                {
                    this.state.Hits.map((hit, i)=>(
                      <div className="col-lg-4 col-md-6 mb-4" key={i}>
                        <div className="card border-0 shadow">
                          <Link to={`/MyRecipeDetail/${hit.objectID}`}>
                            <img src={hit.imageString} className="card-img-top" alt="..."/>
                          </Link>
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
 
  );
}
}
export default MyRecipes;