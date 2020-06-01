
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
public class Review {
    @Id
    String id;
    String recipeId;
    String userId;
    int userRating; // has to be 0-5

    public Review(String recipeId,String userId,int userRating) {
        this.recipeId = recipeId;
        this.userId = userId;
        this.userRating = userRating;
    }

    public Review() {

    }


    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getUserRating() {
        return userRating;
    }

    public void setUserRating(int userRating) {
        this.userRating = userRating;
    }


   //  public int getMaxCount(){
   //    int[] count = {oneStartCount,twoStartCount,threeStartCount,fourStartCount,fiveStartCount};
   //    int max = 0;
   //    for(int i = 0; i <count.length;i++){
   //       if(count[i] > 0){
   //         max = i+1;
   //       }
   //    }
   //    return max;
   //  }
   //
   // public int getNumberOfReviews(){
   //   return this.oneStartCount+this.twoStartCount+this.threeStartCount+this.fourStartCount+this.fiveStartCount;
   // }
}
