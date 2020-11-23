package com.app.foodweb.models;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.format.DateTimeFormatter;
import java.time.ZoneOffset;
import java.time.LocalDateTime;

@Document(collection = "users")
public class User {
    @Id
    String id;
    String name;
    String email;
    String userName;
    String familyName;
    String aboutMe;
    int numberOfFollowers; //we will store these integers there to show them every time
    int numberOfFollowing; //a user is loaded
    int numberOfPostedRecipes;
    int numberOfFavouriteRecipes;
    //We will store profile image here because we will load often
    String imageBase64; // A Base64 encoded string of the profile image that was encoded on the frontend.
    String imageString; // A Base64 encoded string of the profile image that was encoded on the backend.
    Binary image;       // A BsonBinary to store the profile image as binary data.
    String active;
    String createdAt;
    public User(String name, String userName, String familyName, String email, String imageString){

        this.name = name;
        this.familyName = familyName;
        this.userName = userName;
        this.email = email;
        this.numberOfFollowers = 0;
        this.numberOfFollowing = 0;
        this.numberOfPostedRecipes = 0;
        this.numberOfFavouriteRecipes = 0;
        //this.imageBase64 = imageBase64;
        this.imageString = imageString;
        //this.image = image;
        this.active = "true";
        // DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX") ;//("yyyy/MM/dd HH:mm:ss");
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public int getNumberOfFollowers() {
        return numberOfFollowers;
    }

    public void setNumberOfFollowers(int numberOfFollowers) {
        this.numberOfFollowers = numberOfFollowers;
    }

    public int getNumberOfFollowing() {
        return numberOfFollowing;
    }

    public void setNumberOfFollowing(int numberOfFollowing) {
        this.numberOfFollowing = numberOfFollowing;
    }

    public int getNumberOfPostedRecipes() {
        return numberOfPostedRecipes;
    }

    public void setNumberOfPostedRecipes(int numberOfPostedRecipes) {
        this.numberOfPostedRecipes = numberOfPostedRecipes;
    }

    public int getNumberOfFavouriteRecipes() {
        return numberOfFavouriteRecipes;
    }

    public void setNumberOfFavouriteRecipes(int numberOfFavouriteRecipes) {
        this.numberOfFavouriteRecipes = numberOfFavouriteRecipes;
    }

    // public String getImageBase64() {
    //     return imageBase64;
    // }
    //
    // public void setImageBase64(String imageBase64) {
    //     this.imageBase64 = imageBase64;
    // }

    public String getImageString() {
        return imageString;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }

    // public Binary getImage() {
    //     return image;
    // }
    //
    // public void setImage(Binary image) {
    //     this.image = image;
    // }

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String editedAt) {
        this.createdAt = editedAt;
    }

}
