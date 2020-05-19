import React, { Component } from 'react'
import './Block.css';
// import './bootstrap.min.css';
// import logo from './logo.svg'
import axios from 'axios'
import { Link } from 'react-router-dom';



class EditProfile extends Component {
    state = {
        name: "",
        familyName: "",
        userName: "",
        aboutMe: "",
        email: "",
        id: ""
    }
    componentDidMount() {

        const { id } = this.props.match.params

        axios.get(`/user/${id}`)
            .then((response) => {
                const { name, email, aboutMe, familyName, imageString, userName } = response.data

                console.log(response.data)

                this.setState({
                    name, email, aboutMe, familyName, id, userName
                })
            })
            .catch((msg) => {
                console.log(msg)
            });


    }
    onPressSubmit = (e) => {
        e.preventDefault()

        console.log(this.state.password)
        this.setState({
            name: "",
            familyName: "",
            userName: "",
            aboutMe: ""
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


    onSubmit = (e) => {
        e.preventDefault();
        const { name, aboutMe, userName, familyName } = this.state;
        axios.put(`/edit_profile/${this.props.match.params.id}`, { name, familyName, aboutMe, userName })
            .then((response) => {
                console.log(response.data)
                alert("UPDATED!!");
                // const data = response.data.id;
                // this.setState({ posts: data });
                // console.log("Data Has been Recieved!!");
                // //다시넣어줌 데이타에
                // this.getBlogPost();
                // alert("Success")
                // this.props.history.push("/Home")
            })
            .catch((msg) => {
                console.log(msg)
                // alert("Erro data!!");
            });
    }


    render() {
        const { users } = this.state
        const { name, familyName, userName, aboutMe } = this.state
        // [{ name: 'User_1' }, { name: 'User_2' }, { name: 'User_3' }]
        return (



            <div className="container py-3">
                <div className="row">
                    <div className="mx-auto col-sm-6">
                        {/* <!-- form user info --> */}
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">User Information</h4>
                            </div>


                            {/* <form id="to-do-form" onSubmit={this.onPressSubmit}>
            <input type="text" placeholder="Type Your Email" value={email} onChange={this.onKeyPress} name={'email'} />
            <input type="password" placeholder="Type Your password" value={password} onChange={this.onKeyPress} name={'password'} />
            <input type="text" placeholder="Type your Name" value={name} onChange={this.onKeyPress} name={'name'} />
            <button type="Edit">Edit</button>
        </form> */}
                            <div className="card-body">
                                <form className="form" role="form" autocomplete="off">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={name} onChange={this.onKeyPress} name={name} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Family Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={familyName} onChange={this.onKeyPress} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="email" value="email@gmail.com" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">User Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={userName} onChange={this.onKeyPress} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">About Me</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="url" value={aboutMe} onChange={this.onKeyPress} />
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Password</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" value="12345678" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Confirm</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" value="12345678" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <Link to="/Profile">
                                                    <input type="reset" className="btn btn-secondary" value="Cancel" /></Link>
                                                {/* <Link to="/"> */}
                                                <input type="button" className="btn btn-primary" value="Save Changes" onClick={this.onSubmit} />
                                            </div>
                                        </div>
                                    </form>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )



    }
}


export default EditProfile