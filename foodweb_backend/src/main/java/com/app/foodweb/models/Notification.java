<<<<<<< HEAD

package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {
    @Id
    String id;
    String notifiedUserId;
    String notificationText;
    boolean isNotificationViewed = false;

    public Notification(String notifiedUserId, String notificationText) {
        this.notifiedUserId = notifiedUserId;
        this.notificationText = notificationText;
        
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNotifiedUserId() {
        return notifiedUserId;
    }

    public void setNotifiedUserId(String notifiedUserId) {
        this.notifiedUserId = notifiedUserId;
    }

    public String getNotificationText() {
        return notificationText;
    }

    public void setNotificationText(String notificationText) {
        this.notificationText = notificationText;
    }

    public boolean isIsNotificationViewed() {
        return isNotificationViewed;
    }

    public void setIsNotificationViewed(boolean isNotificationViewed) {
        this.isNotificationViewed = isNotificationViewed;
    }
    
    
}
=======

package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {
    @Id
    String id;
    String notifiedUserId;
    String notificationText;
    String isViewed = "false";
    String senderUserId;
    String type; 
    
    public Notification(String notifiedUserId, String senderUserId, String type, String notificationText) {
        this.notifiedUserId = notifiedUserId;
        this.senderUserId = senderUserId;
        this.notificationText = notificationText;
        this.type = type;
        
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNotifiedUserId() {
        return notifiedUserId;
    }

    public void setNotifiedUserId(String notifiedUserId) {
        this.notifiedUserId = notifiedUserId;
    }

    public String getNotificationText() {
        return notificationText;
    }

    public void setNotificationText(String notificationText) {
        this.notificationText = notificationText;
    }

    public String getIsViewed() {
        return isViewed;
    }

    public void setIsViewed(String isViewed) {
        this.isViewed = isViewed;
    }
    
    public String getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(String senderUserId) {
        this.senderUserId = senderUserId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    
}
>>>>>>> 2b513dcfed2bff45f7437a5214f2f8d01a16c904
