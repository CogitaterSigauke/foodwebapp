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
    @RequestMapping(method=RequestMethod.POST, value="app/add_review/{recipeId}/{starcount}")
    public int giveReviewToRecipe(@PathVariable String recipeId,@PathVariable int starcount,@RequestBody Review newReview){
          //check if a recipe already has one review object associated with it
            Review review = reviewRepository.findByRecipeId(recipeId);
          if(review != null){
            //if the recipe has a review object associated with it, the starcounts will be updated
            System.out.println("yas");
            setStarCounts(starcount,review);
            return review.getMaxCount();
          }
          //if the recipe never received a review in the past, it gets a new review object
          reviewRepository.save(newReview);
          //starcount on the new review object will be updated
          setStarCounts(starcount,newReview);
          //the new starcount is going to be the maxcount of all the starcount the receipe recieved
          return starcount;

    }

    public void setStarCounts(int starCount,Review review){
      if(starCount == 1){ review.setOneStartCount(review.getOneStartCount() + 1);}
      else if(starCount == 2){review.setTwoStartCount(review.getTwoStartCount() + 1);   }
      else if(starCount == 3){review.setThreeStartCount(review.getThreeStartCount() + 1);   }
      else if(starCount == 4){review.setFourStartCount(review.getFourStartCount() + 1); }
      else if(starCount == 5){review.setFiveStartCount(review.getFiveStartCount() + 1);  }
      else { System.out.println("Error! no review received");}
      reviewRepository.save(review);
    }


    // get all the recipe reviews
    @RequestMapping(method=RequestMethod.GET, value="app/get_review/{recipeId}")
    public int getRecipeReview(@PathVariable String recipeId){
         //check if the recipe already exists
          Optional<Recipe> recipe = recipeRepository.findById(recipeId);
          if(recipe.isPresent()){
            //if the recipe exists, check if a review object has associated with it
            Review review = reviewRepository.findByRecipeId(recipeId);
            if(review != null){
               //the recipe has a review object associated with it
               return review.getMaxCount();
            }
            else{
              // the recipe has never received a review
              return 0;
            }
          }
          //no recipe is found and -1 is returned to inform something went wrong
          System.out.println("No recipe exists with the given id");
          return -1;
    }


    @RequestMapping(method=RequestMethod.GET, value="app/number_of_people_reviewed_the_recipe/{recipeId}")
     public int getNumberOfpeopleWhoReviewedTheRecipe(@PathVariable String recipeId){
       Optional<Recipe> recipe = recipeRepository.findById(recipeId);
       if(recipe.isPresent()){
         //if the recipe exists, check if a review object has associated with it
         Review review = reviewRepository.findByRecipeId(recipeId);
         if(review != null){
            //the recipe has a review object associated with it
            return review.getNumberOfReviews();
         }
         return 0;
     }
     //no recipe is found and -1 is returned to inform something went wrong
     System.out.println("No recipe exists with the given id");
     return -1;

}

}
