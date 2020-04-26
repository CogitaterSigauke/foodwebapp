
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
