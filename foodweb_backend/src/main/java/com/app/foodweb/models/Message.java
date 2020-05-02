
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime; 
import java.time.ZoneOffset;

@Document(collection = "message")
public class Message {
    @Id
    String id;
    String senderUserId;
    String receiverUserId;
    String messageText;
    String read =  "false"; //message has not been read
    String imageId;
    String videoId;
    String createdAt;

    public Message(String senderUserId, String receiverUserId, String messageText, String imageId, String videoId) {
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId;
        this.messageText = messageText;
        this.imageId = imageId;
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

    public String getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(String senderUserId) {
        this.senderUserId = senderUserId;
    }

    public String getReceiverUserId() {
        return receiverUserId;
    }

    public void setReceiverUserId(String receiverUserId) {
        this.receiverUserId = receiverUserId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public String getRead() {
        return read;
    }

    public void setRead(String read) {
        this.read = read;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
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
