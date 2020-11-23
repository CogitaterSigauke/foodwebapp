
package com.app.foodweb.controllers;

//ALGOLIA

import com.algolia.search.*;

//FOODWEB

import com.app.foodweb.repositories.RecipeRepository;
import com.app.foodweb.repositories.UserRepository;
import com.app.foodweb.models.Recipe;
import com.app.foodweb.models.RecipeImage;



//SPRING


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


//JAVA


import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class RecipeController {

  @Autowired
  RecipeRepository recipeRepository;

  @Autowired
  UserRepository userRepository;

  

  SearchClient client =
  DefaultSearchClient.create("2RJQDQ5U0W", "d050b5c7676c0b34f05785f1213f6a79");
  SearchIndex<RecipeImage> index = client.initIndex("recipes", RecipeImage.class);

  @RequestMapping(method=RequestMethod.POST, value="app/user/add/recipe")
  public Recipe saveRecipe(@RequestBody Recipe recipe) {

    recipeRepository.save(recipe);

    // UPDATE INDEX
    RecipeImage recipeImage = new RecipeImage(
    recipe.getId(),
    recipe.getUserName(),
    recipe.getMealType(),
    recipe.getDietAndHealth(),
    recipe.getWorldCuisine(),
    recipe.getMealName(),
    recipe.getCreatedAt(),
    recipe.getImageString(),
    recipe.getLikesCount()
    );
    index.saveObject(recipeImage);
    return recipe;
  }
   //update recipe info
   @RequestMapping(method=RequestMethod.PUT, value="app/edit_recipe/{id}")
   public Recipe updateRecipe(@PathVariable String id, @RequestBody Recipe recipe){
     Recipe r = recipeRepository.findById(id).get();
 
     if(recipe.getMealName() != null){
       r.setMealName(recipe.getMealName());
     }
     if(recipe.getMealType() != null){
       r.setMealType(recipe.getMealType());
     }
     if(recipe.getDietAndHealth() != null){
       r.setDietAndHealth(recipe.getDietAndHealth());
     }
     if(recipe.getWorldCuisine() != null){
       r.setWorldCuisine(recipe.getWorldCuisine());
     }
     if(recipe.getDescription() != null){
       r.setDescription(recipe.getDescription());
     }
     if(recipe.getIngredients() != null){
       r.setIngredients(recipe.getIngredients());
     }
     if(recipe.getSteps() != null){
       r.setSteps(recipe.getSteps());
     }
     if(recipe.getUrls() != null){
       r.setUrls(recipe.getUrls());
     }
     if(recipe.getImageString() != null){
       r.setImageString(recipe.getImageString());
     }
     recipeRepository.save(r);
     // UPDATE INDEX
     RecipeImage recipeImage = new RecipeImage(
     r.getId(),
     r.getUserName(),
     r.getMealType(),
     r.getDietAndHealth(),
     r.getWorldCuisine(),
     r.getMealName(),
     r.getCreatedAt(),
     r.getImageString(),
     r.getLikesCount());
 
     index.saveObject(recipeImage);
     return r;
 
   }
 
 


  //delete a recipe. recipe is deleted only by the owner of the recipe
  @RequestMapping(method=RequestMethod.DELETE, value="app/{user_id}/delete_recipe/{recipe_id}")
  public String deleteRecipe(@PathVariable String user_id,@PathVariable String recipe_id){
    Recipe recipe = recipeRepository.findById(recipe_id).get();
    //A recipe can only be deleted by its owner.
    if(recipe.getUserId().equals(user_id)){
      String objectID = recipe.getId();
      recipeRepository.delete(recipe);
      index.deleteObject(objectID);
      return "DELETE: success";
    }
    return "ERROR: authorization";
  }
 
  // find recipe by id
  @RequestMapping(method=RequestMethod.GET, value="app/recipe/{recipe_id}")
  public Recipe getRecipe(@PathVariable String recipe_id){
    return recipeRepository.findById(recipe_id).get();
  }
  // get all the recipes that are registered
  @RequestMapping(method=RequestMethod.GET, value="app/all_recipes")
  public Iterable<Recipe> getAllRecipes(){
    return recipeRepository.findAll();
  }

  //find all recipes which are registered under a specific user
  @RequestMapping(method=RequestMethod.GET, value="app/user/{user_id}/all_recipes")
  public List<Recipe> getAllRecipesByUser(@PathVariable String user_id){
    List<Recipe> r = recipeRepository.findByUserId(user_id);
    return r;
  }


  public Recipe getRecipeTrigger(String recipe_id){
    return recipeRepository.findById(recipe_id).get();
  }


  public Recipe updateRecipeTrigger(String id, Recipe recipe){
    Recipe r = recipeRepository.findById(id).get();

    if(recipe.getMealName() != null){
      r.setMealName(recipe.getMealName());
    }
    if(recipe.getMealType() != null){
      r.setMealType(recipe.getMealType());
    }
    if(recipe.getDietAndHealth() != null){
      r.setDietAndHealth(recipe.getDietAndHealth());
    }
    if(recipe.getWorldCuisine() != null){
      r.setWorldCuisine(recipe.getWorldCuisine());
    }
    if(recipe.getDescription() != null){
      r.setDescription(recipe.getDescription());
    }
    if(recipe.getIngredients() != null){
      r.setIngredients(recipe.getIngredients());
    }
    if(recipe.getSteps() != null){
      r.setSteps(recipe.getSteps());
    }
    if(recipe.getUrls() != null){
      r.setUrls(recipe.getUrls());
    }
    recipeRepository.save(r);
    // UPDATE INDEX
    RecipeImage recipeImage = new RecipeImage(
    r.getId(),
    r.getUserName(),
    r.getMealType(),
    r.getDietAndHealth(),
    r.getWorldCuisine(),
    r.getMealName(),
    r.getCreatedAt(),
    r.getImageString(),
    r.getLikesCount());

    index.saveObject(recipeImage);
    return r;

  }


}
