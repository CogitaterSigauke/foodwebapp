package com.app.foodweb.models;

public class UserImage {

    String objectID; //for algolia API
    String name;
    String email;
    String userName;
    String familyName;

    //We will store profile image here because we will load often
    String imageString; // A Base64 String encoded string of the profile image that was encoded on the frontend.

    public UserImage(){
        
    }
    public UserImage(String name, String familyName, String userName, String imageString, String objectID){

        this.name = name;
        this.familyName = familyName;
        this.userName = userName;
        this.imageString = imageString;
        this.objectID = objectID;

    }

    public String getObjectID() {
        return objectID;
    }

    public void setObjectID(String objectID) {
        this.objectID = objectID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getImageString() {
        return imageString;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }
}
