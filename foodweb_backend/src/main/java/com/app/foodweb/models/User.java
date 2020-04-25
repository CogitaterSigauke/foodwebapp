package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    String id;
    String profilePicId = "";
    String aboutMe = "";
    int messageCount = 0;
    int notificationCount = 0;
    boolean deactivatedAccount = false;

    public User() {   
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProfilePicId() {
        return profilePicId;
    }

    public void setProfilePicId(String profilePicId) {
        this.profilePicId = profilePicId;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public int getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(int messageCount) {
        this.messageCount = messageCount;
    }

    public int getNotificationCount() {
        return notificationCount;
    }

    public void setNotificationCount(int notificationCount) {
        this.notificationCount = notificationCount;
    }

    public boolean isDeactivatedAccount() {
        return deactivatedAccount;
    }

    public void setDeactivatedAccount(boolean deactivatedAccount) {
        this.deactivatedAccount = deactivatedAccount;
    }
    
    
    

}
