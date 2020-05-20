import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './recipe.css';


class RecipeNotLoggedIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Recipe: {}
        };
    }

    componentDidMount() {
        axios.get('/recipe/'+this.props.match.params.id)
            .then(res => {
                this.setState({ Recipe: res.data });
                console.log(this.state.Recipe);
            });
    }
    
    render() {
        return (         
        <div id="wrapper">
            <ul id  = "recipeUl" className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

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
                            <Link  to="/Login">
                            <li>Log In</li>
                            </Link>
                        </ul>
                    </nav>
                    


                    {/* Recipe Descirption */}
                    <div className= "container">
                        <h1 className="my-4">RECIPE DESCRIPTION</h1>
                        <div className = "container">
                            <header id="videoheader">
                                <div className="overlay"></div>
                                    <video playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
                                
                                <source src={require('./img/breakfast.mp4')}/>
                                {/* <source src= "https://vod-progressive.akamaized.net/exp=1589539650~acl=%2A%2F1447247590.mp4%2A~hmac=9c34bbd02d316c0f2a07cf359ed4779063dea6d57cd491be295ce91bf415e96c/vimeo-prod-skyfire-std-us/01/1071/14/355357132/1447247590.mp4?download=1&filename=video.mp4"/> */}
                                        {/* <source src="https://vod-progressive.akamaized.net/exp=1589530661~acl=%2A%2F699571361.mp4%2A~hmac=dd3d505e9177ffcb718431534c68dd06eab999e36ddcbc1a68c5d168d39b163b/vimeo-prod-skyfire-std-us/01/1102/8/205512696/699571361.mp4?download=1&filename=Cup+Of+Coffee+On+Top+Of+Coffee+Beans.mp4" type="video/mp4"/> */}
                                    </video>
                                    <div className="container h-100">
                                        <div className="d-flex h-100 text-center align-items-center">
                                        <div className="w-100 text-white">
                                            <h1 className="display-3">Awesome and Easy Recipe</h1>
                                            <p className="lead mb-0">follow the steps below</p>
                                        </div>
                                    </div>
                                </div>
                            </header>
                        </div>
                    </div>
                    {/* Steps and Description */}
                    <section className="my-5">
                        <div className="container">
                            <div className="container">

                                <h1 className="my-4">Setps and Descirption</h1>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <img className="img-fluid" src={this.state.Recipe.imageString} alt=""/>
                                        </div>
                                        <div className="col-md-4">
                                            <h3 className="my-3">Recipe Description</h3>
                                            <p>{this.state.Recipe.description}</p>
                                            <h3 className="my-3">Recipe Details</h3>
                                            <ul>
                                            <li>Meal Name: {this.state.Recipe.mealName}</li>
                                            <li>Meal Type: {this.state.Recipe.mealType}</li>
                                            <li>Recipe Owner: {this.state.Recipe.userName}</li>
                                            </ul>
                                        </div>

                                    </div>

                                <h3 className="my-4">Related Recipes</h3>

                                <div className="row">

                                    <div className="col-md-3 col-sm-6 mb-4">
                                        <a href="#">
                                            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full%20page/8.jpg" alt=""/>
                                            </a>
                                    </div>

                                    <div className="col-md-3 col-sm-6 mb-4">
                                        <a href="#">
                                            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full%20page/11.jpg" alt=""/>
                                            </a>
                                    </div>

                                    <div className="col-md-3 col-sm-6 mb-4">
                                        <a href="#">
                                            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full%20page/3.jpg" alt=""/>
                                            </a>
                                    </div>

                                    <div className="col-md-3 col-sm-6 mb-4">
                                        <a href="#">
                                            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full%20page/9.jpg" alt=""/>
                                        </a>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            

            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; My Recipes 2020</span>
                    </div>
                </div>  
            </footer>
            </div>
        </div>
        );
    }
}

export default RecipeNotLoggedIn;
    
