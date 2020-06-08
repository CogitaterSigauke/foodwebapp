import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';


const searchClient = algoliasearch(
  '2RJQDQ5U0W',
  '2c9dd00a80a65a207001e057e93e81e5'
);

let index = searchClient.initIndex('recipes');

class Home extends React.Component{
  // _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      Hits: [],
      query: "",
      authenticated: true,
      filter: "",
      hitsFound: true,
    
    };
  }

  search(query) {

  //  =================QUERY===================

  index.search(query).then(({hits}) => {
    console.log("=================QUERY===================");
    console.log(hits);
    if(hits.length == 0){
      this.setState({
        hitsFound: false
      })
    }else{
      this.setState({
        hitsFound: true
      })
    }
    console.log("=================QUERY===================");
    this.setState({
      Hits: hits
    });


  });
}

handleMyRecipe =()=>{
  // this.setState({
  //   // value: e.target.value,
  //   query: this.props.match.params.userName
  // });
  console.log("userName  --------", this.props);

  this.search(this.props.location.state.userName);
}
componentWillMount() {
  // this._isMounted = false;
  if(this.props.location.state){
    console.log("=============START=================");
    console.log(this.props);
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-")
    console.log(this.props.location.state.userId);

  }else {

    console.log(this.props);
    this.setState({
      authenticated: false
    })
    // this.props.history.push('/Login');
  }
}

  componentDidMount(){
    // this._isMounted = true;
    //load hits on start
    // console.log(this.props);
    // console.log(this.props.location.state.userId);
    // console.log(this.props.location.state.userName);
    // console.log(this.props.location.state.imageString);
    // console.log(this.props.location.refreshed);
    if(this.props.history.refresh){
      window.location.reload();
      this.props.history.refresh = null;
    }
    if(!this.props.location.state){
      this.setState({
        authenticated: false

      })
    }
    if(this.props.location.filter){
      let e = {
        target: {
          innerHTML: this.props.location.filter
        }
      }
      this.handleFilter(e);


    }else{
      this.search("");
    }
    
  }

handleLogout = () => {
  localStorage.removeItem("tokenId");
  // localStorage.setItem("tokenId", null);
  const token = localStorage.tokenId;
  // window.location.href("/");
  // this.props.history.push("/");
  // runder = {<Redirect to='/Home'/>}
  console.log("INSIDE LOGOUT");
  this.setState({
    authenticated: false
  });
  // this.props.history.push('/');
} 

  handleChange = (e) =>{

  this.setState({
    value: e.target.value,
    query: e.target.value,
    filter: ""
  });

  this.search(e.target.value);

  }

  handleFilter = (e) =>{

    this.setState({
      filter: e.target.innerHTML,
      query: e.target.innerHTML
    });
  
    this.search(e.target.innerHTML);
    // this.search(e.target.value);
  
    }
    handleMyRecipeFilter = (e) => {
      this.setState({
        filter: "My Recipes",
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

render() {

  const { authenticated } = this.state;
  if(!authenticated){
    this.props.history.push('/');
    // return <Redirect to='/'/>
  }
  // if(!this.props.location.state){
  //   this.props.history.push('/');
  //   return <Redirect to='/'/>;
  // }

  return (

    <div className="Home">
      <div id="wrapper">



        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

          <ul onClick={this.handleFilterAllRecipes}
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
              <span onClick={this.handleFilter}>Dite And Health</span></ul>
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
                <form className="form-inline">
                  <i className="fas fa-search" aria-hidden="true"></i>
                  <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                    aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
                </form>         
              </div>

              <span className="mr-2 d-none d-lg-inline  small text-nowrap nav-item filter-edit">{this.state.filter}</span>

              <Link className="nav-item"
                to={{
                pathname: "/ChatBox",
                state: this.props.location.state
                }} > <i className="fas fa-envelope fa-fw"></i>
              </Link>

              {/* Labels */}
                
              {/* nav bar  */}

              <ul className="navbar-nav ml-auto">
                  <div className="topbar-divider d-none d-sm-block"></div>

                  <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.location.state.userName}</span>
                    <img className="img-profile rounded-circle" src={this.props.location.state.imageString}/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    
                        <Link className="dropdown-item" to = 
                            {{
                                pathname: "/Profile",
                                state: this.props.location.state
                            }}>
                            <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </Link>
                        
                        <ul className="dropdown-item recipe-ul" onClick={this.handleMyRecipeFilter}>
                            <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
                            My Recipe
                        </ul>

                        <Link className="dropdown-item" to = {{
                            pathname: "/AddRecipe",
                            state: this.props.location.state
                            }} >
                            <i className="fas fa-glass-cheers fa-sm fa-fw mr-2 text-gray-400"></i>
                                Add Recipe
                        </Link>

                        <div className="dropdown-divider"></div>

                        <ul onClick={this.handleLogout} className="dropdown-item recipe-ul" data-toggle="modal" data-target="#logoutModal">
                            
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" ></i>
                            Logout
                            
                        </ul>

                    </div>
                  </li>
              </ul>
            </nav>
                
              

        <div className="container-fluid">
          <div className="container">
                {/* HITS Display*/}
            
              <div className="row">
            
                {(this.state.hitsFound) &&

                    (
                    this.state.Hits.map((hit, i)=>(
                      <div className="col-lg-4 col-md-6 mb-4" key={i}>
                        <div className="card border-0 shadow">
                          <Link 
                          to={{ 
                            pathname: "/Recipe",
                            state:{
                              userId: this.props.location.state.userId, 
                              userName: this.props.location.state.userName,
                              profileImage: this.props.location.state.imageString,
                              imageString: this.props.location.state.imageString,
                              recipeId: hit.objectID
                              }
                        }}
                          
                          >
                            <img src={hit.imageString} className="card-img-top" alt="..."/>
                          </Link>
                          <div className="card-body text-center">
                            <h5 className="card-title">
                            <Link to={{
                                 pathname: "/Recipe",
                                 state:{
                                   userId: this.props.location.state.userId, 
                                   userName: this.props.location.state.userName,
                                   profileImage: this.props.location.state.imageString,
                                   imageString: this.props.location.state.imageString,
                                   recipeId: hit.objectID
                                   }
                              }
                             }>
                                <p href="#">{hit.mealName}</p>
                            </Link>
                            </h5>
                    <h6><a className="fas fa-user" href="#">by {hit.userName}</a></h6>
                   
                    <p className="card-text">{hit.dietAndHealth}</p>
                          </div>
                          <div className="card-footer">
                              <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                          </div>
                        </div>
                      </div> 
                    )) 
                  
                           
                    )
                }

                {(!this.state.hitsFound) && (
                  <div><h1>NO RECIPES FOUND</h1></div>
                )}

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
export default withRouter(Home);
