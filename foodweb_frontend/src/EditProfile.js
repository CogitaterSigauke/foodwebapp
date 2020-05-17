import React, { Component } from 'react'
import './Block.css';
// import './bootstrap.min.css';
// import logo from './logo.svg'
import axios from 'axios'
import { Link } from 'react-router-dom';



class EditProfile extends Component {
    state = {
        email: "",
        password: "",
        name: ""
    }
    componentDidMount() {

        this.setState({
            name: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("totalNumCorrectAttemps")
        })

    }
    onPressSubmit = (e) => {

        e.preventDefault()

        console.log(this.state.password)

        this.setState({
            email: "",
            password: "",
            name: ""
        })
    }
    onKeyPress = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // 여기서부터 
    User = (name) => {

    }

    SearchBar = () => {
        return <input type="text" id="fname" name="fname" />
    }

    Button = () => {
        return <button></button>
    }

    render() {
        const { users } = this.state
        const { email, password, name } = this.state
        // [{ name: 'User_1' }, { name: 'User_2' }, { name: 'User_3' }]


        return (
            <div>
                {/* 이게 해더 */}
                <div id="header">
                    <Link to="/">
                        <div class="Box1" /><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSyYa4M_JHxfIfN9bYiLrZ1BUUo6N8lHjAkD_XFrcHiysbIoLh&usqp=CAU" width="5.5%" height="5%" alt="image"></img>
                    </Link>
                    <Link to="/Components/RecipeComponents/AddRecipe">
                        <button class="button1" type="button">Add recipe</button>
                    </Link>
                    <Link to="/">
                        <button class="button2" type="button">Log Out</button>
                    </Link>
                </div><br></br><br></br>
                {/* 이게 바디  */}
                <div style={{ display: 'flex' }}>

                    {/* 이게 사이드바 */}
                    <center>
                        <div style={{ background: 'white' }}>


                            <Link to="/Components/ProfileComponents/Settings">
                                <div><button class="Box2" type="button">Setting</button></div>
                            </Link>
                        </div>
                    </center>
                    <div class="parent">
                        {/* <input class="search__input" type="text" placeholder="Search"> */}
                        <this.SearchBar /> <button class="button">Search</button>
                        <div><img src="data:image/png;base64,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" width="50%" height="5%" alt="image"></img></div>
                        <br></br>
                        <div className="Portfolio">
                            <div className="align-items-Right cad-n">
                                <fieldset>
                                    <legend>Profile </legend>
                                    <form id="to-do-form" onSubmit={this.onPressSubmit}>
                                        <dt>Input</dt>

                                        <dt>Email</dt><input type="text" placeholder="Type Your Email" value={email} onChange={this.onKeyPress} name={'email'} />
                                        <dd>{email}</dd>

                                        <dt>Name</dt>
                                        <input type="text" placeholder="Type your Name" value={name} onChange={this.onKeyPress} name={'name'} />
                                        <dd>{name}</dd>
                                        <dt>New Password</dt>
                                        <input type="password" placeholder="Type Your password" value={password} onChange={this.onKeyPress} name={'password'} />
                                        <dt>Confirm password</dt>
                                        <input type="password" placeholder="Confirm password" value={password} onChange={this.onKeyPress} name={'password'} />
                                        <dt></dt>
                                    </form>
                                </fieldset>
                            </div>

                            <header>
                                <button type="Edit">Edit</button>

                            </header>



                        </div>
                        {/* <header>
                            <div className="input-group">
                                < SearchBox translations={{ placeholder: 'Search for Recipes' }} />
                            </div>
                        </header> */}

                    </div>
                    {/* 이게 진짜바디  */}

                </div>


                {/* 이게 테일 */}
                <div id="footer">
                    {/* <Link to="/EditProfile"><button type="submit" className="col-lg-12- text-center">Edit</button></Link> */}
                    <Link to="/ContactUs">
                        <button class="button5 button3" >Contact Us</button>
                    </Link>

                </div>
            </div >
        )
    }
}


export default EditProfile