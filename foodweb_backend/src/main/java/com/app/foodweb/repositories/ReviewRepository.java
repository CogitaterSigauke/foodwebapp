package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Review;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, String> {
    @Override
    void delete(Review deleted);

    Review findByRecipeId(String recipeId);
    }
