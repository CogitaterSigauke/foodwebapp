package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.SuperChat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Sort;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


public interface SuperChatRepository extends CrudRepository<SuperChat, String> {
    @Override
    void delete(SuperChat deleted);

    @Query("{'recipeId': {$eq: '?0'} }}")
    List<SuperChat> findSuperChats(String recipeId);
}
