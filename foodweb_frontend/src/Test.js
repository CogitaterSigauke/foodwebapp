// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Redirect } from "react-router-dom";
// import { storage } from "./firebase";


// class AddRecipe extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: '',
//       userName: '',
//       mealType: '',
//       dietAndHealth: '',
//       worldCuisine: '',
//       mealName: '',
//       description: '',
//       imageString: '' , 
//       videoId: "",
//       urls: [],
//       steps: "",
//       ingredients: "",


//       passedUserId: false,
//       passedUserName: false,
//       passedMealType: false,
//       passedDietAndHealth: false,
//       passedWorldCuisine: false,
//       passedMealName: false,
//       passedDescription: false,
//       // passedImageString: false , 
//       passedVideoId: false,
//       // passedUrls: false,
//       passedSteps: false,
//       passedIngredients: false
      
//     };
//   }

  
//   onChange = (e) => {
//     // if(e.target.name == "image1Url" || e.target.name =="image2Url" || e.target.name =="image3Url"){
//     //     this.state.urls.push(e.target.value);
//     // }else{
//         const state = this.state;
//         state[e.target.name] = e.target.value;
//         this.setState(state);
//     // }
    
//   }
//   unhideSubmit = (e)=>{
//     this.buttonElement.click();
//   }

//   onSubmit = (e) => {
//     e.preventDefault();
//     console.log("onsubmit", this.state);
   
//     const{ userId, userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients, urls } = this.state;
 
//       axios.post('/user/add/recipe/', { urls, userId, userName,  mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients })
//         .then((result) => {
//           const recipeID = result.data.id;
        
//             if(result.data.userId == userId){
//                 this.setState({
//                     passedUserId: true
//                 })
//             }
//             if(result.data.userName == userName){
//                 this.setState({
//                     passedUserName: true
//                 })
//             }
//             if(result.data.mealType == mealType){
//                 this.setState({
//                     passedMealType: true
//                 })
//             }
//             if(result.data.dietAndHealth == dietAndHealth){
//                 this.setState({
//                     passedDietAndHealth: true
//                 })
//             }
//             if(result.data.worldCuisine == worldCuisine){
//                 this.setState({
//                     passedWorldCuisine: true
//                 })
//             }
//             if(result.data.mealName == mealName){
//                 this.setState({
//                     passedMealName: true
//                 })
//             }
//             if(result.data.description == description){
//                 this.setState({
//                     passedDescription: true
//                 })
//             }
//             if(result.data.imageString == imageString){
//                 this.setState({
//                     passedImageString: true
//                 })
//             }
//             // if(result.data.videoId == videoId){
//             //     this.setState({
//             //         passedVideId: true
//             //     })
//             // }
//             if(result.data.steps == steps){
//                 this.setState({
//                     passedSteps: true
//                 })
//             }
//             if(result.data.ingredients == ingredients){
//                 this.setState({
//                     passedIngredients: true
//                 })
//             }
//             // if(result.data.urls == urls){
//             //     this.setState({
//             //         passedUrls: true
//             //     })
//             // }
//             console.log("afterSubmit", this.state);
           
//         })
//         .catch((err) => {
//           console.log(`Errors: {errors}`);
//         })
//         .catch((err) => {
//           console.log(`Errors: {errors}`);
//         });

//   }


//   render() {


//     const { userId, userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId, steps, ingredients} = this.state;
  
  

//     return (
//       <div className="AddRecipe">
//         <div id="wrapper">
//           <div id="content-wrapper" className="d-flex flex-column">
//             <div id="content">

//               <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
               
//                       {/* nav bar  */}

//                       <ul className="navbar-nav ml-auto">

//                           <li className="nav-item dropdown no-arrow d-sm-none">
//                               <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                   <i className="fas fa-search fa-fw"></i>
//                               </a>
                            
//                           </li>

                         

//                           <div className="topbar-divider d-none d-sm-block"></div>

//                           <li className="nav-item dropdown no-arrow">
//                               <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                               <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.userName}</span>
//                               <img className="img-profile rounded-circle" src={this.state.imageString}/>
//                               </a>
//                               <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                              
                                

//                               </div>
//                           </li>
//                       </ul>
//               </nav>
              

//               <div className="container-fluid">
//                 <div className="container">

//                   <h1 className="h3 mb-4 text-gray-800">Test ADD RECIPE End Point</h1>
//                   <div className="row">
//                     <div className="col-sm-6">
//                         <form onSubmit={this.onSubmit}>
//                             <div className="form-group">
//                               <label htmlFor="mealName">Meal Name:</label>
//                               <input type="text" className="form-control" name="mealName" value={mealName} onChange={this.onChange} placeholder="mealName" required />
//                             </div>
                        
//                             <div className="form-group">
//                               <label htmlFor="mealType">Meal Type:</label>
//                               <input type="text" className="form-control" name="mealType" value={mealType} onChange={this.onChange} placeholder="mealType" required/>
//                             </div>

//                             <div className="form-group">
//                               <label htmlFor="dietAndHealth">Diet And Health:</label>
//                               <input type="text" className="form-control" name="dietAndHealth" value={dietAndHealth} onChange={this.onChange} placeholder="dietAndHealth" required/>
//                             </div>

//                             <div className="form-group">
//                               <label htmlFor="worldCuisine">World Cuisine:</label>
//                               <input type="text" className="form-control" name="worldCuisine" value={worldCuisine} onChange={this.onChange} placeholder="worldCuisine" required/>
//                             </div>
//                             <div className="form-group">
//                               <label htmlFor="description">Description</label>
//                               <textarea rows="5" cols="50" type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="give a general description about the recipe" required/>
//                             </div>



