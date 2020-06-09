import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { storage } from "./firebase";


class EditRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      progress: 0,
      steps: "",
      ingredients: "",
      noImageSelected: null
    };
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
    //load hits on start\








    
    if(this.props.location.Recipe){
      console.log("Recipe ====> Location", this.props.location.Recipe);
      this.setState({
        mealType: this.props.location.Recipe.mealType,
        dietAndHealth: this.props.location.Recipe.dietAndHealth,
        worldCuisine: this.props.location.Recipe.worldCuisine,
        mealName: this.props.location.Recipe.mealName,
        description: this.props.location.Recipe.description,
        imageString: this.props.location.Recipe.imageString,
        urls: this.props.location.Recipe.urls,

        steps: this.props.location.Recipe.steps,
        ingredients: this.props.location.Recipe.ingredients
      });
    }else{

      // this.setState({
      //   authenticated: false
      // })
      this.props.history.push({
        pathname: "/",
        state: this.props.location.state
      });

    }

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
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

 
   // This will edit a recipe
  //  editRecipe = (e) =>{
  //       e.preventDefault(); 
  //       const{ mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients } = this.state;
  //       axios.put('app/edit_recipe/'+this.props.match.params.id, 
  //       { userId, userName,  mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients }
  //       )
  //       .then((result) => {
  //           alert("Successfuly Updated");
  //           this.props.history.push("/Recipe")
  //       })
  //       .catch((err) => {
  //       console.log(`Errors: {errors}`);
  //       })
  //       .catch((err) => {
  //       console.log(`Errors: {errors}`);
  //       });
  //   }

    onSubmit = () => {
      // e.preventDefault();
      // debugger;
      console.log("State ===> ", this.state);
      const{ userId, userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients } = this.state;
      // debugger;
      axios.put('/edit_recipe/'+this.props.location.state.recipeId, { userId, userName,  mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients })
        .then((result) => {
          console.log("After Posting new Contact - returned data: " + result.data);
          const recipeID = result.data.id;
          console.log('======response.data======');
          console.log(result.data);
          // alert("Successfuly saved, Thank you!");
        
          this.props.history.push({
            pathname: "/Recipe",
            state: this.props.location.state
          });
        })
        .catch((err) => {
          console.log(`======response.data=====`);
          console.log(`Errors: {errors}`);
        })
        .catch((err) => {
          console.log(`Errors: {errors}`);
        });

    }





  handleFileChange = e => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0]
      });
      this.setState({
        noImageSelected: false
      });
      console.log("handleFileChange \nstate: ", this.state);
    }  
  };

  handleUpload= () => {
    console.log("handleUpload State:", this.state);
    if(this.state.image){

      this.setState({
        noImageSelected: false
      });
    
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
        console.log("handleUpload State: ==========================================");
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
              
                console.log("After Handle Upload\n state :", this.state);
    
            });
        }
      );
    }else{
      this.setState({
        noImageSelected: true
      });
    }
  };


  unhideSubmit = (e)=>{
    // React.document.getElementById('hiddenSubmit').click();
    this.buttonElement.click();
  }



  render() {

  
    const { authenticated, userId, userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients} = this.state;
  
    return (
      <div className="EditRecipe">
        <div id="wrapper">


          <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
               
                <Link to={{ 
                    pathname: '/Home',
                    state: 
                            this.props.location.state
                        
                    }}>
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-blender">Home</i>
                    </div>
                </Link>
              
                     
            </nav>
              


              <div className="container-fluid">
                <div className="container">

                  <h1 className="h3 mb-4 text-gray-800">Edit YOUR RECIPE HERE</h1>
                  <div className="row">
                    <div className="col-sm-6">

                    <form >
                            <div className="form-group">
                              <label htmlFor="mealName">Meal Name:</label>
                              <input type="text" className="form-control" name="mealName" value={mealName} onChange={this.onChange} placeholder="mealName" required />
                            </div>
                    
                            <div className="form-group">
                              <label htmlFor="mealName">Meal Type:</label>
                              <input type="text" className="form-control" name="mealType" value={mealType} onChange={this.onChange} placeholder="mealType" required />
                            </div>
                 
                            <div className="form-group">
                              <label htmlFor="worldCuisine">World Cuisine:</label>
                              <input type="text" className="form-control" name="worldCuisine" value={worldCuisine} onChange={this.onChange} placeholder="worldCuisine" required/>
                            </div>
                          
                            <div className="form-group">
                              <label htmlFor="dietAndHealth">Diet And Health:</label>
                              <input type="text" className="form-control" name="dietAndHealth" value={dietAndHealth} onChange={this.onChange} placeholder="dietAndHealth" required/>
                            </div>
                           
                            <div className="form-group">
                              <label htmlFor="description">Description</label>
                              <textarea rows="10" cols="50" type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="give a general description about the recipe" required/>
                            </div>
                           
                            <div className="form-group">
                              <label htmlFor="dietAndHealth">Diet And Health:</label>
                              <input type="text" className="form-control" name="dietAndHealth" value={dietAndHealth} onChange={this.onChange} placeholder="dietAndHealth" required/>
                            </div>
                           
                            <div className="form-group">
                              <label htmlFor="ingredients">Ingredients</label>
                              <textarea rows="10" cols="30" type="text" className="form-control" name="ingredients" value={ingredients} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
                            </div>
                           
                          <div className="form-group">
                            <label htmlFor="Stpes">Steps</label>
                            <textarea rows="10" cols="50" type="text" className="form-control" name="steps" value={steps} onChange={this.onChange} placeholder="Write a detail description of steps of the recipe" required/>
                          </div>
                       

                    </form>
                      
                    <div>
                        <progress value={this.state.progress} max="100" />
                        <br />
                        <div>
                          <input type="file" onChange={this.handleFileChange} />
                          <br /><br />

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


                          <button onClick={this.handleUpload}>Upload Image</button>
                        </div>
                      
                        <br />

                         <button type="submit" className="btn btn-success" onClick={this.onSubmit}>Edit</button>
                    </div>
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
export default EditRecipe;