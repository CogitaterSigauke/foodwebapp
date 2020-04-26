
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")

public class Review {
    @Id
    String id;
    String userId;
    String recipeId;
    int oneStartCount = 0;
    int twoStartCount = 0;
    int threeStartCount = 0;
    int fourStartCount = 0;
    int fiveStartCount = 0;

    public Review(String userId, String recipeId) {
        this.userId = userId;
        this.recipeId = recipeId;
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

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public int getOneStartCount() {
        return oneStartCount;
    }

    public void setOneStartCount(int oneStartCount) {
        this.oneStartCount = oneStartCount;
    }

    public int getTwoStartCount() {
        return twoStartCount;
    }

    public void setTwoStartCount(int twoStartCount) {
        this.twoStartCount = twoStartCount;
    }

    public int getThreeStartCount() {
        return threeStartCount;
    }

    public void setThreeStartCount(int threeStartCount) {
        this.threeStartCount = threeStartCount;
    }

    public int getFourStartCount() {
        return fourStartCount;
    }

    public void setFourStartCount(int fourStartCount) {
        this.fourStartCount = fourStartCount;
    }

    public int getFiveStartCount() {
        return fiveStartCount;
    }

    public void setFiveStartCount(int fiveStartCount) {
        this.fiveStartCount = fiveStartCount;
    }
    
    
    
    
}
