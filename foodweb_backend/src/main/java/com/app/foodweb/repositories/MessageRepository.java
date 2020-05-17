package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Sort;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


public interface MessageRepository extends CrudRepository<Message, String> {
    @Override
    void delete(Message deleted);
    
    @Query("{$or : [{ $and: [ { 'senderUserId': { $eq: '?0' } }, { 'receiverUserId': {$eq: '?1'} } ] }, { $and: [ { 'senderUserId': { $eq: '?1' } }, { 'receiverUserId': {$eq: '?0'} } ] } ] }")
    List<Message> findMessages(String senderUserId, String receiverUserId);
    // , Sort sort);
    
}
