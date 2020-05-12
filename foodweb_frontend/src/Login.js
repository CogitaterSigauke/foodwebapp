import React, { useState } from 'react';
import GoogleLogin from "react-google-login";

import axios from 'axios';
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";


function Login() {

  const [errors, setErrors] = useState("");
  const history = useHistory();

  
  const handleGoogleResponse = (res) => {
    console.log(res.profileObj);

    const userData = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      familyName: res.profileObj.familyName,
      imageString: res.profileObj.imageUrl,
      userName: res.profileObj.name
      
    }

    axios.post('/signup', userData)
      .then(response => {

        console.log('======response======');
        console.log(response);

        console.log('======response.data======');
        console.log(response.data);
        localStorage.setItem('loggedin', true);
        console.log(response);
        history.push('/Home');
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
                            <h1 className="h4 text-gray-900 mb-4">Login Here</h1>
                          </div>
      {/* <div className="card align-items-center cad-n">
        <img className="card-img-top" src={require('./img/no-img.png')} alt="Card image cap"/> */}
           <form className="user"> 
           {/* <p href="index.html" className="btn btn-google btn-user btn-block">
            <i className="fab fa-google fa-fw">  </i>
          </p> */}
            <p><br/><br/><br/>  </p>
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
                          <Link to= "/Login">
                            <p className="small" >Don't have an account? SignUp</p>
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