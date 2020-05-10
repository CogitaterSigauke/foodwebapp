
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

import java.util.Base64;
import java.util.Iterator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
public class RecipeController {

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
            recipe.getDietHealth(),
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
 					if(recipe.getDietHealth() != null){
             r.setDietHealth(recipe.getDietHealth());
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
            r.getDietHealth(),
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
      public List<Recipe> getAllRecipesByMealType(@PathVariable String mealType ){
          List<Recipe> r = recipeRepository.findByMealType(mealType);
          return r;

     }


     @RequestMapping(method=RequestMethod.GET, value="app/diet_and_health/{dietHealth}")
     public List<Recipe> getAllRecipesByDietAndHealth(@PathVariable String dietHealth ){
         List<Recipe> r = recipeRepository.findByDietHealth(dietHealth);
         return r;

    }


    @RequestMapping(method=RequestMethod.GET, value="app/world_cuisine/{worldCuisine}")
    public List<Recipe> getAllRecipesByWorldCuisine(@PathVariable String worldCuisine ){
         List<Recipe> r = recipeRepository.findByWorldCuisine(worldCuisine);
         return r;
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
            recipe.getUserName(),
            recipe.getMealType(),
            recipe.getDietHealth(),
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
 public ArrayList<Image> getAllRecipesPhotos(@PathVariable String recipe_id){
        ArrayList<Image> photos = new ArrayList<Image>();
        Iterable<Image> allPhotos = imageRepository.findAll();
        Iterator<Image> iter = allPhotos.iterator();
        while(iter.hasNext()){
           Image photo = iter.next();
           if(photo.getRecipeId() == recipe_id){
             photos.add(photo);
           }
       }
       return photos;
}

@RequestMapping(method=RequestMethod.GET, value="app/recipe/{recipe_id}/see_more_videos")
public ArrayList<Video> getAllRecipesVideos(@PathVariable String recipe_id){
       ArrayList<Video> videos = new ArrayList<Video>();
       Iterable<Video> allVideos = videoRepository.findAll();
       Iterator<Video> iter = allVideos.iterator();
       while(iter.hasNext()){
          Video video = iter.next();
          if(video.getRecipeId() == recipe_id){
            videos.add(video);
          }
      }
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

// @RequestMapping(method=RequestMethod.POST, value="app/user/{user_id}/recipe-additional_photos&videos-upload/{recipe_id}")
//  public Optional<Recipe> addPhotosAndVideosToRecipe (@PathVariable
//             String recipe_id,@PathVariable
//                        String user_id, @RequestBody MultipartFile[] files) {
//                    //Optional<User> optuser = userRepository.findById(user_id);
//                    Optional<Recipe> optrecipe = recipeRepository.findById(recipe_id);
//                    if (optrecipe.isPresent()) {
//                      Recipe recipe = optrecipe.get();
//                      try {
//                          System.out.println("SHOW ME "+ files.length);
//                     //  if(recipe.getUserId() == user_id){
//                           for(MultipartFile file: files){
//
//                                 String mimeType = file.getContentType();
//                                 String type = mimeType.split("/")[0];
//
//                                if(type.equalsIgnoreCase("image")){
//
//                                    String imageBase64String = Base64.getEncoder().encodeToString(file.getBytes());
//
//                                    String imageString = "data:" + file.getContentType() + ";base64," + imageBase64String;
//
//                                    Image photo = new Image(user_id,recipe_id,"",imageString,"recipe_more_photos");
//
//                                      //System.out.println("NOW "+photo.getId());
//                                    imageRepository.save(photo);
//
//                                    System.out.println("SUCCESS");
//                                }
//                                else if(type.equalsIgnoreCase("video")){
//                                    String videoBase64String = Base64.getEncoder().encodeToString(file.getBytes());
//                                    String videoString = "data:" + file.getContentType() + ";base64," + videoBase64String;
//                                    Video video = new Video(user_id,recipe_id,videoString,"recipe_more_videos");
//                                    videoRepository.save(video);
//                                }
//                                else{
//                                  System.out.println("unsupported format found!");
//                                }}
//                        Optional<Recipe> newRecipe = Optional.of(recipe);
//                        return newRecipe;
//                   // }
//                     //return optrecipe;
//                  }
//                     catch (Exception e) {
//                        System.out.println("saveImage Exception: " + e);
//
//                        Optional<Recipe> newRecipe = Optional.of(recipe);
//
//                        return newRecipe;
//                    }
//                 }
//                 else{
//                    return optrecipe;
//                 }
//
//  }


@RequestMapping(method=RequestMethod.GET, value="app/user/{user_id}/all_recipes")
public List<Recipe> getAllRecipesByUser(@PathVariable String user_id){
       List<Recipe> r = recipeRepository.findByUserId(user_id);
       return r;
}



}
