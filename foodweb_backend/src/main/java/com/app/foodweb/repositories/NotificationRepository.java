package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Notification;
import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<Notification, String> {
    @Override
    void delete(Notification deleted);

    }