//                             <div className="form-group">
//                               <label htmlFor="ingredients">Ingredients</label>
//                               <textarea rows="10" cols="40" type="text" className="form-control" name="ingredients" value={ingredients} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div>
                            
//                             <div className="form-group">
//                               <label htmlFor="steps">Steps</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="steps" value={steps} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div>
                         
//                             <div className="form-group">
//                               <label htmlFor="userId">UserId</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="userId" value={userId} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div>
//                             <div className="form-group">
//                               <label htmlFor="userName">userName</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="userName" value={userName} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div>
//                             {/* <div className="form-group">
//                               <label htmlFor="imageString">imageString</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="imageString" value={imageString} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div> */}
//                             {/* <div className="form-group">
//                               <label htmlFor="image1Url">image1Url</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="image1Url" value="image1Url" onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div>
//                             <div className="form-group">
//                               <label htmlFor="image2Url">image2Url</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="image2Url" value="image2Url" onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div>
//                             <div className="form-group">
//                               <label htmlFor="image3Url">image3Url</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="image3Url" value="image3Url" onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div> */}
//                             <div className="form-group">
//                               <label htmlFor="videoId">videoId</label>
//                               <textarea rows="10" cols="50" type="text" className="form-control" name="videoId" value={videoId} onChange={this.onChange} placeholder="Write the list of ingredients needed to make this recipe" required/>
//                             </div>
                            
//                             <button type="submit" id="hiddenSubmit" className="btn btn-success" >Submit</button>
//                     </form>
                    

//                     <div id="unit-test" className="test">
//                     <h1>RECIPE RESULTS</h1>

//                         {
//                             (this.state.passedUserName)
//                             && <div>

//                                <h3 className="passed">  User Name: Passed </h3>

//                             </div>
//                         } 
                        
//                         {
//                             (!this.state.passedUserName)
//                             && <div>

//                                 <h3 className="failed">  User Name: Failed</h3>

//                             </div>
//                         } 
                        

//                                                 {
//                             (this.state.passedMealName)
//                             && <div>

//                                <h3 className="passed">  Meal Name : Passed </h3>

//                             </div>
//                         } 
                        
//                         {
//                             (!this.state.passedMealName)
//                             && <div>

//                                 <h3 className="failed">  Meal Name: Failed</h3>

//                             </div>
//                         }  
                        
//                                                 {
//                             (this.state.passedDietAndHealth)
//                             && <div>

//                                <h3 className="passed">  Diet And Health: Passed </h3>

//                             </div>
//                         } 
                        
//                         {
//                             (!this.state.passedDietAndHealth)
//                             && <div>

//                                 <h3 className="failed">  Diet And Health</h3>

//                             </div>
//                         }  
                        
//                                                 {
//                             (this.state.passedDescription)
//                             && <div>

//                                <h3 className="passed">  Description: Passed </h3>

//                             </div>
//                         } 
                        
//                         {
//                             (!this.state.passedDescription)
//                             && <div>

//                                 <h3 className="failed">  Description: Failed</h3>

//                             </div>
//                         }  
                        
//                                                 {
//                             (this.state.passedIngredients)
//                             && <div>

//                                <h3 className="passed">  Ingredients: Passed </h3>

//                             </div>
//                         }
                         
//                         {
//                             (!this.state.passedIngredients)
//                             && <div>

//                                 <h3 className="failed">  Ingredients: Failed</h3>

//                             </div>
//                         }  
                        
//                                                 {/* {
//                             (this.state.passedImageString)
//                             && <div>

//                                <h3 className="passed">  ImageString: Passed </h3>

//                             </div>
//                         } 
//                         {
//                             (!this.state.passedImageString)
//                             && <div>

//                                 <h3 className="failed">  ImageString: Failed</h3>

//                             </div>
//                         }   */}
                                            
//                                                 {/* {
//                             (this.state.passedVideoId)
//                             && <div>

//                                <h3 className="passed">  videoId: Passed </h3>

//                             </div>
//                         } 
//                         {
//                             (!this.state.passedVideoId)
//                             && <div>

//                                 <h3 className="failed">  videoId: Failed</h3>

//                             </div>
//                         }   */}
//                                                 {/* {
//                             (this.state.passedUrls)
//                             && <div>

//                                <h3 className="passed">  urls: Passed </h3>

//                             </div>
//                         } 
//                         {
//                             (!this.state.passedUrls)
//                             && <div>

//                                 <h3 className="failed">  urls: Failed</h3>

//                             </div>
//                         }   */}
//                                                 {
//                             (this.state.passedSteps)
//                             && <div>

//                                <h3 className="passed">  steps: Passed </h3>

//                             </div>
//                         } 
//                         {
//                             (!this.state.passedSteps)
//                             && <div>

//                                 <h3 className="failed">  steps: Failed</h3>

//                             </div>
//                         }                                        
                         

//                     </div>
                            
                        
                        
//                         <br/>
                    
//                     </div>
//                     <br /><br />
//                     <div className="column">
//                     <br />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <footer className="sticky-footer bg-white">
//               <div className="container my-auto">
//                 <div className="copyright text-center my-auto">
//                   <span>Copyright &copy; My Recipes 2020</span>
//                 </div>
//               </div>
//             </footer>

//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default AddRecipe;
