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
                DisplayHits: [],
                query: "",
                currentUser: "",
                message:{
                    senderUserId: '',
                    receiverUserId: '',
                    messageText: '',
                    imageId: '',
                    videoId: '',
                    
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

      searchUser(userID) {

        //  =================QUERY===================
      
        index.search(userID).then(({hits}) => {
        console.log("=============== SEARCH ==================");
          console.log(hits);
          this.setState({
            DisplayHits: hits
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
        console.log("This is the probs" , this.props.location);
        this.search();
        console.log("=============START==Props====CHAT===========");
        console.log(this.props);
        console.log("=-=-=-=-=-CHAT=-=-=-=-=-=-=-")
        console.log(this.props.location.state.userId);
        console.log(this.props.location.state.userName);
        this.setState({ 
            currentUser: this.props.location.userId
        });
     
    }

    // handleDivClick = (id) => {

        
    // }
    handleChatBoxClick = (e) => {

        this.searchUser(e.target.name);

        this.setState({
            message:{
                senderUserId: this.props.location.state.userId,
                receiverUserId: e.target.name,
                messageText: '',
                imageId: '',
                videoId: ''
            }
        });

        // console.log("FRIEND USER ID ==>", e.target.id);
        console.log("FRIEND USER NAME ==>", e.target.name);
        console.log("CURRENT USER VALUE ==>", this.props.location.state.userId);
        axios.get(`/message/${this.props.location.state.userId}/${e.target.name}`)
        .then(messages => {
            this.setState({ Messages: messages.data   
            });
            this.setState({
               currentUser: this.props.location.state.userId
            })
            console.log("===========MESSAGE CHATOX HAS BEEN CLICKED==========")
            console.log(this.state.message);
            console.log(this.state.Messages);
            console.log(this.state);
        }).catch((error)=>{
            console.log(error);
        }).catch((err) => {
            console.log(`Errors: {errors}`, err);
        });
    }

    PostMessage = (e) => {
        console.log('======response.data=  before message has been posted=====');
        e.preventDefault();
        const { senderUserId, receiverUserId, messageText, imageId, videoId } = this.state.message;
        axios.post('message', { senderUserId, receiverUserId, messageText, imageId, videoId })
            .then((result) => {
            console.log("After Posting new Contact - returned data: " + result.data);
           
            console.log('======response.data= after  message has been posted=====');
            console.log(result.data);
            alert("Successfuly saved");
            // this.props.history.push("/Home")
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
                            <img className="profile-image" src={this.props.location.state.imageString} alt="./profiles/profileImgAll.png"/>
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
                                    <div className="friend-drawer friend-drawer--onhover" key= {i} >
                                        <img className="profile-image" id={"click"+i} onClick={this.handleChatBoxClick} src={hit.imageString} alt={require("./profiles/profileImgAll.png")} name={hit.objectID} />
                                        <div className="text">
                                            <h3  hidden>{hit.objectID}</h3>
                                            <h6>{hit.userName}</h6>
                                            <p className="text-muted">{hit.familyName }</p>
                                            
                                        </div>
                                        <span className="time text-muted small">13:21</span>
                                    </div>
                                ))
                            }                        



                        {/* HITS Display*/}
                    </div>

                    <div className="col-md-8">
                    {
                        this.state.DisplayHits.map((hit, i)=>(
                            
                        <div className="settings-tray">
                            <div className="friend-drawer no-gutters friend-drawer--grey">
                                <img className="profile-image" src={hit.imageString}  alt=""/>
                                <div className="text">
                                    <h6>{hit.userName}</h6>
                                    <p className="text-muted">Layin' down the law since like before Christ...</p>
                                </div>
                                <span className="settings-tray--right">
                                <i className="fas fa-envelope-open-text"></i>
                                <i className="fas fa-bars"></i>
                                </span>
                            </div>
                        </div>
                        ))
                   }

                        <div className="chat-panel" id = "chat-message-list">
                            {
                            this.state.Messages.map((message, i)=>(
                
                                <div className="row no-gutters" key={i}>
                                    {/* <h1>userID = {this.props.location.state.userId}</h1> */}
                                    {/* chat box logic */}
                                        {(this.state.currentUser==message.senderUserId)
                                        && (
                                            <div className="col-md-6  offset-md-6">
                                                <div className="chat-bubble chat-bubble--left fix-color">
                                                    {message.messageText}
                                                </div> 
                                            </div>
                                        )
                                        }

                                        {(this.state.currentUser==message.receiverUserId)
                                        && (
                                            <div className="col-md-6">
                                                <div className="chat-bubble chat-bubble--right ">
                                                    {message.messageText}
                                                </div> 
                                            </div>
                                        )
                                        }

                                        
                                
                                </div>
                                
                                ))
                            }
                                
                        </div>
                        <div>
                            <form onSubmit={this.PostMessage}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="chat-box-tray">
                                            <i className="far fa-smile"></i>
                                            <input id= "chat_input" type="text"  name="messageText" value={messageText} onChange={this.onChange} placeholder="Type your message here..."/>
                                            
                                            <i><button type="submit" className="far fa-paper-plane"></button></i>
                                        </div>
                                    </div>
                                </div>
                            </form> 
                    </div>
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

