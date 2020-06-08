import { useHistory } from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { withRouter } from "react-router-dom";
import history from './History';

const token = localStorage.tokenId;
axios.defaults.baseURL = "https://new-my-recipes-app-myrecipes-app.azuremicroservices.io/app";


const searchClient = algoliasearch(
  '2RJQDQ5U0W',
  '2c9dd00a80a65a207001e057e93e81e5'
);

let index = searchClient.initIndex('recipes');

class App extends Component{

  state = {
        value: "",
        Hits: [],
        query: "",
        loggedIn: false,
        userId:"",
        userName: "",
        imageString: ""
  };

  search() {
    index.search(this.state.query).then(({hits}) => {
      console.log(hits);
      this.setState({
        Hits: hits
      });
    });
  }
  handleMyRecipeFilter = (e) => {
    this.setState({
      filter: this.props.location.state.userName,
      query: this.props.location.state.userName
    });

    this.search(this.props.location.state.userName);

  }
  handleFilterAllRecipes = (e) => {
    this.setState({
      filter: "",
      query: ""
    });

    this.search("");
  }

  
  handleFilter = (e) =>{

    this.setState({
      filter: e.target.innerHTML,
      query: e.target.innerHTML
    });
  
    this.search(e.target.innerHTML);
    }

  Auth() {
    if(token){
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      if(decodedToken.exp * 1000000 > Date.now()){
        const userData = {
          name: decodedToken.name,
          email: decodedToken.email,
          familyName: decodedToken.family_name,
          imageString: decodedToken.picture,
          userName: decodedToken.given_name
        };
  
        axios.post('/signup', userData)
          .then(response => {
            const { id } = response.data
            console.log("before push");
            console.log(response.data.id);
            this.setState({
              userId : response.data.id,
              userName: response.data.userName,
              loggedIn : true,
            })
            if(this.state.loggedIn){
              console.log("ready to push");
              this.props.history.push({
                pathname: "/Home",
                state: {userId: this.state.userId,
                        userName: this.state.userName,
                        imageString: response.data.imageString
                      }
              });
            }
          })
          .catch((err) => {
            console.log(err);
          })
        }else{
          console.log("Not Logged in");
      }
    }
  }

  componentDidMount(){
    this.Auth();
    console.log(this.state.loggedIn);
    if(this.state.loggedIn){
      console.log("ready to push");
      this.props.history.push({
        pathname: "/Home",
        state: {userId: this.state.userId,
                userName: this.state.userName}
    });
    }
    this.search();
  }

  handleChange = (e) =>{
    this.setState({
      value: e.target.value,
      query: e.target.value,
    });
    this.search();
  }
 

  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <ul onClick={this.handleMyRecipeFilter}
              className="sidebar-brand d-flex align-items-center justify-content-center nav-item collapse-item recipe-ul">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-blender"></i>
              </div>
              <div className="sidebar-brand-text mx-3 nav-item collapse-item recipe-ul">My Recipes <sup><i className="fas fa-laugh-wink"></i></sup></div>
            </ul>

