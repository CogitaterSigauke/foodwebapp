import React,  { Component }  from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom';
import FileBase64 from 'react-file-base64'; 
import axios from 'axios';
import { useHistory } from "react-router-dom";
class AddRecipe extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
        userName :'',
        mealType :'',
        dietAndHealth: '',
        worldCuisine: '',
        mealName :'',
        description: '',
        imageString:'https://mdbootstrap.com/img/Photos/Horizontal/Food/full%20page/9.jpg', //BASE 64 STRING ENCODED FROM THE CLIENT SIDE
        videoId :'',
      
      };
  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
}

fileSelectedHandler = (e) => {
    console.log("Selected file of size: " + e.target.files[0].size);
    this.setState({
        image: e.target.files[0],
    })
}

    // This is called after the user inputs an image in the FileBase64 input and its base64 string is encoded in the base64 property.
getBase64File(file) {
    console.log("Uploaded image converted to base 64 " + file.base64);
    debugger;
    this.setState({
        imageString: file.base64
    })
}

onSubmit = (e) => {
    e.preventDefault();
    // id=  localStorage.getItem("id");
    const { userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId } = this.state;

    axios.post('/user/add/recipe/+this.props.match.params.id', {userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId })
        .then((result) => {
            console.log("After Posting new Contact - returned data: " + result.data);
            const recipeID = result.data.id;

            // // Only upload the image if it exists
            // if( imageString != null ) {
            //     const fd = new FormData();
            //     fd.append('file', imageString);
            //     axios.post('/' + contactID + '/image-upload', fd)
            //         .then((result) => {
            //             console.log("Finished image upload");
            //             this.props.history.push("/");
            //         });
            // }
            // else {
            //     this.props.history.push("/");
            // }
            console.log('======response.data======');
            console.log(result.data);
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
        ;

   
}


render() {

  const { userName, mealType, dietAndHealth, worldCuisine, mealName, description, imageString, videoId } = this.state;

  return ( 
    <div className = "AddRecipe">
        <div id="wrapper">

  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

  <Link to= "/Home" className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
    <div className="sidebar-brand-icon rotate-n-15">
    <i className="fas fa-blender"></i>
    </div>
    <div className="sidebar-brand-text mx-3">My Recipes <sup><i className="fas fa-laugh-wink"></i></sup></div>
  </Link>

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
        <a className="collapse-item" href="buttons.html">Cocktail</a>
        <a className="collapse-item" href="cards.html">Hot Drinks</a>
        <a className="collapse-item" href="cards.html">Smoothies</a>
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
        <a className="collapse-item" href="utilities-color.html">Ice Creams</a>
        <a className="collapse-item" href="utilities-border.html">Cakes</a>
        <a className="collapse-item" href="utilities-animation.html">Cookies</a>
        <a className="collapse-item" href="utilities-animation.html">Fruits</a>
        
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
        <a className="collapse-item" href="utilities-color.html">Ethiopian</a>
        <a className="collapse-item" href="utilities-border.html">Indian</a>
        <a className="collapse-item" href="utilities-animation.html">Chinese</a>
        <a className="collapse-item" href="utilities-animation.html">Italian</a>
        <a className="collapse-item" href="utilities-animation.html">Mexican</a>
        <a className="collapse-item" href="utilities-animation.html">American</a>
        
      </div>
    </div>
  </li>

  {/* <hr className="sidebar-divider"/>

  <div className="sidebar-heading">
    Main Dish
  </div> */}

  <li className="nav-item active">
    <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
      <i className="fas fa-fw fas fa-blender"></i>
      <span>Meals</span>
    </a>
    <div id="collapsePages" className="collapse show" aria-labelledby="headingPages" data-parent="#accordionSidebar">
      <div className="bg-white py-2 collapse-inner rounded">
        <h6 className="collapse-header">Main Dishes</h6>
        <a className="collapse-item active" href="login.html">Breakfast</a>
        <a className="collapse-item active" href="register.html">Lunch</a>
        <a className="collapse-item active" href="forgot-password.html">Dinner</a>
        <div className="collapse-divider"></div>
        <h6 className="collapse-header">Side Dishes</h6>
        <a className="collapse-item active" href="404.html">Vegetable</a>
        <a className="collapse-item active" href="blank.html">Grain</a>
        <a className="collapse-item active" href="blank.html">Seasonal</a>
      </div>
    </div>
  </li>

  <li className="nav-item">
    <a className="nav-link" href="charts.html">
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
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>
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
                <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say to all dogs even if they aren't good...</div>
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
            <Link to = "/Components/ProfileComponents/AddRecipe">
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

      <h1 className="h3 mb-4 text-gray-800">ADD YOUR RECIPE HERE</h1>
      <div className="row">
        <div className="col-sm-6"> 
        <form onSubmit={this.onSubmit}>

        <div className="form-group">
            <label htmlFor="userName">userName:</label>
            <input type="text" className="form-control " name="userName" value={userName} onChange={this.onChange} placeholder="Name" />
        </div>
        <div className="form-group">
            <label htmlFor="mealType">mealType:</label>
            <input type="text" className="form-control" name="mealType" value={mealType} onChange={this.onChange} placeholder="mealType" />
        </div>
        <div className="form-group">
            <label htmlFor="dietAndHealth">dietAndHealth:</label>
            <input type="text" className="form-control" name="dietAndHealth" value={dietAndHealth} onChange={this.onChange} placeholder="dietAndHealth" />
        </div>
        <div className="form-group">
            <label htmlFor="worldCuisine">worldCuisine:</label>
            <input type="text" className="form-control" name="worldCuisine" value={worldCuisine} onChange={this.onChange} placeholder="worldCuisine" />
        </div>
       
        <div className="form-group">
            <label htmlFor="mealName">mealName:</label>
            <input type="text" className="form-control" name="mealName" value={mealName} onChange={this.onChange} placeholder="mealName" />
        </div>
        <div className="form-group">
            <label htmlFor="description">description:</label>
            <input type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="description" />
        </div>
        {/* <div className="form-group">
            <label htmlFor="imageBase64"></label>
            <FileBase64 onDone={this.getBase64File.bind(this)}/>
        </div> */}
        {/* <div className="form-group">
            <label htmlFor="image">Profile Picture (Sending as FormData):</label>
            <input type="file" onChange={this.fileSelectedHandler}/>
        </div> */}
        <button type="submit" className="btn btn-success">Submit</button>
       
    </form>
        </div>
        
          <div className="column">
          <h1 className="h3 mb-4 text-gray-800">OR PICK HERE(coming soon)</h1>
            {/* card one */}
            <form>
            
              <div className="dropdown no-arrow mb-4">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                  <span className="icon text-white-50">
                    <i className="fas fa-plus"></i>
                  </span>
                    <span className="text">Meal Type </span> 

                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Breakfast</a>
                  <a className="dropdown-item" href="#">Lunch</a>
                  <a className="dropdown-item" href="#">Dinner</a>
                  <a className="dropdown-item" href="#">Drinks</a>
                  <a className="dropdown-item" href="#">Deserts</a>

                </div>

              </div>
             
              <div className="dropdown no-arrow mb-4">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                  <span className="icon text-white-50">
                    <i className="fas fa-plus"></i>
                  </span>
                    <span className="text">Dish Type </span> 

                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Main Dish</a>
                  <a className="dropdown-item" href="#">Side Dish</a>
                
                </div>

               </div>
        
              <div className="dropdown no-arrow mb-4">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                  <span className="icon text-white-50">
                    <i className="fas fa-plus"></i>
                  </span>
                    <span className="text">World Cuisine </span> 

                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Ethiopian</a>
                  <a className="dropdown-item" href="#">American</a>
                  <a className="dropdown-item" href="#">Chinese</a>
                  <a className="dropdown-item" href="#">Korean</a>
                  <a className="dropdown-item" href="#">Italian</a>
                  <a className="dropdown-item" href="#">All Rounded</a>
                </div>

              </div>

              <div className="dropdown no-arrow mb-4">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="icon text-white-50">
                    <i className="fas fa-plus"></i>
                  </span>
                    <span className="text">Seasonal </span> 
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Yes</a>
                  <a className="dropdown-item" href="#">No</a>
                </div>
              </div>

              <div className="dropdown no-arrow mb-4">

                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="icon text-white-50">
                    <i className="fas fa-plus"></i>
                  </span>
                    <span className="text">Ingredients </span> 
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Diary </a>
                  <a className="dropdown-item" href="#">Meat</a>
                  <a className="dropdown-item" href="#">Vegetable </a>
                  <a className="dropdown-item" href="#">Fruits</a>
                  <a className="dropdown-item" href="#">Spices </a>
                  <a className="dropdown-item" href="#">Seasoning</a>
                  <a className="dropdown-item" href="#">Oil</a>
                </div>

              </div>
              <textarea  rows="10" cols="40" className="form-control form-control-user" id="exampleFirstName" placeholder="Enter the Steps here in detail..."/>
                <input type="file" id="myFile" name="filename"/>
                <input type="submit"/>
            </form>  
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
export default AddRecipe;
