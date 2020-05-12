package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Recipe;
import org.springframework.data.repository.CrudRepository;

public interface RecipeRepository extends CrudRepository<Recipe, String> {
    @Override
    void delete(Recipe deleted);

    List<Recipe> findByMealType(String mealType);


    // List<Recipe> findByMealType(String mealType);
    //
     List<Recipe> findByDietHealth(String dietHealth);
    //
     List<Recipe> findByWorldCuisine(String worldCuisine);
    //
     List<Recipe> findByUserId(String userId);
}