            <hr className="sidebar-divider my-0"/>
            <li className="nav-item">
                <ul onClick={this.handleFilterAllRecipes}
                  className="nav-link">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span className="recipe-ul" >All Recipes</span>
                </ul>
            </li>
            <hr className="sidebar-divider"/>
            <div className="sidebar-heading">
              Menu
            </div>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" name="drink" value="drink" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-coffee"></i>
                <span>Drinks</span>
              </a>
              <div id="collapseTwo" className="collapse" href="#"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Drinks Menu</h6>
                  <ul className="collapse-item recipe-ul" htmlFor="cocktail" value="cocktail" onClick={this.handleFilter}>Cocktail</ul>
                  <ul className="collapse-item recipe-ul" htmlFor="hot drink" value="desert" onClick={this.handleFilter}>Hot Drinks</ul>
                  <ul className="collapse-item recipe-ul" htmlFor="smoothie" value="smoothie" onClick={this.handleFilter}>Smoothies</ul>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" name="desert" href="#" value="desert" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-cookie-bite"></i>
                <span>Deserts</span>
              </a>
              <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner">
                  <h6 className="collapse-header">Sweet's Menu</h6>
                  <ul className="collapse-item recipe-ul " style={{border: "none"}} name="ice cream" value="ice creams" onClick={this.handleFilter}>Ice Creams</ul>
                  <ul className="collapse-item recipe-ul" name="cake" value="cakes" onClick={this.handleFilter}>Cakes</ul>
                  <ul className="collapse-item recipe-ul" name="cookies" value="cookies" onClick={this.handleFilter}>Cookies</ul>
                  <ul className="collapse-item recipe-ul" name="fruit" value="fruits" onClick={this.handleFilter}>Fruits</ul>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" name="cuisine" value="cuisine" data-toggle="collapse" data-target="#collapseCuisine" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-globe"></i>
                <span>World Cuisine</span>
              </a>
              <div id="collapseCuisine" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Countries</h6>
                  <ul className="collapse-item recipe-ul" name="Ethiopian" value="Ethiopian" onClick={this.handleFilter}>Ethiopian</ul>
                  <ul className="collapse-item recipe-ul" name="Indian" value="Indian" onClick={this.handleFilter}>Indian</ul>
                  <ul className="collapse-item recipe-ul" name="Chinese" value="chinese" onClick={this.handleFilter}>Chinese</ul>
                  <ul className="collapse-item recipe-ul" name="Italian" value="Italian" onClick={this.handleFilter}>Italian</ul>
                  <ul className="collapse-item recipe-ul" name="Mexican" value="Mexican" onClick={this.handleFilter}>Mexican</ul>
                  <ul className="collapse-item recipe-ul" name="American" value="American" onClick={this.handleFilter}>American</ul> 
                </div>
              </div>
            </li>

            <li className="nav-item active">
              <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapseMeals" aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-fw fas fa-blender"></i>
                <span>Meals</span>
              </a>
              <div id="collapseMeals" className="collapse show" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Main Dishes</h6>
                  <ul className="collapse-item active recipe-ul" name="breakfast" value="breakfast" onClick={this.handleFilter}>Breakfast</ul>
                  <ul className="collapse-item active recipe-ul" name="lunch" value="lunch" onClick={this.handleFilter}>Lunch</ul>
                  <ul className="collapse-item active recipe-ul" name="dinner" value="dinner" onClick={this.handleFilter}>Dinner</ul>
                  <div className="collapse-divider"></div>
                  <h6 className="collapse-header" name="side dish" value="side dish" onClick={this.handleFilter}>Side Dishes</h6>
                  <ul className="collapse-item active recipe-ul" name="vegitable" value="vegitable" onClick={this.handleFilter}>Vegetable</ul>
                  <ul className="collapse-item active recipe-ul" name="grain" value="grain" onClick={this.handleFilter}>Grain</ul>
                  <ul className="collapse-item active recipe-ul" name="seasonal" value="seasonal" onClick={this.handleFilter}>Seasonal</ul>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <ul className="nav-link recipe-ul" name="dite and healthy" value="dite and healthy">
                <i className="fas fa-hand-holding-heart"></i>
                <span onClick={this.handleFilter}>Diet And Health</span></ul>
            </li>
         
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars"></i>
                </button>

                    <div className="input-group">
                      <form className="form-inline">
                        <i className="fas fa-search" aria-hidden="true"></i>
                        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                          aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
                      </form>         
                    </div>

                    <span className="mr-2 d-none d-lg-inline text-gray-600 small text-nowrap">{this.state.filter}</span>


                <ul className="navbar-nav ml-auto">

                  <Link  to="/Login">
                    <button type="button" className="btn btn-primary btn-sm">LogIn</button>
                  </Link>
                </ul>
              </nav>

              <div className="container-fluid">
                <div className="container">
                  <div className="row">
                   
                    {
                      this.state.Hits.map((hit, i)=>(
                          <div className="col-lg-4 col-md-6 mb-10"  key={i}>
                            <div className="card border-0 shadow"  >
                              <img src={hit.imageString} className="card-img-top" alt="..." onClick={() => alert('Please Login to unlock the Recipe Card')} />
                              <div className="card-body text-center">
                                <h5 className="card-title">
                                    <a href="">{hit.mealName}</a>
                                </h5>
                                <h6><a className="fas fa-user" href="#">{hit.userName}</a></h6>
                                <p className="card-text">{hit.mealType}</p>
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
                  <span>Copyright &copy; My Recipe Website 2020 </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);




