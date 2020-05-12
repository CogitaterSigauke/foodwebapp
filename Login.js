import React, { useState } from 'react';
import GoogleLogin from "react-google-login";
import './bootstrap.min.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import { useHistory } from "react-router-dom";


function Login() {

  const [errors, setErrors] = useState("");
  const history = useHistory();

  
  const handleGoogleResponse = (res) => {
    console.log(res.profileObj);

    const userData = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      token: `Bearer ${res.tokenId}`
    }

    axios.post('/signup', userData)
      .then(response => {

        console.log('======response======');
        console.log(response);

        console.log('======response.data======');
        console.log(response.data);
        localStorage.setItem('loggedin', true);
        console.log(response);
        history.push('/');
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

      <div className="card align-items-center cad-n">
        <img className="card-img-top" src={require('./img/no-img.png')} alt="Card image cap"/>
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
      
      <div className="align-items-center cad-n">

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

      </div>
    </div>

  
  );
}

export default Login;