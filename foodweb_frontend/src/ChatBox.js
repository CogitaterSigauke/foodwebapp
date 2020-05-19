import React, { Component } from 'react';
import './ChatBox.css';



class Chat extends Component{
    render(){
        return(
            
<div class="container" id= "chatContainer">
	<div class="row no-gutters">
	  <div class="col-md-4 border-right">
		<div class="settings-tray">
		  <img class="profile-image" src={require("./profiles/ben.png")} alt="Profile img"/>
		  <span class="settings-tray--right">
      {/* <!-- <i class="material-icons">cached</i> --> */}
      <i class="fas fa-envelope-open-text"></i>
      {/* <!-- <i class="material-icons">message</i> --> */}
      <i class="fas fa-bars"></i>
			{/* <!-- <i class="material-icons">menu</i> --> */}
		  </span>
		</div>
		<div class="search-box">
		  <div class="input-wrapper">
            <i class="fas fa-search"></i>
			{/* <i class="material-icons">search</i> */}
			<input placeholder="Search here" type="text"/>
		  </div>
		</div>
		<div class="friend-drawer friend-drawer--onhover">
		  <img class="profile-image" src={require("./profiles/daryl.png")} alt=""/>
		  <div class="text">
			<h6>Robo Cop</h6>
			<p class="text-muted">Hey, you're arrested!</p>
		  </div>
		  <span class="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div class="friend-drawer friend-drawer--onhover">
		  <img class="profile-image" src={require("./profiles/douglas.png")}  alt=""/>
		  <div class="text">
			<h6>Optimus</h6>
			<p class="text-muted">Wanna grab a beer?</p>
		  </div>
		  <span class="time text-muted small">00:32</span>
		</div>
		<hr/>
		<div class="friend-drawer friend-drawer--onhover ">
		  <img class="profile-image" src={require("./profiles/stan.jpeg")} alt=""/>
		  <div class="text">
			<h6>Skynet</h6>
			<p class="text-muted">Seen that canned piece of s?</p>
		  </div>
		  <span class="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div class="friend-drawer friend-drawer--onhover">
		  <img class="profile-image" src={require("./profiles/sarah.jpeg")} alt=""/>
		  <div class="text">
			<h6>Termy</h6>
			<p class="text-muted">Im studying spanish...</p>
		  </div>
		  <span class="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div class="friend-drawer friend-drawer--onhover">
		  <img class="profile-image" src={require("./profiles/jacob.png")}  alt=""/>
		  <div class="text">
			<h6>Richard</h6>
			<p class="text-muted">I'm not sure...</p>
		  </div>
		  <span class="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div class="friend-drawer friend-drawer--onhover">
		  <img class="profile-image" src={require("./profiles/john.jpeg")}  alt=""/>
		  <div class="text">
			<h6>Alex</h6>
			<p class="text-muted">Hi, wanna see something?</p>
		  </div>
		  <span class="time text-muted small">13:21</span>
		</div>
	  </div>
	  <div class="col-md-8">
		<div class="settings-tray">
			<div class="friend-drawer no-gutters friend-drawer--grey">
			<img class="profile-image" src={require("./profiles/daryl.png")}  alt=""/>
			<div class="text">
			  <h6>Robo Cop</h6>
			  <p class="text-muted">Layin' down the law since like before Christ...</p>
			</div>
			<span class="settings-tray--right">
			  {/* <!-- <i class="material-icons">cached</i> */}
			  {/* <i class="material-icons">message</i> */}
        {/* <i class="material-icons">menu</i> --> */}
        <i class="fas fa-envelope-open-text"></i>
        {/* <!-- <i class="material-icons">message</i> --> */}
        <i class="fas fa-bars"></i>
			</span>
		  </div>
		</div>
		<div class="chat-panel">
		  <div class="row no-gutters">
			<div class="col-md-3">
			  <div class="chat-bubble chat-bubble--left">
				Hello dude!
			  </div>
			</div>
		  </div>
		  <div class="row no-gutters">
			<div class="col-md-3 offset-md-9">
			  <div class="chat-bubble chat-bubble--right">
				Hello dude!
			  </div>
			</div>
		  </div>
		  <div class="row no-gutters">
			<div class="col-md-3 offset-md-9">
			  <div class="chat-bubble chat-bubble--right">
				Hello dude!
			  </div>
			</div>
		  </div>
		  <div class="row no-gutters">
			<div class="col-md-3">
			  <div class="chat-bubble chat-bubble--left">
				Hello dude!
			  </div>
			</div>
		  </div>
		  <div class="row no-gutters">
			<div class="col-md-3">
			  <div class="chat-bubble chat-bubble--left">
				Hello dude!
			  </div>
			</div>
		  </div>
		  <div class="row no-gutters">
			<div class="col-md-3">
			  <div class="chat-bubble chat-bubble--left">
				Hello dude!
			  </div>
			</div>
		  </div>
		  <div class="row no-gutters">
			<div class="col-md-3 offset-md-9">
			  <div class="chat-bubble chat-bubble--right">
				Hello dude!
			  </div>
			</div>
		  </div>
		  <div class="row">
			<div class="col-12">
			  <div class="chat-box-tray">
          <i class="far fa-smile"></i>
				{/* <!-- <i class="material-icons">sentiment_very_satisfied</i> --> */}
        <input type="text" placeholder="Type your message here..."/>
     
        <i class="fas fa-microphone"></i>
        <i class="far fa-paper-plane"></i>
				{/* <!-- <i class="material-icons">mic</i> */}
				{/* <i class="material-icons">send</i> --> */}
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
        );
    }
}
export default Chat;