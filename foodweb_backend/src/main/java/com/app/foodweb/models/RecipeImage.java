package com.app.foodweb.models;

public class RecipeImage {

    String objectID;
    String userName;
    int likesCount = 0;//updated everytime a review is posted => the review has recipeImage id
    String mealType;
    String dietAndHealth;
    String worldCuisine;
    String mealName;
    String imageString;
    String createdAt;

    public RecipeImage(String objectID, String userName, String mealType, String dietAndHealth, 
            String worldCuisine, String mealName, String createdAt, String imageString) {
        this.userName = userName;
        this.objectID = objectID;
        this.mealType = mealType;
        this.dietAndHealth = dietAndHealth;
        this.worldCuisine = worldCuisine;
        this.mealName = mealName;
        this.imageString = imageString;
        this.createdAt = createdAt;
    }

    public String getObjectID() {
        return objectID;
    }

    public void setObjectID(String objectID) {
        this.objectID = objectID;
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

    public String getImageString() {
        return imageString;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String editedAt) {
        this.createdAt = editedAt;
    }


}
