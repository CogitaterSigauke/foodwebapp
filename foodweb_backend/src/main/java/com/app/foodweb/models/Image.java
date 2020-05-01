
package com.app.foodweb.models;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Document(collection = "images")
public class Image {
    @Id
    String id;
    String userId;
    String imageCaption;
    String imageBase64; // A Base64 encoded string of the profile image that was encoded on the frontend.
    String imageString; // A Base64 encoded string of the profile image that was encoded on the backend.
    String type; //message | recipe | post
    Binary image;
    String createdAt;

    public Image(String userId, String imageCaption, String imageBase64, String imageString, Binary image, String type) {
        this.userId = userId;
        this.imageCaption = imageCaption;
        this.imageBase64 = imageBase64;
        this.imageString = imageString;
        this.image = image;
        this.type = type;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getImageCaption() {
        return imageCaption;
    }

    public void setImageCaption(String imageCaption) {
        this.imageCaption = imageCaption;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public String getImageString() {
        return imageString;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String editedAt) { 
        this.createdAt = editedAt;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) { 
        this.type = type;
    }
}
