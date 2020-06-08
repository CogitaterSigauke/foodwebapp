
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.HashMap;

@Document(collection = "recipeLikes")

public class RecipeLikes {
    @Id
    String id;
    int likesCount = 0;
    String recipeId;
    String userId;
    String userName;

    HashMap<String, String> likes;
 
    public RecipeLikes(String recipeId, String userId, String userName) {
        this.recipeId = recipeId;
        this.likes = new HashMap<String, String>();
        likes.put(userId, userName);
        this.likesCount ++;
        this.userId = userId;
        this.userName = userName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public HashMap<String, String> getLikes() {
        return likes;
    }

    public int like(String userId, String userName) {
        if(!this.likes.containsKey(userId)){
            likes.put(userId, userName);
            this.likesCount ++;
        }
        return this.likesCount;
    }

    public int unLike(String userId, String userName) {
        if(this.likes.containsKey(userId)){
            likes.remove(userId, userName);
            this.likesCount --;
        }
        return this.likesCount;
    }

    public int hasLiked(String userId, String userName) {
        if(this.likes.containsKey(userId)){
            return 1;
        }
        return 0;
    }

    public int getLikesCount() {
        return this.likesCount;
    }
}
