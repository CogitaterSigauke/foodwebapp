import React, { Component } from 'react'
import './Profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Profile extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            User: {},
            posts: {},
            UpdatedInfo: {
                aboutMe: "",
                userName: ""
            }
        };
    }
   
    
    onChange = (e) => {
      
        const state = this.state.UpdatedInfo
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    componentDidMount() {
        console.log(this)
        console.log(this.props.location.state.userId);
        axios.get('/user/'+this.props.location.state.userId)
            .then((response) => {
                this.setState({
                    User: response.data
                });
                console.log(this.state.User);
            })
            .catch((msg) => {
                console.log(msg)
            });
    }

    updateProfile = (e) => {
        debugger;
        e.preventDefault();

       
        const{ aboutMe, userName} = this.state.UpdatedInfo;
       
        axios.put('app/edit_profile/'+this.props.location.state.userId, {aboutMe, userName})
          .then((result) => {
            console.log("After Posting new Contact - returned data: " + result.data);
            console.log('======response.data======');
            console.log(result.data);
            alert("Successfuly saved, Thank you!");
          })
          .catch((err) => {
            console.log(`======response.data=====`);
            console.log(`Errors: {errors}`);
          })
          .catch((err) => {
            console.log(`Errors: {errors}`);
          });
    }

    render() {
        const{ aboutMe, userName} = this.state.UpdatedInfo;
        return (
           <div>
               
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <Link to={{ 
                        pathname: '/Home',
                        state: {
                                userId : this.state.User.userId,
                                userName: this.state.User.userName,
                                imageString: this.state.User.imageString
                            }
                        }}>
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-blender">Home</i>
                        </div>
                    </Link>
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                    </button>
                

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
                    <Link 
                        to={{
                        pathname: "/ChatBox",
                        state: {userId: this.props.location.state.userId,
                                userName: this.props.location.state.userName}
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
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            Message Center
                        </h6>
                        <Link to={ {pathname: "/ChatBox",state: {userId: this.props.location.state.userId} }}  className="dropdown-item d-flex align-items-center" >
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
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Redi</span>
                        <img className="img-profile rounded-circle" src={this.state.User.imageString}/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        
                        <Link className="dropdown-item" to = 
                        {{
                            pathname: "/Profile",
                            state: {userId: this.props.location.state.userId}
                            }} 
                            >
                            <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </Link>

                        
                            
                        
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </a>
                        
                        <Link className="dropdown-item" to = 
                        {{
                            pathname: "/MyRecipes",
                            state: {userId: this.props.location.state.userId}
                            }} 
                            >
                            <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
                            My Recipe
                        </Link>
                        <Link className="dropdown-item" to ={{
                            pathname: "/MyFavorites",
                            state: {userId: this.props.location.state.userId}
                            }} 
                        >
                            <i className="far fa-heart fa-sm fa-fw mr-2 text-gray-400"></i>
                            My Favorite Recipes
                        </Link>
                        <Link className="dropdown-item" to = {{
                    pathname: "/AddRecipe",
                    state: {
                        userId : this.state.User.userId,
                        userName: this.state.User.userName,
                        imageString: this.state.User.imageString
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
                
              
            <div className="container main-secction">
        <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80"/>
            </div>
            <div className="row user-left-part">
                <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                    <div className="row ">
                        <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                            <img src={this.state.User.imageString} className="rounded-circle"/>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                           <button id="btn-contact"  data-toggle="modal" data-target="#editProfile" className="btn btn-success btn-block follow">Edit Profile</button> 
                                                         
                        </div>
                        
                        <div className="row user-detail-row">
                            <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                                <div className="border"></div>
                                <p>FOLLOWER</p>
                                <span>{this.state.User.numberOfFollowers}</span>
                            </div>                           
                        </div>
                       
                    </div>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
                    <div className="row profile-right-section-row">
                        <div className="col-md-12 profile-header">
                            <div className="row">
                                <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                                    <h1>{this.state.User.userName}</h1>
                                    <h5>{this.state.User.email}</h5>
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-8">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#profile" role="tab" data-toggle="tab"><i className="fas fa-user-circle"></i> Personal Information</a>
                                        </li>
                                       
                                            
                                        </ul>
                                            <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane fade show active" id="profile">
                                            
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Name:</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{this.state.User.name}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Profile Created AT:</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{this.state.User.createdAt}</p>
                                                    </div>
                                                </div>
                                                <div></div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Email:</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p> {this.state.User.email}</p>
                                                    </div>
                                                </div>
                                                <div></div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>user Name:  </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p> {this.state.User.userName}</p>
                                                    </div>
                                                </div>
                                                <div></div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>About Me:</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p> {this.state.User.aboutMe}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>

    <div className="modal fade" id="editProfile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <form onSubmit={this.updateProfile}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="contact">Edit Profile</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>  
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="txtFullname">About Me</label>
                            <textarea rows="3" cols="20" type="text" id="txtFullname" className="form-control" name="aboutMe" value={aboutMe} onChange={this.onChange} placeholder={this.state.User.aboutMe}/>
                           
                        </div>
                        <div className="form-group">
                            <label htmlFor="txtFullname">userName</label>
                            <input type="text" id="txtFullname" className="form-control" name="userName"  value={userName} onChange={this.onChange} placeholder= {this.state.User.userName}/>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="txtEmail"></label>
                            <input type="text" id="txtEmail" className="form-control"/>
                        </div> */}
                    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-primary"  data-dismiss="modal">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

           </div>
        );
    }
}


export default Profile;
 
// id: '',
            // name: '',
            // email: '',
            // userName: '',
            // familyName: '',
            // aboutMe: '',
            // imageString: '',
            // numberOfFollowers: 0,
            // numberOfFollowing: 0,
            // numberOfPostedRecipes: 0,
            // numberOfFavouriteRecipes: 0,
            // // numberOfFollowers: 0 ,
            // active: "true", */}
{/* 

{/* 
                <div className="container emp-profile">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    <img src="data:image/png;base64,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" width="50%" height="5%" alt="image"></img> 
                                    <img src={imageString} width="50%" height="5%" alt="" />
                                    <div className="file btn btn-lg btn-primary">
                                        Change Photo
                                <input type="file" name="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5>
                                        {name}
                                    </h5>
                                    <dt></dt>
                                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About Me</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">♥</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <Link to={`/EditProfile/${id}`}> <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" /></Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-work">
                                    <center>
                                        <br></br>
                                        <Link to="/AboutMe">
                                            <div><button classNameName="Box" type="button">About Me</button></div>
                                        </Link>
                                        <br></br>
                                        <Link to="/MyFavorites">
                                            <div><button className="profile-edit-btn" type="button">My Favorites</button></div>
                                        </Link>
                                        <br></br>
                                        <Link to="/Recipes">
                                            <div><button className="profile-edit-btn" type="button">My Recipes</button></div>
                                        </Link>
                                        <br></br>
                                        <Link to={`/Block/${id}`}>
                                            <div><button className="profile-edit-btn" type="button">Block User</button></div>
                                        </Link>
                                        <br></br>
                                        <Link to="/Setting">
                                            <div><button className="profile-edit-btn" type="button">Setting</button></div>
                                        </Link>
                                    </center>
                                </div>
                            </div> */}
                            {/* <div className="col-md-8"> */}
                                {/* <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>UserName</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{UserName}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>FamilyName</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{familyName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number of Followers</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfFollowers}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number of Following</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfFollowing}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number Of Posted Recipes</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfPostedRecipes}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number Of Favourite Recipes</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfFavouriteRecipes}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Active </label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{active}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            {/* // </div> */}
                  