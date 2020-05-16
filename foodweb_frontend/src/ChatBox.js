// import { Component } from "react"
// import './recipe.css';

// class ChatBox extends Component{

//     render(){
//         var me = {};

//         var you = {};

//         function formatAMPM(date) {
//             var hours = date.getHours();
//             var minutes = date.getMinutes();
//             var ampm = hours >= 12 ? 'PM' : 'AM';
//             hours = hours % 12;
//             hours = hours ? hours : 12; // the hour '0' should be '12'
//             minutes = minutes < 10 ? '0'+minutes : minutes;
//             var strTime = hours + ':' + minutes + ' ' + ampm;
//             return strTime;
//         }            

//         //-- No use time. It is a javaScript effect.
//         function insertChat(who, text, time = 0){
//             var control = "";
//             var date = formatAMPM(new Date());
            
//             if (who == "me"){
                
//                 control = '<li style="width:100%">' +
//                                 '<div class="msj macro">' +
//                                     '<div class="text text-l">' +
//                                         '<p>'+ text +'</p>' +
//                                         '<p><small>'+date+'</small></p>' +
//                                     '</div>' +
//                                 '</div>' +
//                             '</li>';                    
//             }else{
//                 control = '<li style="width:100%;">' +
//                                 '<div class="msj-rta macro">' +
//                                     '<div class="text text-r">' +
//                                         '<p>'+text+'</p>' +
//                                         '<p><small>'+date+'</small></p>' +
//                                     '</div>' +
//                                 '<div class="avatar" style="padding:0px 0px 0px 10px !important"></div>' +                                
//                         '</li>';
//             }
//             setTimeout(
//                 function(){                        
//                     $("ul").append(control);

//                 }, time);
            
//         }

//         function resetChat(){
//             $("ul").empty();
//         }

//         $(".mytext").on("keyup", function(e){
//             if (e.which == 13){
//                 var text = $(this).val();
//                 if (text !== ""){
//                     insertChat("me", text);              
//                     $(this).val('');
//                 }
//             }
//         });

//         //-- Clear Chat
//         resetChat();

//         //-- Print Messages
//         insertChat("me", "Hello Tom...", 0);  
//         insertChat("you", "Hi, Pablo", 1500);
//         insertChat("me", "What would you like to talk about today?", 3500);
//         insertChat("you", "Tell me a joke",7000);
//         insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
//         insertChat("you", "LOL", 12000);

//         return(
                    

//         <div class="container-fluid h-100">
//              <div class="col-sm-3 col-sm-offset-4 frame">
//             <ul></ul>
//             <div>
//                 <div class="msj-rta macro" style="margin:auto">                        
//                     <div class="text text-r" style="background:whitesmoke !important">
//                         <input class="mytext" placeholder="Type a message"/>
//                     </div> 
//                 </div>
//             </div>
//         </div>        
//         </div>


//         );

        
//     }
// }
// export default ChatBox;