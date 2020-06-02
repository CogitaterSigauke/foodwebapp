import React, { Component } from 'react';
import './ChatBox.css';
import {Link}  from 'react-router-dom';
// import Nav from './Nav';
import axios from 'axios';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
    '2RJQDQ5U0W',
    '2c9dd00a80a65a207001e057e93e81e5'
  );
  
let index = searchClient.initIndex('users');
  

class Chat extends Component{

    constructor(props) {
        super(props);
    
            this.state = {
                value: "",
                Hits: [],
                query: "",
                currentUser: '5ec2bdf2eef504193203e329',
                message:{
                    senderUserId: '5ec2bdf2eef504193203e329',
                    receiverUserId: '5ec2c007eef504193203e32a',
                    messageText: '',
                    imageId: '',
                    videoId: '',
                    
                },
                secondUser: {
                    userId: "",
                    imageString: "",
                    userName: "",
                    familyName: ""
                },
                Messages: [{  messageText: 'Hi there', },{  messageText: 'Hi Redi'},{  messageText: 'Hi cogi'}]
            };
      }

      search() {

        //  =================QUERY===================
      
        index.search(this.state.query).then(({hits}) => {
          console.log(hits);
          this.setState({
            Hits: hits
          });
      
      
        });
      }
    onChange = (e) => {
        const state = this.state.message;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleChange = (e) =>{

        this.setState({
          value: e.target.value,
          query: e.target.value
        });
      
        this.search();
      
    }
    
    componentDidMount() {
        // console.log('/recipe/5eba3f7efd9c7b27cb32b8fa');
        this.search();
        console.log("=============START======CHAT===========");
        console.log(this.props);
        console.log("=-=-=-=-=-CHAT=-=-=-=-=-=-=-")
        console.log(this.props.location.state.userId);
        axios.get('/message/5ec2bdf2eef504193203e329/5ec2c007eef504193203e32a')
            .then(messages => {
                this.setState({ Messages: messages.data });

                console.log(this.state.message);
                console.log(this.state.Messages);
            });
    }

    viewChatBox = (e) => {

        console.log("=======View ChatBox======");
        console.log("STATE ==> ", this.state);
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
                        {/* Search Bar */}
                        <div className="search-box">
                             
                            <div className="input-wrapper">
                                <i className="fas fa-search"></i>
                            
                                <input id = "chat_input" placeholder="Search here" type="text" value={this.state.value} onChange={this.handleChange}/>
                            </div>
                             
                        </div>
                        {/* Search Bar */}

                        {/* HITS Display*/}

                            {
                                this.state.Hits.map((hit, i)=>(
                                    
                                    <div className="friend-drawer friend-drawer--onhover" onClick={this.handleClickedUser} id={hit.objectID} name={hit.userName}>
                                        <img className="profile-image" src={hit.imageString} alt="profile picture"/>
                                            <div className="text">
                        
                                            <h6>{hit.userName}</h6>
                                            <p className="text-muted">{hit.familyName}</p>
                                        </div>
                                        <span className="time text-muted small">13:21</span>
                                        <hr/>
                                    </div>
                                   
                                ))
                            }                        



                        {/* HITS Display*/}
       
                    </div>

                    <div className="col-md-8">
                        <div className="settings-tray">
                            <div className="friend-drawer no-gutters friend-drawer--grey">
                                <img className="profile-image" src={require("./profiles/daryl.png")}  alt=""/>
                                <div className="text">
                                    <h6>Robo Cop</h6>
                                    <p className="text-muted">Layin' down the law since like before Christ...</p>
                                </div>

                        <h1>STATE : {console.log(this.state)}</h1>
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
                                    <h1>userID = {this.props.location.state.userId}</h1>
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

// Chat.propTypes = {

//     classes: PropTypes.object.isRequired
  
//   }
export default withRouter(Chat);


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

