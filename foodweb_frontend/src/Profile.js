import React, { Component } from 'react'
import './Profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import dayjs from 'dayjs';  was used for converting time format
// import relativeTime from 'dayjs/Plugin/plugin/relativeTime';

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
        e.preventDefault();
        const{ aboutMe, userName} = this.state.UpdatedInfo;
        axios.put('app/edit_profile/'+this.props.location.state.userId, {aboutMe, userName})
          .then((result) => {
            console.log("After Posting new Contact - returned data: " + result.data);
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
        // dayjs.extend(relativeTime);
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <Link to={{ 
                        pathname: '/Home',
                        state: this.props.location.state
                        }}>
                        <div className="sidebar-brand-icon ">
                            <i className="fas fa-blender">Home</i>
                        </div>
                    </Link>

                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    {/* nav bar  */}

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <Link className="nav-item"
                        to={{
                        pathname: "/ChatBox",
                        state: this.props.location.state
                        }} > <i className="fas fa-envelope fa-fw"></i>
                    </Link>

                   
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
                                    <i className="fas  fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </Link>

                                <Link className="dropdown-item" to = 
                                    {{
                                        pathname: "/Home",
                                        state: this.props.location.state,
                                        filterByMyRecipe: true
                                    }}>
                                    <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
                                    My Recipe
                                </Link>

                             
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
                
              
            <div className="container main-secction">
        <div className="row div-background" >
            <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/504400/cd2e6e5aa573e9dc9a6da6f99fa557dc817cb78b.jpg"/>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12 user-left-part">
                <div className="col-md-3 col-sm-4 col-xs-12 user-profil-part pull-left">
                    <div className="row ">
                        <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                            <img src={this.state.User.imageString} className="rounded-circle"/>
                        </div>
                        
                        
                        <div className="row user-detail-row">
                            <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                                <div className="border"></div>
                                {/* // <p>FOLLOWER</p>
                                // <span>{this.state.User.numberOfFollowers}</span> */}
                            </div>                           
                        </div>
                       
                    </div>
                </div>
                <div className="col-md-9 col-sm-8 col-xs-12 pull-right profile-right-section">
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
                                <div className="col-md-12">
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
                                                    <div className="topbar-divider d-none d-sm-block"></div>

                                                    <div className="col-md-6 text-nowrap">
                                                        <p>{this.state.User.name}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2 text-nowrap">
                                                        <label>Created AT:</label>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                    <div className="topbar-divider d-none "></div>
                                                         <p>
                                                         {this.state.User.createdAt}
                                                        </p>     
                                                        {/* <p>{dayjs(this.state.User.createdAt).fromNow()}</p> */}
                                                    </div>
                                                </div>
                                                <div></div>
                                                <div className="row">
                                                    <div className="col-md-2 text-nowrap">
                                                        <label>Email:</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p> {this.state.User.email}</p>
                                                    </div>
                                                </div>
                                                <div></div>
                                                <div className="row">
                                                    <div className="col-md-2 text-nowrap">
                                                        <label>user Name:  </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p> {this.state.User.userName}</p>
                                                    </div>
                                                </div>
                                                <div></div>
                                                <div className="row">
                                                    <div className="col-md-2 text-nowrap">
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
 