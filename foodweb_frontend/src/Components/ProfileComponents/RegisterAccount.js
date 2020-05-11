import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64'; 

class RegisterAccount extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            familyName: '',
            userName: '',
            email: '',
            imageString: ''
           
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    // fileSelectedHandler = (e) => {
    //     console.log("Selected file of size: " + e.target.files[0].size);
    //     this.setState({
    //         image: e.target.files[0],
    //     })
    // }

        // This is called after the user inputs an image in the FileBase64 input and its base64 string is encoded in the base64 property.
    // getBase64File(file) {
    //     console.log("Uploaded image converted to base 64 " + file.base64);
    //     debugger;
    //     this.setState({
    //         imageString: file.base64
    //     })
    // }

    onSubmit = (e) => {
        e.preventDefault();
        debugger;
        const {name, familyName, userName, email} = this.state;
        debugger;
        axios.post('/app/home', { name: name, familyName: familyName, userName: userName, email: email })
            .then((result) => {
                console.log("After Posting new Contact - returned data: " + result.data);
                // const contactID = result.data.id;

                // // Only upload the image if it exists
                // if( image != null ) {
                //     const fd = new FormData();
                //     fd.append('file', image);
                //     axios.post('/' + contactID + '/image-upload', fd)
                //         .then((result) => {
                //             console.log("Finished image upload");
                //             this.props.history.push("/");
                //         });
                // }
                // else {
                //     this.props.history.push("/");
                // }
            });
    }

    render() {
        const {name, familyName, userName, email} = this.state;
        return (
            <div className = "RegisterAccount">
            <div className="container">
    
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                  
                  
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form className="user" onSubmit={this.onSubmit}>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user" id="exampleFirstName" name = "name" value={name} onChange={this.onChange} placeholder="Name"/>
                                            </div>
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user" id="exampleFirstName" name = "familyName" value={familyName} onChange={this.onChange} placeholder="Family Name"/>
                                            </div>
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user" id="exampleFirstName" name = "userName" value={userName} onChange={this.onChange} placeholder="user Name"/>
                                            </div>
                                          
                                        </div>
                                        
                                        <div className="form-group row">
                                            
                                            <div className="col-sm-6">
                                                <textarea type="text" className="form-control form-control-user" id="exampleLastName" value={name} onChange={this.onChange} placeholder="about Me "/>
                                            </div>
                                        </div>
                                            <button  type="submit" className="btn btn-primary btn-user btn-block">
                                                Register Account
                                            </button>
                                    </form>
                                    <hr/>
                                    
                                    <div className="text-center">
                                        <Link to= "/Components/ProfileComponents/Login">
                                            <p className="small" >Already have an account? Login!</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
    
            </div>
        </div>
        );
    }
}

export default RegisterAccount;