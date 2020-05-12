<<<<<<< HEAD
package com.app.foodweb.controllers;


import com.app.foodweb.models.User;


import com.app.foodweb.repositories.UserRepository;

=======

package com.app.foodweb.controllers;

//ALGOLIA

import com.algolia.search.*;

//FOODWEB

import com.app.foodweb.repositories.RecipeRepository;
import com.app.foodweb.repositories.UserRepository;
import com.app.foodweb.repositories.ImageRepository;
import com.app.foodweb.repositories.VideoRepository;
import com.app.foodweb.models.Recipe;
import com.app.foodweb.models.RecipeImage;
import com.app.foodweb.models.User;
import com.app.foodweb.models.Image;
import com.app.foodweb.models.Video;

//SPRING
>>>>>>> 2b513dcfed2bff45f7437a5214f2f8d01a16c904

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
<<<<<<< HEAD

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
=======
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

//JAVA

import java.util.Base64;
import java.util.Iterator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
>>>>>>> 2b513dcfed2bff45f7437a5214f2f8d01a16c904
import java.util.Optional;

@RestController
public class RecipeController {
<<<<<<< HEAD
	
	@Autowired
    RecipeRepository recipeRepository;
    	
    @RequestMapping(method=RequestMethod.POST, value="app/home")
    public User save(@RequestBody User user) {
        recipeRepository.save(user);
        return user;
    }

    @RequestMapping(method=RequestMethod.POST, value="app/signup")
    public User signup(@RequestBody User user){

        if(recipeRepository.existsByEmail(user.getEmail())){
            User userD = recipeRepository.findByEmail(user.getEmail());
            return userD;
        }
            recipeRepository.save(user);
            return user;
        

    }
 
            
=======

    @Autowired

		RecipeRepository recipeRepository;

		UserRepository userRepository;

    ImageRepository imageRepository;

    VideoRepository videoRepository;

    SearchClient client =
      DefaultSearchClient.create("2RJQDQ5U0W", "d050b5c7676c0b34f05785f1213f6a79");
    SearchIndex<RecipeImage> index = client.initIndex("recipes", RecipeImage.class);

		@RequestMapping(method=RequestMethod.POST, value="app/user/add/recipe/{id}")
    public Recipe save(@PathVariable String id,@RequestBody Recipe recipe) {

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
            recipe.getImageString());
          index.saveObject(recipeImage);
          return recipe;
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
            r.getImageString());
          index.saveObject(recipeImage);
          return r;

 	 }

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

    @RequestMapping(method=RequestMethod.GET, value="app/meal_type")
    public List<String> getAllMealType(){
           List<String> mealTypes = Arrays.asList("Appetizers & Snacks", "Breakfast & Brunch","Desserts","Dinner","Drinks");
           return mealTypes;
    }

    @RequestMapping(method=RequestMethod.GET, value="app/diet_and_health")
    public List<String> getAllDietAndHealth(){
           List<String>  dietAndHealth = Arrays.asList("Diabetic","Gluten Free","Healthy","Low Calorie","Low Fat");
           return dietAndHealth;
    }

    @RequestMapping(method=RequestMethod.GET, value="app/world_cuisine")
    public List<String> getAllWorldCuisine(){
          List<String> worldCuisine = Arrays.asList("Asian","Indian","Italian","Low Calorie","Mexican","African");
          return worldCuisine;
      }

   @RequestMapping(method=RequestMethod.GET, value="app/meal_type/{mealType}")
   public ArrayList<Recipe> getAllRecipesByMealType(@PathVariable String mealType ){
       ArrayList<Recipe> recipes = new ArrayList<Recipe>();
       Iterable<Recipe> allRecipes = recipeRepository.findAll();
       Iterator<Recipe> iter = allRecipes.iterator();
       while(iter.hasNext()){
              Recipe recipe = iter.next();
              if(recipe.getMealType() == mealType){
                recipes.add(recipe);
              }
       }
       return recipes;
  }


  @RequestMapping(method=RequestMethod.GET, value="app/diet_and_health/{diet_and_health}")
  public ArrayList<Recipe> getAllRecipesByDietAndHealth(@PathVariable String diet_and_health ){
      ArrayList<Recipe> recipes = new ArrayList<Recipe>();
      Iterable<Recipe> allRecipes = recipeRepository.findAll();
      Iterator<Recipe> iter = allRecipes.iterator();
      while(iter.hasNext()){
             Recipe recipe = iter.next();
             if(recipe.getDietAndHealth() == diet_and_health){
               recipes.add(recipe);
             }
      }
      return recipes;
 }


 @RequestMapping(method=RequestMethod.GET, value="app/world_cuisine/{world_cuisine}")
 public ArrayList<Recipe> getAllRecipesByWorldCuisine(@PathVariable String world_cuisine ){
     ArrayList<Recipe> recipes = new ArrayList<Recipe>();
     Iterable<Recipe> allRecipes = recipeRepository.findAll();
     Iterator<Recipe> iter = allRecipes.iterator();
     while(iter.hasNext()){
            Recipe recipe = iter.next();
            if(recipe.getWorldCuisine() == world_cuisine){
              recipes.add(recipe);
            }
     }
     return recipes;
}

