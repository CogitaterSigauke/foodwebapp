import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Chat from './Chat';

class ChatBox extends React.Component{
// function ChatBox() {
    constructor(props) {
        super(props);
      }
    componentDidMount(){
        //load hits on start
        console.log("=============START CHATBOX=================");
        console.log(this.props);
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log(this.props.location.state.userId);
        console.log("=-=-=-=-=-=USER  NAME-=-=-=-=-=-=-")
        console.log(this.props.location.state.userName);
        console.log("=-=-=-=-=-=-=-=IMAGE-=-=-=-=-")
        console.log(this.props.location.state.imageString);
        
        
    }

    render() {
        return(
            <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">
           

                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <Link to={{ 
                        pathname: '/Home',
                        state:  this.props.location.state
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
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ this.props.location.state.userName}</span>
                            <img className="img-profile rounded-circle" src={this.props.location.state.imageString}/>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            
                                <Link className="dropdown-item" to = 
                                    {{
                                        pathname: "/Profile",
                                        state: this.props.location.state
                                    }}>
                                    <i className="fas fa-utensils fa-sm fa-fw mr-2 text-gray-400"></i>
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

            <Chat userName={this.props.location.state.userId} />
            
            </div>
            </div>
        );
    }
}
export default ChatBox;