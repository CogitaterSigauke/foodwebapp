package com.app.foodweb.controllers;

import com.app.foodweb.models.Message;
import com.app.foodweb.repositories.MessageRepository;

//SPRING BOOT

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

//JSON ARRAY

// import org.json.JSONArray;  
import com.google.gson.Gson;
// import com.google.code.gson;
//JAVA

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import java.time.LocalDateTime; 


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MessageController {
	
    @Autowired
	MessageRepository messageRepository;

  
    
    @RequestMapping(method=RequestMethod.POST, value="app/message")
    public Message sentMessage(@RequestBody Message message) {

		messageRepository.save(message);
        return message;
    }

    //primary user is the user who is requesting for the messages  		
    @RequestMapping(method=RequestMethod.GET, value="app/message/{primaryUserId}/{secondaryUserId}")
    public String getRecentMessages(@PathVariable String primaryUserId, @PathVariable String secondaryUserId) {
       
	List<Message> messages = messageRepository.findMessages(primaryUserId, secondaryUserId);
    messages.sort((Message m1, Message m2)->LocalDateTime.parse(m1.getCreatedAt()).compareTo(LocalDateTime.parse(m2.getCreatedAt())));
        
        Gson gson = new Gson();
        String messagesJson = gson.toJson(messages);
        
        return messagesJson;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="app/message/{messageId}")
	public Map<String,String> deleteMessage(@PathVariable String messageId){
                
        Message message = messageRepository.findById(messageId).get();
        messageRepository.delete(message);
        Map<String,String> res = new HashMap<String, String>();
	    res.put("status","success");
        return res;
	 }

     
                
}