@RequestMapping(method=RequestMethod.POST, value="app/recipe-photo-upload/{recipe_id}")
 public Optional<Recipe> saveImageToRecipe (@PathVariable("recipe_id") String recipe_id,@RequestBody MultipartFile file) {
       //Optional<User> optuser = userRepository.findById(user_id);
       Optional<Recipe> optrecipe = recipeRepository.findById(recipe_id);

       if (optrecipe.isPresent()) {
         Recipe recipe = optrecipe.get();
         try {

           String imageBase64String = Base64.getEncoder().encodeToString(file.getBytes());

           String imageString = "data:" + file.getContentType() + ";base64," + imageBase64String;
           recipe.setImageString(imageString);
           recipeRepository.save(recipe);

            // UPDATE INDEX
           RecipeImage recipeImage = new RecipeImage(
            recipe.getId(),
            userRepository.findById(recipe.getUserId()).get().getUserName(),
            recipe.getMealType(),
            recipe.getDietAndHealth(),
            recipe.getWorldCuisine(),
            recipe.getMealName(),
            recipe.getCreatedAt(),
            recipe.getImageString());
           index.saveObject(recipeImage);

           Optional<Recipe> newRecipe = Optional.of(recipe);

           return newRecipe;
       }
       catch (Exception e) {
           System.out.println("saveImage Exception: " + e);

           Optional<Recipe> newRecipe = Optional.of(recipe);

           return newRecipe;
       }
   } else {
       return optrecipe;
   }
}
@RequestMapping(method=RequestMethod.GET, value="app/recipe/{recipe_id}/see_more_photos")
public List<Image> getAllRecipesPhotos(@PathVariable String recipe_id){
      List<Image> photos = imageRepository.findByRecipeId(recipe_id);
      return photos;
}

@RequestMapping(method=RequestMethod.GET, value="app/recipe/{recipe_id}/see_more_videos")
public List<Video> getAllRecipesVideos(@PathVariable String recipe_id){
     List<Video> videos = videoRepository.findByRecipeId(recipe_id);
     return videos;
}

@RequestMapping(method=RequestMethod.GET, value="app/recipe/{recipe_id}")
public Recipe getRecipe(@PathVariable String recipe_id){
        return recipeRepository.findById(recipe_id).get();
}

@RequestMapping(method=RequestMethod.GET, value="app/all_recipes")
public Iterable<Recipe> getAllRecipes(){
       return recipeRepository.findAll();
}

@RequestMapping(method=RequestMethod.POST, value="app/user/{user_id}/recipe-additional_photos-upload/{recipe_id}",
                consumes = "application/json")
 public Optional<Recipe> addPhotosToRecipe (@PathVariable
            String recipe_id,@PathVariable
                       String user_id,@RequestBody Image[] images, @RequestBody MultipartFile[] files) {
                   //Optional<User> optuser = userRepository.findById(user_id);
                   Optional<Recipe> optrecipe = recipeRepository.findById(recipe_id);
                  if(files.length == images.length){
                   if (optrecipe.isPresent()) {
                     Recipe recipe = optrecipe.get();
                     try {
                        //System.out.println("SHOW ME files"+ files.length);
                        //System.out.println("SHOW ME images"+ images.length);
                       if(recipe.getUserId() == user_id){
                         int i = 0;
                          for(MultipartFile file: files){

                              String imageBase64String = Base64.getEncoder().encodeToString(file.getBytes());

                              String imageString = "data:" + file.getContentType() + ";base64," + imageBase64String;

                              images[i].setImageString(imageString);

                              imageRepository.save(images[i]);

                              i++;
                            }}
                               //  String mimeType = file.getContentType();
                               //  String type = mimeType.split("/")[0];
                               //if(type.equalsIgnoreCase("image")){

                       Optional<Recipe> newRecipe = Optional.of(recipe);
                       return newRecipe;
                  // }
                    //return optrecipe;
                 }
                    catch (Exception e) {
                       System.out.println("saveImage Exception: " + e);

                       Optional<Recipe> newRecipe = Optional.of(recipe);

                       return newRecipe;
                   }
                }
                else{
                   return optrecipe;
                }}
                System.out.println("No image found");
                return null;

 }


 @RequestMapping(method=RequestMethod.POST, value="app/user/{user_id}/recipe-additional_videos-upload/{recipe_id}")
  public Optional<Recipe> addVideosToRecipe (@PathVariable
             String recipe_id,@PathVariable
                        String user_id,@RequestBody Video[] videos, @RequestBody MultipartFile[] files) {

                    Optional<Recipe> optrecipe = recipeRepository.findById(recipe_id);
                    if(videos.length == files.length){
                    if (optrecipe.isPresent()) {
                      Recipe recipe = optrecipe.get();
                      try {

                        if(recipe.getUserId() == user_id){
                          int i = 0;
                           for(MultipartFile file: files){

                                String videoBase64String = Base64.getEncoder().encodeToString(file.getBytes());
                                String videoString = "data:" + file.getContentType() + ";base64," + videoBase64String;
                                videos[i].setVideoURL(videoString);
                                videoRepository.save(videos[i]);

                                i++;

                            }

                                }
                        Optional<Recipe> newRecipe = Optional.of(recipe);
                        return newRecipe;
                   // }
                     //return optrecipe;
                  }
                     catch (Exception e) {
                        System.out.println("saveImage Exception: " + e);

                        Optional<Recipe> newRecipe = Optional.of(recipe);

                        return newRecipe;
                    }
                 }
                 else{
                    return optrecipe;
                 }}
                 System.out.println("No video found");
                 return null;

  }


@RequestMapping(method=RequestMethod.GET, value="app/user/{user_id}/all_recipes")
public List<Recipe> getAllRecipesByUser(@PathVariable String user_id){
       List<Recipe> r = recipeRepository.findByUserId(user_id);
       return r;
}



>>>>>>> 2b513dcfed2bff45f7437a5214f2f8d01a16c904
}
