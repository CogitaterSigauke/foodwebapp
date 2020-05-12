<<<<<<< HEAD
package com.app.foodweb.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipes")
public class Recipe {
    @Id
    String id;
    String userId;
    int likesCount = 0;
    String mealType;
    String dietAndHealth;
    String worldCuisine;
    String mealName;
    String description;
    String imageId;
    String videoId;

    public Recipe(String userId, String mealType, String dietAndHealth, String worldCuisine, String mealName, String description, String imageId, String videoId) {
        this.userId = userId;
        this.mealType = mealType;
        this.dietAndHealth = dietAndHealth;
        this.worldCuisine = worldCuisine;
        this.mealName = mealName;
        this.description = description;
        this.imageId = imageId;
        this.videoId = videoId;
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

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getDietAndHealth() {
        return dietAndHealth;
    }

    public void setDietAndHealth(String dietAndHealth) {
        this.dietAndHealth = dietAndHealth;
    }

    public String getWorldCuisine() {
        return worldCuisine;
    }

    public void setWorldCuisine(String worldCuisine) {
        this.worldCuisine = worldCuisine;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
    
    
   
    
    
    
}
=======
package com.app.foodweb.models;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.ZoneOffset;

@Document(collection = "recipes")
public class Recipe {
    @Id
    String id;
    String userId;
    String userName;
    int likesCount = 0;
    int commentsCount = 0;
    double rating = 0; 
    String mealType;
    String dietAndHealth;
    String worldCuisine;
    String mealName;
    String description;
    String imageString; // A Base64 encoded string of the profile image that was encoded on the frontend.
    String createdAt;
    String videoId;

    public Recipe(String userName, String userId, String mealType, 
    String dietAndHealth, String worldCuisine, String mealName, 
    String description, String videoId,String imageString) {
        this.userId = userId;
        this.userName = userName;
        this.mealType = mealType;
        this.dietAndHealth = dietAndHealth;
        this.worldCuisine = worldCuisine;
        this.mealName = mealName;
        this.description = description;
        this.imageString = imageString; //BASE 64 STRING ENCODED FROM THE CLIENT SIDE
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getDietAndHealth() {
        return dietAndHealth;
    }

    public void setDietAndHealth(String dietAndHealth) {
        this.dietAndHealth = dietAndHealth;
    }

    public String getWorldCuisine() {
        return worldCuisine;
    }

    public void setWorldCuisine(String worldCuisine) {
        this.worldCuisine = worldCuisine;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getImageString() {
        return imageString;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String editedAt) {
        this.createdAt = editedAt;
    }

}
>>>>>>> 2b513dcfed2bff45f7437a5214f2f8d01a16c904
