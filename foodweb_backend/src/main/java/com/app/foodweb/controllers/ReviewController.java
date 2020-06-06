package com.app.foodweb.controllers;

import com.app.foodweb.repositories.RecipeRepository;
import com.app.foodweb.repositories.UserRepository;
import com.app.foodweb.repositories.ReviewRepository;

import com.app.foodweb.models.User;
import com.app.foodweb.models.Recipe;
import com.app.foodweb.models.Review;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class ReviewController {

  @Autowired
  RecipeRepository recipeRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ReviewRepository reviewRepository;


  //give a review to a recipe
  @RequestMapping(method=RequestMethod.POST, value="app/user/{userId}/add_review/{recipeId}/{userRating}")
  public double giveReviewToRecipe(@PathVariable String recipeId,@PathVariable String userId,@PathVariable int userRating){
    //check if user has reviewed the recipe before
    Optional<Review> optreview = reviewRepository.findByRecipeIdAndUserId(recipeId,userId);

    if (optreview.isPresent()){
      //re-reviewing a recipe
      Review editedReview =optreview.get();
      editedReview.setUserRating(userRating);
      reviewRepository.save(editedReview);
    }
    else{
      //the recipe is being reviewed for the first time
      Review newReview = new Review(recipeId,userId,userRating);
      reviewRepository.save(newReview);
    }
     return getRecipeReview(recipeId);

  }

  // get all the requested recipe reviews
  @RequestMapping(method=RequestMethod.GET, value="app/get_review/{recipeId}")
  public double getRecipeReview(@PathVariable String recipeId){
      List<Review> reviewsForThisRecipe = reviewRepository.findByRecipeId(recipeId);
      double calculatedRating = 0.0;
      //check if a recipe has reviews
      if(!reviewsForThisRecipe.isEmpty()){
        for(Review review:reviewsForThisRecipe){
           calculatedRating = calculatedRating + review.getUserRating();
           //System.out.println("hello");
        }
        return calculatedRating/reviewsForThisRecipe.size();
     }
     //if a recipe has no reviews, 0.0 will be returned
     return calculatedRating;
  }

  // get number of reviews a recipe has received
  @RequestMapping(method=RequestMethod.GET, value="app/number_of_people_reviewed_the_recipe/{recipeId}")
  public int getNumberOfpeopleWhoReviewedTheRecipe(@PathVariable String recipeId){
       List<Review> reviewsForThisRecipe = reviewRepository.findByRecipeId(recipeId);
       return reviewsForThisRecipe.size();
  }
}
