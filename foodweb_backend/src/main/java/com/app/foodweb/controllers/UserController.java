package com.app.foodweb.controllers;

//ALGOLIA

import com.algolia.search.*;

//FOODWEB

import com.app.foodweb.models.User;

import com.app.foodweb.models.UserImage;

import com.app.foodweb.repositories.UserRepository;
//SPRING BOOT


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


//JAVA


import java.util.Optional;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {

	SearchClient client =
	DefaultSearchClient.create("2RJQDQ5U0W", "d050b5c7676c0b34f05785f1213f6a79");
	SearchIndex<UserImage> index = client.initIndex("users", UserImage.class);

	@Autowired
	UserRepository userRepository;


	//users sign-up route
	@RequestMapping(method=RequestMethod.POST, value="app/signup")
	public User signup(@RequestBody User user){

		if(userRepository.existsByEmail(user.getEmail())){
			User userD = userRepository.findByEmail(user.getEmail());
			return userD;
		}
		userRepository.save(user);
		UserImage userImage = new UserImage(
		user.getName(),
		user.getFamilyName(),
		user.getUserName(),
		user.getImageString(),
		user.getId());
		index.saveObject(userImage);
		return user;
	}

	//finding users by their unique id
	@RequestMapping(method=RequestMethod.GET, value="app/user/{id}")
	public User getUser(@PathVariable String id){
		return userRepository.findById(id).get();
	}

	//route to find all registered users

	@RequestMapping(method=RequestMethod.GET, value="app/all_users")
	public Iterable<User> getAllUsers(){
		return userRepository.findAll();
	}

	//deleting account
	@RequestMapping(method=RequestMethod.DELETE, value="app/delete_account/{id}")
	public String deleteAccount(@PathVariable String id){
		Optional<User> optuser = userRepository.findById(id);
		User user = optuser.get();
		System.out.println(user.getUserName());
		//DELETE FROM INDEX IF EXIST
		if(user.getActive().equals("true")){
			String objectID = user.getId();
			index.deleteObject(objectID);
		}

		userRepository.delete(user);
		return "";

	}


	
	}
