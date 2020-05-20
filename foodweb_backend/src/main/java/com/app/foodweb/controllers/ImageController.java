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
public class ImageController {

  @Autowired
  ImageRepository imageRepository;

  @Autowired
  RecipeRepository recipeRepository;


  @RequestMapping(method=RequestMethod.POST, value="app/user/{user_id}/recipe-additional_photos-upload/{recipe_id}")
  public List<Image> addPhotosToRecipe (@PathVariable
                                      String recipe_id,@PathVariable String user_id,@RequestParam("captions") String[] captions, @RequestParam("files") MultipartFile[] files) {

    List<Image> createdImages = new ArrayList<Image>();
    Optional<Recipe> optrecipe = recipeRepository.findById(recipe_id);

    if(files.length == captions.length){
      if (optrecipe.isPresent()) {
        Recipe recipe = optrecipe.get();
        try {

            int i = 0;
            for(MultipartFile file:files){

              String imageBase64String = Base64.getEncoder().encodeToString(file.getBytes());

              String imageString = "data:" + file.getContentType() + ";base64," + imageBase64String;

              Image imagenew = new Image(user_id,recipe_id,captions[i],imageString,"recipe");

              imageRepository.save(imagenew);

              createdImages.add(imagenew);
              i++;
            }

            return createdImages;

          }
          catch (Exception e) {
            System.out.println("saveImage Exception: " + e);

            Optional<Recipe> newRecipe = Optional.of(recipe);

            return createdImages;
          }
        }
        else{
          return createdImages;
        }}
        System.out.println("No image found");
        return createdImages;

      }



      //find additional photos of a recipe by recipe'id
      @RequestMapping(method=RequestMethod.GET, value="app/recipe/{recipe_id}/see_more_photos")
      public List<Image> getAllRecipesPhotos(@PathVariable String recipe_id){
        List<Image> photos = imageRepository.findByRecipeId(recipe_id);
        return photos;
      }

    }
