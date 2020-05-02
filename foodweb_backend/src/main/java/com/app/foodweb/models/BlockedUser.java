
package com.app.foodweb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blockedUsers")

public class BlockedUser {
    @Id
    String id;
    String blockerUserId;
    String blockedUserId;

    public BlockedUser(String blockerUserId, String blockedUserId) {
        this.blockerUserId = blockerUserId;
        this.blockedUserId = blockedUserId;
    }
    
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBlockerUserId() {
        return blockerUserId;
    }

    public void setBlockerUserId(String blockerUserId) {
        this.blockerUserId = blockerUserId;
    }

    public String getBlockedUserId() {
        return blockedUserId;
    }

    public void setBlockedUserId(String blockedUserId) {
        this.blockedUserId = blockedUserId;
    }
   
    
}
