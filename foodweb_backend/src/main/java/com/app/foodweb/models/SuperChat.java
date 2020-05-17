
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime; 
import java.time.ZoneOffset;

@Document(collection = "superchat")
public class SuperChat {
    @Id
    String id;
    String senderUserId;
    String senderUserName;
    String recipeId;
    String videoId;
    String messageText;
    String createdAt;

    public SuperChat(String senderUserId, String senderUserName, String recipeId, String messageText) {
        this(senderUserId, senderUserName, recipeId, messageText, "");
    }

    public SuperChat(String senderUserId, String senderUserName, String recipeId, String messageText, String videoId) {
        this.senderUserId = senderUserId;
        this.senderUserName = senderUserName;
        this.messageText = messageText;
        this.recipeId = recipeId;
        this.videoId = videoId;
        DateTimeFormatter dtf = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);  
        this.createdAt = dtf.format(now);

    }
       

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getSenderUserName() {
        return senderUserName;
    }

    public void setSenderUserName(String senderUserName) {
        this.senderUserName = senderUserName;
    }

    public String getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(String senderUserId) {
        this.senderUserId = senderUserId;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

   
    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String editedAt) { 
        this.createdAt = editedAt;
    }
    
}
