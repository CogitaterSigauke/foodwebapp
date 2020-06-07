
package com.app.foodweb.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Document(collection = "comments")

public class Comment {
    @Id
    String id;
    String senderId;
    //we will show the username on each comment
    String userName;
    String recipeId;
    String commentText;
    //time the comment was created or last edited
    String createdAt;

    public Comment(String senderId, String userName, String recipeId, String commentText) {
        this.senderId = senderId;
        this.recipeId = recipeId;
        this.userName = userName;
        this.commentText = commentText;
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

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String editedAt) {
        this.createdAt = editedAt;
    }
}
