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
