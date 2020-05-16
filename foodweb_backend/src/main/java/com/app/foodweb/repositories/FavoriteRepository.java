package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Favorite;
import org.springframework.data.repository.CrudRepository;

public interface FavoriteRepository extends CrudRepository<Favorite, String> {
    @Override
    void delete(Favorite deleted);

    List<Favorite> findByUserId(String userId);

    List<Favorite> findByUserIdAndRecipeId(String userId, String recipeId);
    }
