import React, { Component } from 'react'
import './Block.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import algoliasearch from 'algoliasearch/lite';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            email: '',
            userName: '',
            familyName: '',
            aboutMe: '',
            imageString: '',
            numberOfFollowers: 0,
            numberOfFollowing: 0,
            numberOfPostedRecipes: 0,
            numberOfFavouriteRecipes: 0,
            // numberOfFollowers: 0 ,
            active: "true",
            posts: {}
        };

    }
    User = (name) => {

    }

    SearchBar = () => {
        return <input type="text" id="fname" name="fname" />
    }

    Button = () => {
        return <button></button>
    }
    componentDidMount() {
        const { id } = this.props.match.params

        axios.get(`/user/${id}`)
            .then((response) => {

                const { name, email, aboutMe, familyName, imageString, numberOfFollowers, numberOfFollowing, numberOfPostedRecipes, numberOfFavouriteRecipes, active } = response.data

                this.setState({
                    name, email, aboutMe, familyName, imageString, id, numberOfFollowers, numberOfFollowing, numberOfPostedRecipes, numberOfFavouriteRecipes, active
                })
            })
            .catch((msg) => {
                console.log(msg)
            });
    };

    render() {
        const { name, email, aboutMe, familyName, imageString, UserName, numberOfFollowers, numberOfFollowing, numberOfPostedRecipes, numberOfFavouriteRecipes, active } = this.state

        const id = localStorage.getItem('user_id')

        return (
            <div>
                <div className="container emp-profile">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    {/* <img src="data:image/png;base64,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" width="50%" height="5%" alt="image"></img>  */}
                                    <img src={imageString} width="50%" height="5%" alt="" />
                                    <div className="file btn btn-lg btn-primary">
                                        Change Photo
                                <input type="file" name="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5>
                                        {name}
                                    </h5>
                                    <dt></dt>
                                    {/* <p className="proile-rating">RANKINGS : <span>8/10</span></p> */}
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About Me</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">♥</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <Link to={`/EditProfile/${id}`}> <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" /></Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-work">
                                    <center>
                                        <br></br>
                                        {/* <Link to="/AboutMe">
                                            <div><button classNameName="Box" type="button">About Me</button></div>
                                        </Link> */}
                                        <br></br>
                                        <Link to="/MyFavorites">
                                            <div><button className="profile-edit-btn" type="button">My Favorites</button></div>
                                        </Link>
                                        <br></br>
                                        <Link to="/Recipes">
                                            <div><button className="profile-edit-btn" type="button">My Recipes</button></div>
                                        </Link>
                                        <br></br>
                                        <Link to="/Setting">
                                            <div><button className="profile-edit-btn" type="button">Setting</button></div>
                                        </Link>
                                    </center>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>UserName</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{UserName}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>FamilyName</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{familyName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number of Followers</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfFollowers}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number of Following</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfFollowing}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number Of Posted Recipes</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfPostedRecipes}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Number Of Favourite Recipes</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{numberOfFavouriteRecipes}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Active </label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{active}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default Profile