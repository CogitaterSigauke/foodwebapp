package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.RecipeLikes;
import org.springframework.data.repository.CrudRepository;

public interface RecipeLikesRepository extends CrudRepository<RecipeLikes, String> {
    @Override
    void delete(RecipeLikes deleted);
    Boolean existsByRecipeId(String recipeId);
    RecipeLikes findByRecipeId(String recipeId);
    }
