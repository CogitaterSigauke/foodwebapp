package com.app.foodweb.repositories;

import java.util.List;
import java.util.Optional;
import com.app.foodweb.models.Review;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, String> {
    @Override
    void delete(Review deleted);

    Optional<Review> findByRecipeIdAndUserId(String recipeId,String userId);

    List<Review> findByRecipeId(String recipeId);
    }
