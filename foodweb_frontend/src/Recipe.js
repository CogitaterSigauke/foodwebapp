import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './recipe.css';
import Rating from './Rating';
import { connectScrollTo } from 'react-instantsearch-dom';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';


import algoliasearch from 'algoliasearch/lite';


const searchClient = algoliasearch(
  '2RJQDQ5U0W',
  '2c9dd00a80a65a207001e057e93e81e5'
);

let index = searchClient.initIndex('recipes');


class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRecipeOwner: false,
            Recipe: {},
            Review: {
                comment: '',
                // rating: '',
            },
            LoadedComments: {},
            stepsarr: {},
            likes: 0,
            value: "",
            Hits: [],
            query: "",
            hitsFound: false,
            steps: [],
            hasLiked: false
           
        };
    }

    search(query) {
        index.search(query).then(({hits}) => {

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
            this.setState({
                Hits: hits
             });


        });
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
        }

    handleFilterAllRecipes = (e) => {
        this.props.history.push({
            pathname: "/Home",
            state: this.props.location.state
        })
    }

    handleRecipeChange = (e) =>{
        this.props.location.state.recipeId = e.target.name;
        this.componentDidMount();
    }

    handleLogout = () => {
        localStorage.removeItem("tokenId");
        this.setState({
            authenticated: false,
            

        });
    } 
        
          
    handleFilter = (e) =>{

        this.props.history.push({
            filter: e.target.innerHTML,
            pathname: "/Home",
            state: this.props.location.state
        })
  
    }
    handleMyRecipeFilter = (e) => {
    
        this.props.history.push({
            filter: this.props.location.state.userName,
            pathname: "/Home",
            state: this.props.location.state
        })

    }

    componentDidMount() {
        console.log(this);
        let object = {
            recipeId: this.props.location.state.recipeId,
            userName: this.props.location.state.userName,
            userId: this.props.location.state.userId
        };
        axios.post('/recipe/hasliked/', object)
        .then((result)=>{
                console.log(result.data);
                if(result.data.hasLiked){
                    this.setState({
                        hasLiked: true
                    })
                }else{
                    this.setState({
                        hasLiked: false
                    })
                }
            }
        ).catch((error)=>{
            console.log(error);
        }).catch((err) => {
            console.log(`Errors: {errors}`, err);
        });

        axios.get('/recipe/'+this.props.location.state.recipeId)
            .then(res => {
                this.setState({ Recipe: res.data,
                    steps: res.data.steps.split('.')
                });

                if(this.props.location.state.userId ==  res.data.userId) {
                    this.setState({
                        isRecipeOwner: true
                    });
                }
                this.search(res.data.mealType);
              
            });
        axios.get('/get_all_comments/'+this.props.location.state.recipeId)
            .then(commments => {

            this.setState({LoadedComments: commments.data });
         
        });
        
        this.printSteps();
        axios.get(`/recipe/total_likes/${this.props.location.state.recipeId}`)
        .then(
            (result)=>{
             
                this.setState({likes : result.data.likes});
              
            }
        ).catch((error)=>{
            console.log(error);
        }).catch((err) => {
            console.log(`Errors: {errors}`, err);
        });
     
    }
  ReduceLikesCount = () => {

    let object = {
        recipeId: this.props.location.state.recipeId,
        userName: this.props.location.state.userName,
        userId: this.props.location.state.userId
    };

    this.setState({
        likes : this.state.likes - 1,
        hasLiked: false
    });

    axios.post('/recipe/unlike/', object)
    .then(
        (result)=>{
            console.log(result.data);
            console.log(this.state);
        }
    ).catch((error)=>{
        console.log(error);
    }).catch((err) => {
        console.log(`Errors: {errors}`, err);
    });

    

  }

  IncrementLikesCount = () => {
    debugger;
    let object = {
        recipeId: this.props.location.state.recipeId,
        userName: this.props.location.state.userName,
        userId: this.props.location.state.userId
    };

    this.setState({
        likes : this.state.likes + 1,
        hasLiked: true
    });
  
    axios.post('/recipe/like/', object)
    .then(
        (result)=>{
            console.log(result.data);
           
        }
    ).catch((error)=>{
        console.log(error);
    }).catch((err) => {
        console.log(`Errors: {errors}`, err);
    });
  }



    // delete a recipe
    deleteRecipe = () => {
     
        console.log("Recipe user ID", this.state.Recipe)
        axios.delete('/'+this.state.Recipe.userId+'/delete_recipe/'+this.props.location.state.recipeId)
        .then((result) => {
            alert("Successfuly Deleted");
            this.props.history.push({
                refresh: true,
                pathname: "/Home",
                state: this.props.location.state
            })
        })
        .catch((err) => {
            console.log(`Errors: {errors}`);
        })
        .catch((err) => {
            console.log(`Errors: {errors}`);
        });
    }

  

    onChange = (e) => {
        const state = this.state.Review
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

  
// post a review- only comment for now
    postReview = (e) => {

        e.preventDefault();
     
        const { comment } = this.state.Review;
        
        axios.post('/add_comment_to_recipe/'+this.props.location.state.recipeId,  {commentText: comment, recipeId: this.props.location.state.recipeId})

          .then((result) => {
           
            console.log(this.props.location.state.recipeId);

            this.componentDidMount();
          
          })
          .catch((err) => {
           
            console.log(`Errors: {errors}`);
          })
          .catch((err) => {
    
            console.log(`Errors: {errors}`);
          });
      }
    
    printSteps = (e) =>{
       
        let string = this.state.Recipe.steps;
    }
    
    render() {
        const { comment } = this.state.Review;
        return (         
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
                <span onClick={this.handleFilter}>Diet And Health</span></ul>
            </li>
            </ul>
            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                   
                   <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                       <i className="fa fa-bars"></i>
                   </button>
     
                  
     
                   <span className="mr-2 d-none d-lg-inline text-gray-600 small text-nowrap">{this.state.filter}</span>
     
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
                                 <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
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
     
                             <Link to="">
                                 <p className="dropdown-item"  data-toggle="modal" data-target="#logoutModal">
                                 <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" onClick={this.handleLogout}></i>
                                 Logout
                                 </p>
                             </Link>
     
                         </div>
                       </li>
                   </ul>
                 </nav>
                     
                 
                 

            <div className= "container ">
                <h1 className="my-4">RECIPE DESCRIPTION</h1>
                    </div>
                    <section className="my-5">
                        <div className="container">
                            <div className="container">

                                <h1 className="my-4"></h1>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img className="img-fluid" src={this.state.Recipe.imageString} alt=""/>
                                                <div className="row user-detail-row">
                                                    <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                                            

                                                        {
                                                        (this.state.hasLiked)
                                                        && (
                                                            <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                                                                <button className="float-right btn text-white btn-danger" onClick={this.ReduceLikesCount}> <span className=" text-white ">{this.state.likes}</span> <i className="fa fa-heart"></i> </button>

                                                            </div>  

                                                        )

                                                     
                                                    }

                                                    {

                                                        (!this.state.hasLiked)
                                                        &&(
                                                        
                                                            <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                                                                 <button className="float-right btn text-white recipe-btn" onClick={this.IncrementLikesCount}> <span className=" text-white ">{this.state.likes}</span> <i className="fa fa-heart"></i> </button>
                                                            </div>    
                                                        )
                                                    }
                                                    </div>                           
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h3 className="my-3">Recipe Description</h3>

                                            <p>{this.state.Recipe.description}</p>
                                            <h3 className="my-3">Recipe Details</h3>
                                            <ul>
                                            <li><b>Meal Name:    </b> {this.state.Recipe.mealName}</li>
                                            <li><b>Meal Type:    </b> {this.state.Recipe.mealType}</li>
                                            <li><b>Recipe Owner: </b> {this.state.Recipe.userName}</li>

                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="my-3"> Ingredients</h3>
                                           
                                             
                                            <ul>
                                                <pre> {this.state.Recipe.ingredients}</pre>
                                
                                            </ul>


                                            <h3 className="my-3"> Steps</h3>
                                           
                                                       {this.state.steps.map((step, i)=> (
                                                            <div key={i}>
                                                                <div className="topbar-divider d-none d-sm-block"></div>
                                                                <br/>{step}<br/>
                                                                <div className="topbar-divider d-none d-sm-block"></div>

                                                            </div> 
                                                       ))}
                                        </div>

                                    </div>
                                    

                                <h3 className="my-4">Related Recipes</h3>
                                <div className="row">
                                    {

                                        this.state.Hits.map((hit, i)=>(
                                            
                                                    (this.state.Recipe.id !== hit.objectID)
                                                        && 
                                                    (
                                                        <div className="col-md-3 col-sm-6 mb-4" key={i}> 
                                                            <ul onClick={this.handleRecipeChange}>
                                                                <img className="img-fluid recipe-ul" src={hit.imageString} name={(hit.objectID)} alt={`${hit.mealName} image`}/>
                                                            </ul>
                                                        </div>
                                                    
                                                    )
                                        ))
                                    
                                    }
                                    </div>

                            </div>
                        </div>
                    </section>
            </div>
            <div className="container">
               
                
                <div className="card">
                <h3 className="text-center comment-padding">Comments</h3>            
             
                    <form onSubmit={this.postReview}>
                        <div className="card-body">
                            <div className="row" >
                                {Object.keys(this.state.LoadedComments).map((key, i) =>
                                    
                                    <div className="card-card border-0 shadow" style={{padding:"3%"}} key={i}> 
                                        <div className="col-md-2    ">
                                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
                                        </div>
                                        <p className="text-secondary" key={key}>{this.state.LoadedComments[key].createdAt}</p>
                                        
                                        <div className="col-md-10">
                                           
                                                <p className="float-left" ><strong>Anonymous</strong></p>
                                            
                                            <div className="clearfix float-right">
                                            <p key={key}>{this.state.LoadedComments[key].commentText}</p>
                                            </div>
                                            <p>
                                              
                                            </p>
                                        </div>
                                    </div>
                               
                                )}
                             </div>
                        </div>
                     
                       
                                   
                        <div className="text-right">


                       
                            <textarea  rows="3" cols="30" type="text" className="form-control" name="comment" value={comment} onChange={this.onChange} placeholder="Leave a comment" />
                            
                           <div className="row">
                               
                               <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-success btn-sm">Submit Review</button>
                                </div>
                                
                            </div>
                                {(this.state.isRecipeOwner)
                                && (<div className="row" >
                                    <div className="col-md-4">
                                    <Link to ={{
                                        pathname: "/EditRecipe",
                                        state: this.props.location.state,
                                        Recipe: this.state.Recipe
                                    }} >
                                        <button type="button" className="btn btn-success">Edit_Recipe</button>
                                    </Link>
                                    </div><div className="col-md-4"></div>
                                    <div className="col-md-4"><button type="button" className="btn btn-danger" onClick={this.deleteRecipe}>Delete_Recipe </button>
                                    </div>
                                </div>
                                )
                                } 
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
