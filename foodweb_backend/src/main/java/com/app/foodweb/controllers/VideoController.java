package com.app.foodweb.controllers;

//ALGOLIA

import com.algolia.search.*;

//FOODWEB

import com.app.foodweb.repositories.RecipeRepository;
import com.app.foodweb.repositories.UserRepository;
import com.app.foodweb.repositories.ImageRepository;
import com.app.foodweb.repositories.VideoRepository;
import com.app.foodweb.repositories.ReviewRepository;
import com.app.foodweb.models.Recipe;
import com.app.foodweb.models.RecipeImage;
import com.app.foodweb.models.User;
import com.app.foodweb.models.Image;
import com.app.foodweb.models.Video;
import com.app.foodweb.models.Review;

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
import org.springframework.web.bind.annotation.RequestParam;
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

@CrossOrigin
@RestController
public class VideoController {

	@Autowired
	VideoRepository videoRepository;

	@Autowired
	RecipeRepository recipeRepository;



    //upload additional recipe videos only by the recipe owner
		@RequestMapping(method=RequestMethod.POST, value="app/user/{user_id}/recipe-additional_videoa-upload/{recipe_id}")
	  public List<Video> addVideosToRecipe (@PathVariable
	                                      String recipe_id,@PathVariable String user_id,@RequestParam("files") MultipartFile[] files) {

	    List<Video> createdVideos = new ArrayList<Video>();
	    Optional<Recipe> optrecipe = recipeRepository.findById(recipe_id);

	    if(files.length > 0){
	      if (optrecipe.isPresent()) {
	        Recipe recipe = optrecipe.get();
	        try {

	            for(MultipartFile file:files){

	              String videoBase64String = Base64.getEncoder().encodeToString(file.getBytes());

	              String videoString = "data:" + file.getContentType() + ";base64," + videoBase64String;

	              Video newVideo = new Video(user_id,recipe_id,videoString,"recipe");

	              videoRepository.save(newVideo);

	              createdVideos.add(newVideo);

	            }

	            return createdVideos;

	          }
	          catch (Exception e) {
	            System.out.println("saveVideo Exception: " + e);

	            Optional<Recipe> newRecipe = Optional.of(recipe);

	            return createdVideos;
	          }
	        }
	        else{
	          return createdVideos;
	        }}
	        System.out.println("No video found");
	        return createdVideos;

	      }



		//find videos associated with the recipe by recipe'id
		@RequestMapping(method=RequestMethod.GET, value="app/recipe/{recipe_id}/see_more_videos")
		public List<Video> getAllRecipesPhotos(@PathVariable String recipe_id){
			List<Video> videos = videoRepository.findByRecipeId(recipe_id);
			return videos;
		}

	}
