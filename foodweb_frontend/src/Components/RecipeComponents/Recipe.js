import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Recipe: []
    };
  }

  // This loads the database with questions since our database is not deployed 
  // and for someone to test the app on their local machine this will mydefault load questions
  LoadDatabase = () => {
    axios.post('/app/all_recipes', {
      userId: "$%7Bquiz.id%7D",
      mealType: "breakfast",
      dietAndHealth: "Healthy", 
      worldCuisine: "Ethiopian",
      mealName:"Doro Wet",
      description:"",
      videoId: "",
      imageString: "",
    }).then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  
  }
// this sends qet request to get the Recipe from the database
  componentDidMount() {
    this.LoadDatabase();
    console.log("loaded");
    // axios.get('/startquiz')
    //   .then(res => {
    //     this.setState({ Recipe: res.data });
    //   });
  }
  // when rendering the Recipe are linked to their respective pages to enable dynamic routing
  render() {
    return (
      
      <div className="Recipe">
        <h2>Recipe</h2>
        <ul className="Topics">
          
         
        </ul>
      </div>
    );
  }
}

export default Recipe;
