import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './recipe.css';
import Rating from './Rating';


class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Recipe: {},
            Review: {
                comment: '',
                // rating: '',
            },
            LoadedComments: {}

        };
    }

    componentDidMount() {
        // console.log('/recipe/5eba3f7efd9c7b27cb32b8fa');
       // '+this.props.match.params.id
       console.log("#################################")
       console.log(this.props)
        axios.get('/recipe/'+this.props.match.params.id)
            .then(res => {
                this.setState({ Recipe: res.data });
                console.log(this.state.Recipe);
            });
        axios.get('/get_all_comments/'+this.props.match.params.id)
            .then(commments => {

            this.setState({LoadedComments: commments.data });
            console.log("Loaded Comments");
            console.log(this.state.LoadedComments);

        });
      
  
    }
        // delete a recipe
   

    deleteRecipe() {
        // e.preventDefault(); 
        axios.delete('app/5eb7c78b12e629445c8f07c2/delete_recipe/5eba3f7efd9c7b27cb32b8fa')
        .then((result) => {
            alert("Successfuly Deleted");
            this.props.history.push("/Home")
        })
        .catch((err) => {
            console.log(`Errors: {errors}`);
        })
        .catch((err) => {
            console.log(`Errors: {errors}`);
        });
    }

    // This will edit a recipe
    // editRecipe = (e) =>{
    // e.preventDefault(); 
    // axios.put('app//delete_recipe/KUGYJAGFVAHYIGSK')
    // .then((result) => {
    //     alert("Successfuly Updated");
    //     this.props.history.push("/Home")
    //     })
    //     .catch((err) => {
    //     console.log(`Errors: {errors}`);
    //     })
    //     .catch((err) => {
    //     console.log(`Errors: {errors}`);
    //     });
    // }

    onChange = (e) => {
        const state = this.state.Review
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    postReview = (e) => {

        e.preventDefault();
        // id=  localStorage.getItem("id");
        const { comment } = this.state.Review;
        debugger;

       // const recipeId = this.params.props.id;
        axios.post('/add_comment_to_recipe/'+this.props.match.params.id,  {commentText: comment, recipeId: this.props.match.params.id})

          .then((result) => {
            console.log("After Posting new Contact - returned data: " + result.data);
            console.log('======response.data======');
            console.log(result.data);

            console.log(this.props.match.params.id);

            alert("Successfuly saved");
            this.props.history.push("/Home")
          })
          .catch((err) => {
            console.log(`======response.data=====`);
            // setErrors(err.result.data);
            console.log(`Errors: {errors}`);
          })
          .catch((err) => {
    
            // setErrors(err.result.data);
            console.log(`Errors: {errors}`);
          });


    
      }
    
    
    render() {
        const { comment } = this.state.Review;

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
                    {/* Search Bar */}

                   

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
                        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw"></i>
                        <span className="badge badge-danger badge-counter">7</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            Message Center
                        </h6>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt=""/>
                            <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold">
                            <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                        </a>
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
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
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
                                        <div>
                                            <h3 className="my-3"> Ingredients</h3>
                                            <ul>
                                                <li> {this.state.Recipe.ingredients}</li>
                                
                                            </ul>
                                            <h3 className="my-3"> Steps</h3>
                                            <ul>
                                                <li>{this.state.Recipe.steps}</li>
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
            <div className="container">
                <h2 className="text-center">Reviews and Comments</h2>
                
                <div className="card">

                    <form onSubmit={this.postReview}>
                        <div className="card-body">
                            <div className="row">
                            {/* <div className="row"> */}
                                {Object.keys(this.state.LoadedComments).map((key) =>
                                    
                                    <div className="card-card border-0 shadow" style={{padding:"3%"}}> 
                                        <div className="col-md-2">
                                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
                                        </div>
                                        <p className="text-secondary" key={key}>{this.state.LoadedComments[key].createdAt}</p>
                                        
                                        <div className="col-md-10">
                                            <p>
                                                <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Ananonymus</strong></a>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>

                                            </p>
                                            <div className="clearfix"></div>
                                
                                            <p key={key}>{this.state.LoadedComments[key].commentText}</p>

                                    
                                            <p>
                                                <a className="float-right btn btn-outline-primary ml-2"> <i className="fa fa-reply"></i> Reply</a>
                                                <a className="float-right btn text-white btn-danger"> <i className="fa fa-heart"></i> Like</a>
                                            </p>
                                        </div>
                                    </div>
                               
                                )}
                             </div>
                        </div>
                     
                                      
                                   
                        <div className="text-right">
                            <textarea  rows="3" cols="30" type="text" className="form-control" name="comment" value={comment} onChange={this.onChange} placeholder="Leave a comment" />
                    
                            {/* <textarea  rows="3" cols="30" className="form-control form-control-user" value = {comment} placeholder="Leave a comment"/> */}
                            <Rating/>
                            
{/*                             
                            <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                            </div> */}
                            <button type="submit" className="btn btn-success">Submit Review</button>
                            <button type="button" class="btn btn-success">Edit_Recipe</button>
                            <button type="button" class="btn btn-danger" onClick={this.deleteRecipe}>Delete_Recipe </button>

                            {/* <a className="btn btn-success btn-green" href="#reviews-anchor" id="open-review-box">Leave a Review</a> */}
                        </div>
                       
                    </form> 
                </div>
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

export default Recipe;
