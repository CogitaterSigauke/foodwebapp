package com.app.foodweb.controllers;

import com.app.foodweb.models.Recipe;
import com.app.foodweb.models.User;
import com.app.foodweb.repositories.RecipeRepository;
import com.app.foodweb.repositories.UserRepository;

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

@RestController
public class RecipeController {

    @Autowired

		RecipeRepository recipeRepository;

		UserRepository userRepository;

		@RequestMapping(method=RequestMethod.POST, value="app/add/recipe")
    public Recipe save(@PathVariable String id,@RequestBody Recipe recipe) {
        if(userRepository.findById(id).get().getActive().equals("true")){
				   recipeRepository.save(recipe);
           return recipe;
				 }
				 return null;
    }

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
 					if(recipe.getImageBase64() != null){
             r.setImageBase64(recipe.getImageBase64());
 		      }
 					if(recipe.getImage() != null){
             r.setImage(recipe.getImage());
 		      }

 					recipeRepository.save(r);
          return r;

 	 }

		@RequestMapping(method=RequestMethod.DELETE, value="app/{user_id}/delete_recipe/{recipe_id}")
 	  public String deleteRecipe(@PathVariable String user_id,@PathVariable String recipe_id){
				 Recipe recipe = recipeRepository.findById(recipe_id).get();
				 // recipe can only be deleted by the owner of the recipe.
		 		 if(recipe.getUserId().equals(user_id)){
		         recipeRepository.delete(recipe);
		         return "";
         }
				 return null;
 	 }




}
