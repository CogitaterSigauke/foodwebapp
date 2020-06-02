import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import axios from 'axios';
import Recipe from './Recipe';
class MyRecipeDetail extends Component {

    componentDidMount() {
        // console.log('/recipe/5eba3f7efd9c7b27cb32b8fa');
        axios.get('/MyRecipeDetail/'+this.props.match.params.id)
            .then(res => {
                this.setState({ Recipe: res.data });
                console.log(this.state.Recipe);
        });
        axios.get('/get_all_comments/'+this.props.match.params.id)
            .then(commments => {

            this.setState({LoadedComments: commments.data });
            console.log("Loaded Comments");
            console.log(this.state.LoadedComments);

        });
    }
        // delete a recipe
    // deleteRecipe = (e) =>{
    //     e.preventDefault(); 
    //     axios.delete('app//delete_recipe/KUGYJAGFVAHYIGSK')
    //     .then((result) => {
    //         alert("Successfuly Deleted");
    //         this.props.history.push("/Home")
    //     })
    //     .catch((err) => {
    //         console.log(`Errors: {errors}`);
    //     })
    //     .catch((err) => {
    //         console.log(`Errors: {errors}`);
    //     });
    // }

    // // This will edit a recipe
    // editRecipe = (e) =>{
    // e.preventDefault(); 
    // axios.put('app//delete_recipe/KUGYJAGFVAHYIGSK')
    // .then((result) => {
    //     alert("Successfuly Updated");
    //     this.props.history.push("/Home")
    //     })
    //     .catch((err) => {
    //     console.log(`Errors: {errors}`);
    //     })
    //     .catch((err) => {
    //     console.log(`Errors: {errors}`);
    //     });
    // }

    render() {
        return(
            <div>
                <Recipe/>
                <button type="button" class="btn btn-success">Success</button>
                <button type="button" class="btn btn-danger">Delete </button>

            </div>
        );
    }
}

export default MyRecipeDetail;