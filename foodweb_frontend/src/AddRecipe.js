import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { storage } from "./firebase";


class AddRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      mealType: '',
      dietAndHealth: '',
      worldCuisine: '',
      mealName: '',
      description: '',

      imageString: '' , 

      videoId: '',
      image: null,
      images: [],
      url: "",
      urls: [],
      noImageSelected: null,
      progress: 0,
      // steps: ['step-0'],
      // ingredients: ['ingredient-0'],
      
      profileImage: "",
      step: "",
      ingredient: "",
      authenticated: true

    };
  }

  // appendInput = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.step);
  //   this.state.steps.push(this.state.step);
  //   var newInput = `step-${this.state.steps.length}`;
  //   this.setState(prevState => ({ steps: prevState.steps.concat([newInput]) }));
  // }

  // appendIngredients = () => {
  //   const state = this.state;
  //   this.state.steps.push(e.target.value);
  //   this.setState(state);
  //   var newInput = `ingredient-${this.state.ingredients.length}`;
  //   this.setState(prevState => ({ ingredients: prevState.ingredients.concat([newInput]) }));
  // }
  
  componentWillMount() {
    // this._isMounted = false;
    if(this.props.location.state){
      
    }else{
      
      this.setState({
        authenticated: false
      })
      // this.props.history.push('/Login');
    }
  }


  componentDidMount(){
    //load hits on start

    if(!this.props.location.state){
      this.setState({
        authenticated: false
      })
  
    }
    
    this.setState({
      userId: this.props.location.state.userId,
      userName: this.props.location.state.userName,
      profileImage: this.props.location.state.imageString
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    
  }
  unhideSubmit = (e)=>{
    this.buttonElement.click();
  }
  // was used for different form of taking input from a user
  // handleSteps = (e) => {
  //   debugger;
  //   const state = this.state;
  //   console.log(this.state);
  //   // state[e.target.name] = e.target.value;
  //   // console.log("Selected file of size: " + e.target.files[0].size);
  //   // this.setState({
  //   //   step: e.target.value
    
  //   // });
  //   // this.state.steps.push(e.target.value);
  //   this.setState({ step: e.target.value });

  //   console.log(this.state);
  //   // this.setState(state);
    
  // }

  // handleIngredients = (e) => {
  //   const state = this.state;
  //   // state[e.target.name] = e.target.value;
  //   // console.log("Selected file of size: " + e.target.files[0].size);
  //   // this.setState({
  //   //   ingredient:  e.target.value
  //   // });
  //   this.state.ingredients.push( e.target.value);
  //   this.setState(state);
    
  // }

  onSubmit = (e) => {
    e.preventDefault();
   
    const{ userId, userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients } = this.state;
    
  
    if(this.state.image){

      if(this.state.noImageSelected){

      }else{

      
      axios.post('/user/add/recipe/', { userId, userName,  mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients })
        .then((result) => {
          const recipeID = result.data.id;
         
          this.setState({
            noImageSelected: false
          });
  
          // alert("Successfuly saved, Thank you!");
        
          this.props.history.push({
            pathname: "/Home",
            state: {userId: this.state.userId,
                    userName: this.state.userName,
                    imageString: this.state.profileImage
                  }
          });

        })
        .catch((err) => {
          console.log(`Errors: {errors}`);
        })
        .catch((err) => {
          console.log(`Errors: {errors}`);
        });

      }

    }else{

      this.setState({
        noImageSelected: true
      });

    }
    
  }

  handleFileChange = e => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0]
      });
      }  
  };



  handleUpload = () => {

    console.log("handleUpload State:", this.state);
    if(this.state.image){

      
       
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      uploadTask.on(
        "state_changed",
        snapshot => {

          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          this.setState({
            progress: progress
          });
          
          console.log("Inside Handle Upload\n state :", this.state);

        },
        error => {
          console.log("Error ==>", error);
        },
        () => {

          if(this.state.images){
            this.state.images.push(this.state.image.name);
          }else{
            this.setState({
              images : [this.state.image.name]
            })
          }
          
        
          console.log("Before getting image from storage\n state: ", this.state);
          storage
            .ref("images")
            .child(this.state.image.name)
            .getDownloadURL()
            .then(imageUrl => {

              if(this.state.urls){
                this.state.urls.push(imageUrl)
              }else{
                
                this.setState({
                  urls: [imageUrl]
                })
              }
              

              this.setState({
                url: imageUrl,
                imageString: imageUrl
              });
              this.setState({
                noImageSelected: false
              });
    
            });
        }
      );

      console.log("After Handle Upload\n state :", this.state);
    }else{

      this.setState({
        noImageSelected: true
      });
    }


  };

  
  handleLogout = () => {
    
    localStorage.removeItem("tokenId");
    const token = localStorage.tokenId;
   
    // window.location.href("/");
    // this.props.history.push("/");
    // runder = {<Redirect to='/Home'/>}
    this.setState({
      authenticated: false
    });
    this.props.location.state = null;
    // this.props.history.push('/');

  } 



  render() {


    const { authenticated, userId, userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients} = this.state;
  
    if(!authenticated){
      this.props.history.push('/');
      return <Redirect to='/'/>
    }
    // if(!this.props.location.state){
    //   this.props.history.push('/');
    //   return <Redirect to='/'/>;
    // }
  

    return (
      <div className="AddRecipe">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">

              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <Link to={{ 
                    pathname: '/Home',
                    state: 
                            this.props.location.state
                        
                    }}>
                    <div className="sidebar-brand-icon">
                        <i className="fas fa-blender">Home</i>
                    </div>
                </Link>
               

                <div className="topbar-divider d-none d-sm-block"></div>

                <Link className="nav-item"
                    to={{
                    pathname: "/ChatBox",
                    state: this.props.location.state
                    }} > <i className="fas fa-envelope fa-fw"></i>
                </Link>
                      {/* nav bar  */}

                      <ul className="navbar-nav ml-auto">

                          <li className="nav-item dropdown no-arrow d-sm-none">
                              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fas fa-search fa-fw"></i>
                              </a>
                            
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
                                      }}>
                                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                      Profile
                                  </Link>

                                  <Link className="dropdown-item" to = 
                                    {{
                                        pathname: "/Home",
                                        state: this.props.location.state,
                                        filter: this.props.location.state.userName
                                    }}>
                                    <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
                                    My Recipe
                                </Link>
                                
                                  <Link className="dropdown-item" to = {{
                                      pathname: "/AddRecipe",
                                      state: {
                                          state :this.props.location.state
                                      }
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
              

              <div className="container-fluid">
                <div className="container">

                  <h1 className="h3 mb-4 text-gray-800">ADD YOUR RECIPE HERE</h1>
                  <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                              <label htmlFor="mealName">Meal Name:</label>
                              <input type="text" className="form-control" name="mealName" value={mealName} onChange={this.onChange} placeholder="mealName" required />
                            </div>
                        
                            <div className="form-group">
                              <label htmlFor="mealType">Meal Type:</label>
                              <input type="text" className="form-control" name="mealType" value={mealType} onChange={this.onChange} placeholder="mealType" required/>
                            </div>

                            <div className="form-group">
                              <label htmlFor="dietAndHealth">Diet And Health:</label>
                              <input type="text" className="form-control" name="dietAndHealth" value={dietAndHealth} onChange={this.onChange} placeholder="dietAndHealth" required/>
                            </div>

                            <div className="form-group">
                              <label htmlFor="worldCuisine">World Cuisine:</label>
                              <input type="text" className="form-control" name="worldCuisine" value={worldCuisine} onChange={this.onChange} placeholder="worldCuisine" required/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="description">Description</label>
                              <textarea rows="5" cols="50" type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="give a general description about the recipe" required/>
                            </div>



                            <div className="form-group">
                              <label htmlFor="ingredients">Ingredients</label>
                              <textarea rows="10" cols="40" type="text" className="form-control" name="ingredients" value={ingredients} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
                            </div>
                            
                            <div className="form-group">
                              <label htmlFor="steps">Steps</label>
                              <textarea rows="10" cols="50" type="text" className="form-control" name="steps" value={steps} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
                            </div>
                              {/* Input handling in a different form not done yet*/}
                            {/* 
                            <div className="form-group">
                              <label htmlFor="Stpes">Ingredients</label>
                              
                              <div>
                               
                                <form onSubmit= {this.appendIngredients}>
                            
                                    <div id="dynamicInput">
                                      <div className="form-group">
                                        {this.state.ingredients.map(ingred => <input type = "text"  className= "form-control"  value={ingredient} key={ingred} />)}
                                        <br/>
                                      </div>
                                    </div>
                              
                                <button type="submit"  className="fas fa-plus btn btn-success" >
                                    CLICK ME TO ADD ingredients
                                </button>
                                </form>
                             </div>
                           
                            </div> */}

                            {/* <div className="form-group">
                              <label htmlFor="Stpes">Steps</label>
                              
                              <div>
                                <div >
                                  <div id="dynamicInput">
                                    <div className="form-group">
                                      {this.state.steps.map(s => <input type = "text" value={this.state.step}  onChange={this.handleSteps} className= "form-control"  key={s}/>)}
                                      <br/>
                                    </div>
                                  </div>
                                  <button type="button" className="fas fa-plus" onClick= {this.appendInput}>
                                      CLICK ME TO ADD steps
                                  </button>
                                </div>
                             </div>
                           
                            </div> */}
                            <button type="submit" ref={button => this.buttonElement = button} id="hiddenSubmit" className="btn btn-success" hidden>Submit</button>
                    </form>

                    <progress value={this.state.progress} max="100" />
                        <br />
                    <div className="input-group">
                      <div className="input-group-prepend">
                      
                    </div>
                         <span className="input-group-text recipe-ul" id="inputGroupFileAddon01" onClick={this.handleUpload} >Upload</span>
                    
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"  onChange={this.handleFileChange}/>
                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                      </div>
                    </div>
                            
                        <br/>

                      
                      <button type="submit"  className="btn btn-success" onClick={this.unhideSubmit}>Submit</button>
                    {/* 
                    <div>
                        <progress value={this.state.progress} max="100" />
                        <br />
                        <div>
                          <input type="file" onChange={this.handleFileChange}  />
                          <br /><br />
                          <button className= "btn btn-light" onClick={this.handleUpload}>Upload Image</button>
                        </div>

                        <br />
                    </div> */}


                    {
                    
                    (this.state.noImageSelected) && 
                    
                    
                    // (
                    
                      <div className="card-body text-center alert">
                        <h5 className="card-title">
                          Please Select Image
                        </h5>
                         {/* <p className="card-text">{hit.dietAndHealth}</p> */}
                      </div>
                    // )
                    
                    
                    }
                      <br />
                        {this.state.images.map((image, i )=>(
                          <div key={i}>{image}</div>
                        ))}
                      
                    </div>
                    <br /><br />
                    <div className="column">
                    <br />
                    </div>
                  </div>
                </div>
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
      </div>
    );
  }
}
export default AddRecipe;