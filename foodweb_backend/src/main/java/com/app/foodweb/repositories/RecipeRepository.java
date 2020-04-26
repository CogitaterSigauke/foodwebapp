package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Recipe;
import org.springframework.data.repository.CrudRepository;

public interface RecipeRepository extends CrudRepository<Recipe, String> {
    @Override
    void delete(Recipe deleted);

    void saveAs(Recipe recipe);

    Recipe find(String recipeId);

    Recipe update(String recipeId);

    }