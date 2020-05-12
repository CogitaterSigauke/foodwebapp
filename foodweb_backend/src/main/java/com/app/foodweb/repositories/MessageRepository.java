package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message, String> {
    @Override
    void delete(Message deleted);

    }
