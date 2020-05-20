import React, { Component } from 'react';
import './ChatBox.css';
import {Link}  from 'react-router-dom';
// import Nav from './Nav';
import axios from 'axios';


class Chat extends Component{

    constructor(props) {
        super(props);
    
            this.state = {
                currentUser: '5ec2bdf2eef504193203e329',
                message:{
                    senderUserId: '5ec2bdf2eef504193203e329',
                    receiverUserId: '5ec2c007eef504193203e32a',
                    messageText: '',
                    imageId: '',
                    videoId: '',
                },

                Messages: [{  messageText: 'Hi there', },{  messageText: 'Hi Redi'},{  messageText: 'Hi cogi'}]
            };
      }

      
    onChange = (e) => {
        const state = this.state.message;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    componentDidMount() {
        // console.log('/recipe/5eba3f7efd9c7b27cb32b8fa');
        axios.get('/message/5ec2bdf2eef504193203e329/5ec2c007eef504193203e32a')
            .then(messages => {
                this.setState({ Messages: messages.data });

                console.log(this.state.message);
                console.log(this.state.Messages);
            });
    }

    PostMessage = (e) => {
        e.preventDefault();
        const { senderUserId, receiverUserId, messageText, imageId, videoId } = this.state.message;
        axios.post('message', { senderUserId, receiverUserId, messageText, imageId, videoId })
            .then((result) => {
            console.log("After Posting new Contact - returned data: " + result.data);
           
            console.log('======response.data======');
            console.log(result.data);
            alert("Successfuly saved");
            this.props.history.push("/Home")
            })
            .catch((err) => {
            console.log(`======response.data=====`);
            console.log(`Errors: {errors}`);
            })
            .catch((err) => {
            console.log(`Errors: {errors}`);
            });
        ;
    }



    render(){
        const { senderUserId, receiverUserId, messageText, imageId, videoId } = this.state.message;
        return(
            
        <div id="wrapper">
            <div className="container" id= "chatContainer">
                <div className="row no-gutters">
                    <div className="col-md-4 border-right">
                        <div className="settings-tray">
                            <img className="profile-image" src={require("./profiles/ben.png")} alt="Profile img"/>
                            <span className="settings-tray--right">
                            <i className="fas fa-envelope-open-text"></i>
                            <i className="fas fa-bars"></i>
                            </span>
                        </div>
                        <div className="search-box">
                            <div className="input-wrapper">
                                <i className="fas fa-search"></i>
                            
                                <input id = "chat_input" placeholder="Search here" type="text"/>
                            </div>
                        </div>
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src={require("./profiles/daryl.png")} alt=""/>
                            <div className="text">
                                <h6>Robo Cop</h6>
                                <p className="text-muted">Hey, you're arrested!</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr/>
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src={require("./profiles/douglas.png")}  alt=""/>
                            <div className="text">
                                <h6>Optimus</h6>
                                <p className="text-muted">Wanna grab a beer?</p>
                            </div>
                            <span className="time text-muted small">00:32</span>
                        </div>
                        <hr/>
                        <div className="friend-drawer friend-drawer--onhover ">
                            <img className="profile-image" src={require("./profiles/stan.jpeg")} alt=""/>
                            <div className="text">
                                <h6>Skynet</h6>
                                <p className="text-muted">Seen that canned piece of s?</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr/>
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src={require("./profiles/sarah.jpeg")} alt=""/>
                            <div className="text">
                                <h6>Termy</h6>
                                <p className="text-muted">Im studying spanish...</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr/>
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src={require("./profiles/jacob.png")}  alt=""/>
                            <div className="text">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr/>
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src={require("./profiles/john.jpeg")}  alt=""/>
                            <div className="text">
                                <h6>Alex</h6>
                                <p className="text-muted">Hi, wanna see something?</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="settings-tray">
                            <div className="friend-drawer no-gutters friend-drawer--grey">
                                <img className="profile-image" src={require("./profiles/daryl.png")}  alt=""/>
                                <div className="text">
                                    <h6>Robo Cop</h6>
                                    <p className="text-muted">Layin' down the law since like before Christ...</p>
                                </div>
                                <span className="settings-tray--right">
                                <i className="fas fa-envelope-open-text"></i>
                                <i className="fas fa-bars"></i>
                                </span>
                            </div>
                        </div>

                        <div className="chat-panel">
                            {
                            this.state.Messages.map((message)=>(
                
                                <div className="row no-gutters">
                                    
                                    {/* chat box logic */}
                                        {(this.state.currentUser==message.senderUserId)
                                        && (
                                            <div className="col-md-3">
                                                <div className="chat-bubble chat-bubble--left">
                                                    {message.messageText}
                                                </div> 
                                            </div>
                                        )
                                        }

                                        {(this.state.currentUser==message.receiverUserId)
                                        && (
                                            <div className="col-md-3 offset-md-9">
                                                <div className="chat-bubble chat-bubble--right">
                                                    {message.messageText}
                                                </div> 
                                            </div>
                                        )
                                        }

                                        
                                
                                </div>
                                
                                ))
                            }
                                
                        </div>
                        <form onSubmit={this.PostMessage}>
                            
                                <div className="row no-gutters">
                                    <div className="col-md-3 offset-md-9">
                                        <div className="chat-bubble chat-bubble--right">
                                            Hello dude!
                                        </div>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-12">
                                        <div className="chat-box-tray">
                                            <i className="far fa-smile"></i>
                                            <input id= "chat_input" type="text"  name="messageText" value={messageText} onChange={this.onChange} placeholder="Type your message here..."/>
                                            <i className="fas fa-microphone"></i>
                                            <i><button type="submit" className="far fa-paper-plane"></button></i>
                                        </div>
                                    </div>
                                </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
        );
    }
}
export default Chat;


//  {/* <div className="row no-gutters">
//                         <div className="col-md-3 offset-md-9">
//                             <div className="chat-bubble chat-bubble--right">
//                                 Hello dude!
//                             </div>
//                         </div>
//                         </div>
//                         <div className="row no-gutters">
//                             <div className="col-md-3 offset-md-9">
//                                 <div className="chat-bubble chat-bubble--right">
//                                     Hello dude!
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row no-gutters">
//                             <div className="col-md-3">
//                                 <div className="chat-bubble chat-bubble--left">
//                                     Hello dude!
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row no-gutters">
//                             <div className="col-md-3">
//                                 <div className="chat-bubble chat-bubble--left">
//                                     Hello dude!
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row no-gutters">
//                             <div className="col-md-3">
//                                 <div className="chat-bubble chat-bubble--left">
//                                     Hello dude!
//                                 </div>
//                             </div>
//                         </div>

// {this.state.Messages.map(({messageText})=>(
//     <div className="row no-gutters">
//         <div className="col-md-3">
//             <div className="chat-bubble chat-bubble--left">
//                 {messageText}
//             </div>  
            
//         </div>
//     </div>
    
//     ))
// }

