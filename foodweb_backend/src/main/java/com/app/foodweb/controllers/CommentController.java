package com.app.foodweb.controllers;


import com.app.foodweb.models.Comment;

import com.app.foodweb.repositories.UserRepository;
import com.app.foodweb.repositories.CommentRepository;
import com.app.foodweb.repositories.RecipeRepository;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CommentController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    CommentRepository commentRepository;

    //add a comment to a recipe
    @RequestMapping(method=RequestMethod.POST, value="app/add_comment_to_recipe/{recipeId}")
    public Comment addCommentToRecipe(@PathVariable String recipeId,@RequestBody Comment comment){
        commentRepository.save(comment);
    		return comment;
    }

    //delete a comment from a recipe
    @RequestMapping(method=RequestMethod.DELETE, value="app/user/{userId}/recipe/{recipeId}/time/{createdAt}/delete_comment")
    public String removeCommentFromRecipe(@PathVariable String userId,@PathVariable String recipeId,@PathVariable String createdAt){
        Comment comment = commentRepository.findBySenderIdAndRecipeIdAndCreatedAt(userId,recipeId,createdAt);
        commentRepository.delete(comment);
    		return "";
    }

    //get all recipe's comments
    @RequestMapping(method=RequestMethod.GET, value="app/get_all_comments/{recipeId}")
    public List<Comment> getRecipeComment(@PathVariable String recipeId){
        return commentRepository.findByRecipeId(recipeId);
    }


}
