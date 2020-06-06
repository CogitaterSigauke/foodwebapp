import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from "react-router-dom";

import { Link } from 'react-router-dom'


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
      filter: ""
    };
  }

  search(query) {

  //  =================QUERY===================

  index.search(query).then(({hits}) => {
    console.log(hits);
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

  }else{
    console.log("=============START==Inside Home===============");
    console.log("=============Not Logged in===============");
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
  
  console.log(this.props);
  console.log("=-=-=-=-=-=-=-=-=-=-=-=-")
  console.log(this.props.location.state.userId);
  console.log("=-=-=-=-=-=USER  NAME-=-=-=-=-=-=-")
  console.log(this.props.location.state.userName);
  console.log("=-=-=-=-=-=-=-=IMAGE-=-=-=-=-")
  console.log(this.props.location.state.imageString);
  if(!this.props.location.state){
    this.setState({
      authenticated: false
    })

  }
  this.search("");

  // check if user has been redirected from the login or 
 
  

  }

  handleLogout = () => {
    console.log("Logout");
    console.log(this);
    localStorage.removeItem("tokenId");
    const token = localStorage.tokenId;
    console.log("tokenId ==3333333333333333333333333333333333333333333> ", token);
    // debugger;
    // window.location.href("/");
    // this.props.history.push("/");
    // runder = {<Redirect to='/Home'/>}
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

render() {

  const { authenticated } = this.state;
  if(!authenticated){
    this.props.history.push('/');
    // return <Redirect to='/'/>
  }
  if(!this.props.location.state){
    this.props.history.push('/');
    return <Redirect to='/'/>;
  }

  return (

    <div className="Home">
     

    
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
            <span className="recipe-ul" >Recipe Cards</span>
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
          {/* <div> */}
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
               {/* Search Bar */}
          
              <div className="input-group">
                <form className="form-inline">
                  <i className="fas fa-search" aria-hidden="true"></i>
                  <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                    aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
                </form>         
              </div>

              {/* FILTER LABEL */}

              <div>
            
                <label> {this.state.filter} </label>
            
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
            <Link 
              to={{
                pathname: "/ChatBox",
                state: this.props.location.state
              }} 
              className="nav-link dropdown-toggle" 
              id="messagesDropdown" 
              role="button" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
                <span className="badge badge-danger badge-counter">7</span>
            </Link>
            {/* <h1>USER NAME {this.props.location.state.userName}</h1> */}
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                  Message Center
                </h6>
                <Link to={{
                      pathname: "/ChatBox",
                      state: this.props.location.state}}  
                      className="dropdown-item d-flex align-items-center"
                >
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
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.location.state.userName}</span>
                <img className="img-profile rounded-circle" src={this.props.location.state.imageString}/>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                
              <Link className="dropdown-item" to = 
                {{
                  pathname: "/Profile",
                  state: this.props.location.state     
                  
                    }} 
                  >
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                </Link>

                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
               
                <ul className="dropdown-item recipe-ul" onClick={this.handleMyRecipe} >
                  <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
                    My Recipe
                </ul>

                <Link className="dropdown-item" to ={{
                  pathname: "/MyFavorites",
                  state: this.props.location.state
                    }} 
                >
                    <i className="far fa-heart fa-sm fa-fw mr-2 text-gray-400"></i>
                    My Favorite Recipes
                </Link>
                <Link className="dropdown-item" to = {{
                    pathname: "/AddRecipe",
                    state: this.props.location.state
                  }} >
                    <i className="fas fa-glass-cheers fa-sm fa-fw mr-2 text-gray-400"></i>
                    Add Recipe
                </Link>
                <div className="dropdown-divider"></div>
                <Link to= "" >
                  <p className="dropdown-item"  data-toggle="modal" data-target="#logoutModal" onClick={this.handleLogout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" ></i>
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
export default withRouter(Home);
