import React, { Component } from 'react'
import './Blockuser.css';
// import algoliasearch from 'algoliasearch/lite';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const searchClient = algoliasearch(
//     '2RJQDQ5U0W',
//     '2c9dd00a80a65a207001e057e93e81e5'
// );

class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            blckerUserId: '',
            blockedUserId: '',
            users: [{ name: 'User_1' }, { name: 'User_2' }, { name: 'User_3' }],
            // blocked: ['User_2', 'User_3']
        }
    }
    //Blocking a User
    User = (name) => {

        // var su = this.blckerUserId.getInstance();
        // su.blockUser(name, function (name, error) {
        //     if (error) {
        //         return;
        //     }
        // });

        const check = true;
        return <div style={{ display: 'flex' }}>
            <p>{name}</p>
            {check ? <div> <button classNameName="block">Block</button></div> : <div><button classNameName="Unblock">Unblock</button></div>}
        </div>
    }


    //fiter
    // $(document).ready(function() {
    //     $("#myInput").on("keyup", function () {
    //         var value = $(this).val().toLowerCase();
    //         $("#myList li").filter(function () {
    //             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //         });
    //     });
    // });

    // Button = () => {
    //     return <button></button>
    // }

    getBlocked = () => {
        ///app/{user_id}/block/{other_id}
        axios.post("/app/{user_id}/block/{other_id}")
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data });
                console.log("Data Has been Recieved!!");


            })
            .catch(() => {
                alert("Erro data!!");
            });
    }
    getBlock = () => {
        const { id } = this.props.match.params
        axios.get(`/app/${id}/blocked_users`)
            .then((response) => {
                alert("Block");
                const data = response.data;
                this.setState({ posts: data });
                console.log("Data Has been Recieved!!");
            })
            .catch(() => {
                alert("Erro data!!");
            });
    }

    render() {

        // [{ name: 'User_1' }, { name: 'User_2' }, { name: 'User_3' }]
        const { users } = this.state
        const id = localStorage.getItem('user_id')
        return (
            // <InstantSearch
            //     searchClient={searchClient}
            //     indexName="recipes"
            // >

            <section className="row-section">
                <div className="container">
                    <div className="row">
                        <h2 className="text-center"><span>{id} Friends</span> Following<i className="fa fa-heart"></i> Follower</h2>
                    </div>
                    {/* <header>
                            <div className="input-group">
                                < SearchBox translations={{ placeholder: 'Search for Recipes' }} autoFocus defaultRefinement="Salad" />
                            </div>
                        </header> */}
                    <center>
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </center>
                    <div className="col-md-10 offset-md-1 row-block">

                        <ul id="sortable">
                            <li><div className="media">
                                <div className="media-left align-self-center">
                                    <img className="rounded-circle" src="https://randomuser.me/api/portraits/women/50.jpg" />
                                </div>
                                <div className="media-body">
                                    <h4>Camila Terry</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                </div>
                                <div className="media-right align-self-center">
                                    <a href="#" className="btn btn-default">Block</a>
                                </div>
                            </div></li>
                            <li><div className="media">
                                <div className="media-left align-self-center">
                                    <img className="rounded-circle" src="https://randomuser.me/api/portraits/men/42.jpg" />
                                </div>
                                <div className="media-body">
                                    <h4>Joel Williamson</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                </div>
                                <div className="media-right align-self-center">
                                    <a href="#" className="btn btn-default">Block</a>
                                </div>
                            </div></li>
                            <li><div className="media">
                                <div className="media-left align-self-center">
                                    <img className="rounded-circle" src="https://randomuser.me/api/portraits/women/67.jpg" />
                                </div>
                                <div className="media-body">
                                    <h4>Deann Payne</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                </div>
                                <div className="media-right align-self-center">
                                    <a href="#" className="btn btn-default">Block</a>
                                </div>
                            </div></li>
                            <li><div className="media">
                                <div className="media-left align-self-center">
                                    <img className="rounded-circle" src="https://randomuser.me/api/portraits/women/50.jpg" />
                                </div>
                                <div className="media-body">
                                    <h4>Leona Hunter</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                </div>
                                <div className="media-right align-self-center">
                                    <a href="#" className="btn btn-default">Block</a>
                                </div>
                            </div></li>
                            <li><div className="media">
                                <div className="media-left align-self-center">
                                    <img className="rounded-circle" src="https://randomuser.me/api/portraits/men/89.jpg" />
                                </div>
                                <div className="media-body">
                                    <h4>Donald Perkins</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                </div>
                                <div className="media-right align-self-center">
                                    <a href="#" className="btn btn-default">Block</a>
                                </div>
                            </div></li>



                        </ul>
                    </div>
                </div>
            </section>
            // </InstantSearch>
        )
    }
}


export default Block