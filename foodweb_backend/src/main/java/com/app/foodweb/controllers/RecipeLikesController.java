
package com.app.foodweb.controllers;

//FOODWEB

import com.app.foodweb.repositories.RecipeLikesRepository;
import com.app.foodweb.models.RecipeLikes;
import com.app.foodweb.models.Recipe;
import com.app.foodweb.controllers.RecipeController;

//SPRING

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

//JAVA


import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class RecipeLikesController {

  @Autowired
  RecipeLikesRepository recipeLikesRepository;

  RecipeController recipeController = new RecipeController();

  @RequestMapping(method=RequestMethod.POST, value="app/recipe/like")
  public Map<String, Integer> likeRecipe(@RequestBody RecipeLikes recipeLikes) {
    int likesCount = 0;
    RecipeLikes likes;
    int hasLiked = 0;
    // Recipe recipe = recipeController.getRecipeTrigger(recipeLikes.getRecipeId());

    if(recipeLikesRepository.existsByRecipeId(recipeLikes.getRecipeId())){

        likes = recipeLikesRepository.findByRecipeId(recipeLikes.getRecipeId());
        likesCount = likes.like(recipeLikes.getUserId(), recipeLikes.getUserName());
        recipeLikesRepository.save(likes);
        hasLiked = likes.hasLiked(recipeLikes.getUserId(), recipeLikes.getUserName());
        // Update Total Likes Inside Recipe Object
        

    }else{

        recipeLikesRepository.save(recipeLikes);
        likesCount ++;
        hasLiked = recipeLikes.hasLiked(recipeLikes.getUserId(), recipeLikes.getUserName());

    }

   
    Map<String, Integer> res = new HashMap<>();
    res.put("likes", likesCount);
    res.put("hasLiked", hasLiked);
    return res;
    }


    @RequestMapping(method=RequestMethod.POST, value="app/recipe/unlike")
    public Map<String, Integer> unLikeRecipe(@RequestBody RecipeLikes recipeLikes) {
      int likesCount = 0;
      RecipeLikes likes;
      int hasLiked = 0;
      if(recipeLikesRepository.existsByRecipeId(recipeLikes.getRecipeId())){
  
          likes = recipeLikesRepository.findByRecipeId(recipeLikes.getRecipeId());
          likesCount = likes.unLike(recipeLikes.getUserId(), recipeLikes.getUserName());
          recipeLikesRepository.save(likes);         
          hasLiked = likes.hasLiked(recipeLikes.getUserId(), recipeLikes.getUserName());
      }
  
      Map<String, Integer> res = new HashMap<>();
      res.put("likes", likesCount);
      res.put("hasLiked", hasLiked);
      return res;
      
    }

    @RequestMapping(method=RequestMethod.POST, value="app/recipe/hasliked")
    public Map<String, Integer> hasLikedRecipe(@RequestBody RecipeLikes recipeLikes) {
      int hasLiked = 0;
  
      if(recipeLikesRepository.existsByRecipeId(recipeLikes.getRecipeId())){
  
        RecipeLikes likes = recipeLikesRepository.findByRecipeId(recipeLikes.getRecipeId());
        hasLiked = likes.hasLiked(recipeLikes.getUserId(), recipeLikes.getUserName());     
        
      }
  
      Map<String, Integer> res = new HashMap<>();
      res.put("hasLiked", hasLiked);
      return res;
      
    }





    @RequestMapping(method=RequestMethod.GET, value="app/recipe/total_likes/{recipe_id}")
    public Map<String, Integer> totalLikes(@PathVariable String recipe_id) {
      int likesCount = 0;
      RecipeLikes likes;
      if(recipeLikesRepository.existsByRecipeId(recipe_id)){
        
          likes = recipeLikesRepository.findByRecipeId(recipe_id);
          likesCount = likes.getLikesCount();
  
      }
  
      Map<String, Integer> res = new HashMap<>();
      res.put("likes", likesCount);
      return res;


      }

    



}
