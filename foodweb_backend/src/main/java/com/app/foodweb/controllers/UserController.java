package com.app.foodweb.controllers;

//ALGOLIA

import com.algolia.search.*;

//FOODWEB

import com.app.foodweb.models.User;
import com.app.foodweb.models.UserImage;
import com.app.foodweb.repositories.UserRepository;

//SPRING BOOT

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

//JAVA

import java.util.Base64;
import java.util.Optional;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.List;

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

	//users profile information update route
	@RequestMapping(method=RequestMethod.PUT, value="app/edit_profile/{id}")
	public User updateProfile(@PathVariable String id, @RequestBody User user){
		Optional<User> optuser = userRepository.findById(id);
		User u = optuser.get();
		if(user.getName() != null){
			u.setName(user.getName());
		}
		if(user.getEmail() != null){
			u.setEmail(user.getEmail());
		}
		if(user.getUserName() != null){
			u.setUserName(user.getUserName());
		}
		if(user.getFamilyName() != null){
			u.setFamilyName(user.getFamilyName());
		}
		if(user.getAboutMe() != null){
			u.setAboutMe(user.getAboutMe());
		}

		if(user.getActive() != null){
			u.setActive(user.getActive());
		}
		userRepository.save(u);
		// UserImage userImage = new UserImage(
		// 	user.getName(),
		// 	user.getFamilyName(),
		// 	user.getUserName(),
		// 	user.getImageString(),
		// 	user.getId());
		// index.saveObject(userImage);
		return u;

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
		if(optuser.isPresent()){
			//DELETE FROM INDEX IF EXIST
			User user = optuser.get();
			if(user.getActive().equals("true")){
				String objectID = user.getId();
				index.deleteObject(objectID);
			}
			userRepository.delete(user);
			return "DELETE: success";
		}
		return "ERROR:No user found with the given id";
	}

}
