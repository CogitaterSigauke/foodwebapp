package com.app.foodweb.models;

import org.bson.types.Binary;
<<<<<<< HEAD
=======
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;
>>>>>>> 7e06599963565e6a774b1a6225c191f44237bfbe
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.ZoneOffset;

@Document(collection = "recipes")
public class Recipe {
    @Id
    String id;
    String userId;
    int likesCount = 0;
    int commentsCount = 0;
    double rating = 0; //updated everytime a review is posted => the review has recipe id
    String mealType;
    String dietAndHealth;
    String worldCuisine;
    String mealName;
    String description;
    //We will the main recipe image here because we will load often
    //the other images will be kept in the images collection with this
    //recipe id as attribute
    String imageBase64; // A Base64 encoded string of the profile image that was encoded on the frontend.
    String imageString; // A Base64 encoded string of the profile image that was encoded on the backend.
    Binary image;       // A BsonBinary to store the profile image as binary data.
<<<<<<< HEAD

=======
    String createdAt;
>>>>>>> 7e06599963565e6a774b1a6225c191f44237bfbe
    String videoId;
    
    public Recipe(String userId, String mealType, String dietAndHealth, String worldCuisine, String mealName, String description, String videoId,  String imageBase64, String imageString, Binary image) {
        this.userId = userId;
        this.mealType = mealType;
        this.dietAndHealth = dietAndHealth;
        this.worldCuisine = worldCuisine;
        this.mealName = mealName;
        this.description = description;
        this.imageBase64 = imageBase64;
        this.imageString = imageString;
        this.image = image;
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

    public double getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

<<<<<<< HEAD
=======
    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String editedAt) { 
        this.createdAt = editedAt;
    }

    
>>>>>>> 7e06599963565e6a774b1a6225c191f44237bfbe
}
