import React from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import FoodGenerate from './FoodGenerate';

function Home() {

  const history = useHistory();
 
  const FoodLinks = [
    {
      title: 'Health and Diet',
      caption: 'healthy foods'
    },
    {
      title: 'World cusine',
      caption: 'some cultural foods'
    },
    {
      title: 'Main dishes',
      caption: 'Delicious dishes'
    },
  ]

  return (
    <div className="Home">
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <div className="intro-lead-in">Welcome to our My Recipes</div>
            <div className="intro-heading text-uppercase">It is nice to meet you!</div>
           {/* <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="Quizzes/Quiz">Start Quiz</a> */}
          </div>
        </div>
      </header>



      <FoodGenerate FoodLinks={FoodLinks}></FoodGenerate>


      <footer className="footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <span className="copyright">Copyright &copy; Your Website 2020</span>
            </div>
            <div className="col-md-4">
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-inline quicklinks">
                <li className="list-inline-item">
                  <a href="#something">Privacy Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default Home;
