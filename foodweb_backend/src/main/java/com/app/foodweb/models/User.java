package com.app.foodweb.models;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    String id;
    String name;
    String userName = "";
    String familyName;
    String pictureUrl;
    String email;
    int totalNumQuizzesTaken;
    int totalNumQuestionsTaken;
    int totalNumCorrectAttemps;
    
           // A BsonBinary to store the profile image as binary data.
    public User(String name, String familyName, String email, String pictureUrl){

        this.name = name;
        this.familyName = familyName;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.totalNumQuizzesTaken = 0;
        this.totalNumQuestionsTaken = 0;
        this.totalNumCorrectAttemps = 0;
    }   

    public int getTotalNumCorrectAttemps() {
        return totalNumCorrectAttemps;
    }

    public void setTotalNumCorrectAttemps(int totalNumCorrectAttemps) {
        this.totalNumCorrectAttemps = totalNumCorrectAttemps;
    }

    public int getTotalNumQuizzesTaken() {
        return totalNumQuizzesTaken;
    }


    public void setTotalNumQuizzesTaken(int totalNumQuizzesTaken) {
        this.totalNumQuizzesTaken = totalNumQuizzesTaken;
    }

    public int getTotalNumQuestionsTaken() {
        return totalNumQuestionsTaken;
    }

    public void setTotalNumQuestionsTaken(int totalNumQuestionsTaken) {
        this.totalNumQuestionsTaken = totalNumQuestionsTaken;
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



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
