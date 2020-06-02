import React, { useState } from 'react';
import GoogleLogin from "react-google-login";

import axios from 'axios';
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";


function Login() {

  const [errors, setErrors] = useState("");
  const history = useHistory();

  const handleGoogleResponseFailure = (res) => {
    console.log("=============FAILURE================");
    console.log(res);
    console.log("=============FAILURE================");
  }

  const handleGoogleResponse = (res) => {

    console.log(res)

    const { name, email, familyName, imageUrl, name: userName } = res.profileObj

    const userData = {
      name,
      email,
      familyName,
      imageString: imageUrl,
      userName: userName
    }

    //Keep the login session on the browser to keep someone logged in even after refreshing the browser
    localStorage.setItem('tokenId', `Bearer ${res.tokenId}`);
    axios.post('/signup', userData)
      .then(response => {

        // const { id } = response.data
        // localStorage.setItem('loggedin', true);
        // localStorage.setItem('user_id', id);
        history.push({
          pathname: "/Home",
          state: {userId: response.data.id,
                  userName: response.data.userName,
                  imageString: response.data.imageString
                }
          });
        })
      .catch((err) => {
      })
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
                      <form className="user">
                        <p><br /><br /><br />  </p>
               
                        <GoogleLogin
                          clientId="181796502496-ao4ccf9jjp5p5mgfol6ov6cc35dvqe9r.apps.googleusercontent.com"
                          buttonText="Sign in with Google"
                          scope='profile email'
                          width='240'
                          height='50'
                          longtitle='true'
                          theme='dark'
                          onSuccess={handleGoogleResponse}
                          onFailure={handleGoogleResponseFailure}
                          cookiePolicy={"single_host_origin"}
                        />


                      </form>
                      <hr />
                      <div className="text-center">
                        <Link to="/Login">
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