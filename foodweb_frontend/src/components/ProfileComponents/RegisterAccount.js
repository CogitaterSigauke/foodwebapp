import React from 'react';
import { Link } from 'react-router-dom'
//import ReactDom from 'react-dom';

// import Logo from '../../logo.svg';
// import recipeCard from './addRecipe.jpg';
class RegisterAccount extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div className="RegisterAccount">
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
                                        <form className="user" onSubmit={this.handleSubmit}>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="First Name" />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                </div>

                                                <div className="col-sm-6">
                                                    <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" />
                                                </div>
                                            </div>
                                            <Link to="/Components/ProfileComponents/Login">

                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Register Account
                                            </button>
                                            </Link>
                                            <hr />
                                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Register with Google
                                        </a>

                                        </form>
                                        <hr />

                                        <div className="text-center">
                                            <Link to="/Components/ProfileComponents/Login">
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