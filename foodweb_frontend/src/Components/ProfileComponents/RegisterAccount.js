


import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64'; // Install with npm install react-file-base64 - https://www.npmjs.com/package/react-file-base64

class RegisterAccount extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            familyName: '',
            userName: '',
            email: ''
           
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
            {/* <h2>This is addRecipe Page</h2>
            {/* <img src={Logo} /> */}
            {/* <img src={recipeCard} /> */} */}
    
    
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
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user" id="exampleInputEmail" name = "email" value={email} onChange={this.onChange}  placeholder="Email Address"/>
                                        </div>
                                        <div className="form-group row">
                                            {/* <div className="col-sm-6">
                                                <input type="text" className="form-control form-control-user" id="exampleLastName" value={name} onChange={this.onChange}  placeholder="userName "/>
                                            </div>
                                            <div className="col-sm-6">
                                                <textarea type="text" className="form-control form-control-user" id="exampleLastName" value={name} onChange={this.onChange} placeholder="about Me "/>
                                            </div> */}
                                            {/* <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                                            </div>
    
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                            </div> */}
                                        </div>
                                        {/* <div className="form-group">
                                        <label htmlFor="imageString"></label>
                                            <FileBase64 onDone={this.getBase64File.bind(this)}/>
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label htmlFor="image"></label>
                                            <input type="file" onChange={this.fileSelectedHandler}/>
                                        </div>   */}
                                        {/* <Link to= "/Components/ProfileComponents/Login">  */}
    
                                            <button  type="submit" className="btn btn-primary btn-user btn-block">
                                                Register Account
                                            </button>
                                        {/* </Link> */}
                                        <hr/>
                                        {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                                            <i className="fab fa-google fa-fw"></i> Register with Google
                                        </a> */}
                                       
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








//             <div className="container">
//                 <div className="panel panel-default">
//                     <div className="panel-heading">
//                         <h3 className="panel-title">
//                             ADD User
//                         </h3>
//                     </div>
//                     <div className="panel-body">
                        
//                         <form onSubmit={this.onSubmit}>
//                             <div className="form-group">
//                                 <label htmlFor="name">Name:</label>
//                                 <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
//                             </div>
                           
//                             <div className="form-group">
//                                 <label htmlFor="phone">FamilyName:</label>
//                                 <input type="text" className="form-control" name="familyName" value={familyName} onChange={this.onChange} placeholder="family Name" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="email">User Name:</label>
//                                 <input type="text" className="form-control" name="userName" value={userName} onChange={this.onChange} placeholder="userName " />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="email">Email:</label>
//                                 <input type="email" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email Address" />
//                             </div>
// {/*                            
//                             <div className="form-group">
//                                 <label htmlFor="imageString">Profile Picture </label>
//                                 <FileBase64 onDone={this.getBase64File.bind(this)}/>
//                             </div> */}
//                             {/* <div className="form-group">
//                                 <label htmlFor="image">Profile Picture (Sending as FormData):</label>
//                                 <input type="file" onChange={this.fileSelectedHandler}/>
//                             </div> */}
//                             <button type="submit" className="btn btn-success">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
        );
    }
}

export default RegisterAccount;