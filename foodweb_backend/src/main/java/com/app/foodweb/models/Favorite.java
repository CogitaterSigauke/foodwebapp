<<<<<<< HEAD
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favorite")

public class Favorite {
    @Id
    String id;
    String userId;
    String recipeId;

    public Favorite(String userId, String recipeId) {
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
    
}
=======
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favorites")

public class Favorite {
    @Id
    String id;
    String userId;
    String recipeId;

    public Favorite(String userId, String recipeId) {
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
    
}
>>>>>>> 2b513dcfed2bff45f7437a5214f2f8d01a16c904
