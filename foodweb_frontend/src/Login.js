import React, { useState } from 'react';
import GoogleLogin from "react-google-login";

import axios from 'axios';
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";



function Login(props) {

  const [errors, setErrors] = useState("");
  const history = useHistory();

  
  const handleGoogleResponse = (res) => {
    console.log(res.profileObj);

    const userData = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      token: `Bearer ${res.tokenId}`
    }

    axios.post('/app/user/save', userData)
      .then(response => {

        console.log('======response======');
        console.log(response);

        console.log('======response.data======');
        console.log(response.data);
        localStorage.setItem('loggedin', true);
        console.log(response);
        history.push('/Components/Home');
        window.location.reload(false); 
       
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("totalNumCorrectAttemps", response.data.totalNumCorrectAttemps);
        localStorage.setItem("id", response.data.id);

      })
      .catch((err) => {
        console.log(`======response.data=====`);
          setErrors(err.response.data);
          console.log(`Errors: {errors}`);


      })
      .catch((err) => {

        setErrors(err.response.data);
        console.log(`Errors: {errors}`);
      });
  };


return (
   
  <div className="Login">
    <div className="container">


          <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user">
                          {/* <div className="form-group">
                            <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                          </div> */}
                          <div className="form-group">
                            {/* <div className="custom-control custom-checkbox small">
                              <input type="checkbox" className="custom-control-input" id="customCheck"/>
                              <label className="custom-control-label" for="customCheck">Remember Me</label>
                            </div> */}
                          </div>
                            {/* <Link to= "/Components/Home">
                              <p  className="btn btn-primary btn-user btn-block">
                                Login
                              </p>
                            </Link>   */}
                          <hr/>
                          <p href="index.html" className="btn btn-google btn-user btn-block">
                            <i className="fab fa-google fa-fw"></i> Login with Google
                          </p>
                        
                          <GoogleLogin

                            clientId="181796502496-d4n1skjr6tq9trd0mp0dp3gdlaasm3hp.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            scope='profile email'
                            width='240'
                            height='50'
                            longtitle='true'
                            theme='dark'
              
                            onSuccess={handleGoogleResponse}
                            onFailure={handleGoogleResponse}
                            cookiePolicy={"single_host_origin"}
                        />
                         
                        </form>
                        <hr/>
                        
                          <div className="text-center">
                            <Link  to="/Components/ProfileComponents/RegisterAccount">
                             <p className="small">Don't have account? Create an Account!</p>
                            </Link>
                          </div>
                          {errors.general && (
                            <p>
                              {errors.general}
                            </p>
                          )}
                      </div>
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
export default Login;

 /* <div classNameName="card align-items-center cad-n">
        <img classNameName="card-img-top" src={require('./img/no-img.png')} alt="Card image cap"/>
          <form>

            <p>Sign in with your social media account </p>
            <GoogleLogin

              clientId="181796502496-d4n1skjr6tq9trd0mp0dp3gdlaasm3hp.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              scope='profile email'
              width='240'
              height='50'
              longtitle='true'
              theme='dark'
 
              onSuccess={handleGoogleResponse}
              onFailure={handleGoogleResponse}
              cookiePolicy={"single_host_origin"}
          />


          </form>
      </div>  
      
      <div classNameName="align-items-center cad-n">

        <br />
        dont have an account ? <br />
        Sign up to <Link to="/SignUp"> create account</Link>
         <br />
        <br />
        {errors.general && (
          <p>
            {errors.general}
          </p>
        )}

      </div> */
    