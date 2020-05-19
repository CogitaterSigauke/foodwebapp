package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.BlockedUser;
import org.springframework.data.repository.CrudRepository;

public interface BlockedUserRepository extends CrudRepository<BlockedUser, String> {
    @Override
    void delete(BlockedUser deleted);

    List<BlockedUser> findByBlockerUserId(String blockerUserId);
    }
