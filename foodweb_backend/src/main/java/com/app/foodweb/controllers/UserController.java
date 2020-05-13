package com.app.foodweb.controllers;

//ALGOLIA

import com.algolia.search.*;

//FOODWEB

import com.app.foodweb.models.User;
import com.app.foodweb.models.UserImage;
import com.app.foodweb.models.BlockedUser;
import com.app.foodweb.repositories.UserRepository;
import com.app.foodweb.repositories.BlockedUserRepository;

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

@RestController
public class UserController {

	SearchClient client =
    DefaultSearchClient.create("2RJQDQ5U0W", "d050b5c7676c0b34f05785f1213f6a79");
    SearchIndex<UserImage> index = client.initIndex("users", UserImage.class);

	@Autowired
    UserRepository userRepository;

		BlockedUserRepository blockedUserRepository;


  
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
			UserImage userImage = new UserImage(
				user.getName(),
				user.getFamilyName(),
				user.getUserName(),
				user.getImageString(),
				user.getId());
			index.saveObject(userImage);
          return u;

	 }


         //when users start following another user, the number of users they follow automatically gets updated
	 @RequestMapping(method=RequestMethod.PUT, value="app/{id}/follow")
	 public User followUser(@PathVariable String id){
		 Optional<User> optuser = userRepository.findById(id);
	   User u = optuser.get();
		 u.setNumberOfFollowing(u.getNumberOfFollowing() + 1);
		 userRepository.save(u);
		 return u;
	 }

        //when users unfollow other users, the number of users they follow automatically gets updated
	 @RequestMapping(method=RequestMethod.PUT, value="app/{id}/unfollow")
	 public User unFollowUser(@PathVariable String id){
		 Optional<User> optuser = userRepository.findById(id);
		 User u = optuser.get();
		 u.setNumberOfFollowing(u.getNumberOfFollowing() - 1);
		 userRepository.save(u);
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
         //route to deactivate users' account
	 @RequestMapping(method=RequestMethod.PUT, value="app/deactivate_account/{id}")
	 public User deactivateAccount(@PathVariable String id){
		Optional<User> optuser = userRepository.findById(id);
		User user = optuser.get();
		user.setActive("false");
		userRepository.save(user);
		String objectID = user.getId();
		index.deleteObject(objectID);
		return user;
	 }
         // activating an account that was deactivated
	 @RequestMapping(method=RequestMethod.PUT, value="app/activate_account/{id}")
	 public User activateAccount(@PathVariable String id){
		Optional<User> optuser = userRepository.findById(id);
		User user = optuser.get();
		user.setActive("true");
		userRepository.save(user);

		//ADD TO INDEX
		UserImage userImage = new UserImage(
		user.getName(),
		user.getFamilyName(),
		user.getUserName(),
		user.getImageString(),
		user.getId());
		index.saveObject(userImage);
		return user;
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
         //route to find all blocked users by the user
	 @RequestMapping(method=RequestMethod.GET, value="app/{id}/blocked_users")
	 public List<BlockedUser> getBlockedUsers(@PathVariable String id){
			List<BlockedUser> blockerAndBlocked = blockedUserRepository.findByBlockerUserId(id);
			return blockerAndBlocked;


	 }

         //route to block a user. When a user is blocked, user and the blocked user get associated with a new id and stored in BlockedUser repository
	 @RequestMapping(method=RequestMethod.POST, value="app/{user_id}/block/{other_id}")
	 public BlockedUser blockUser(@RequestBody BlockedUser user){
					blockedUserRepository.save(user);
					return user;

	 }
         //route to unblocked a blocked user. it is removing the association held between the blocker and blocked user.
	 @RequestMapping(method=RequestMethod.DELETE, value="app/{user_id}/unblock/{other_id}")
	 public String unBlockUser(@RequestBody BlockedUser user){
				 blockedUserRepository.delete(user);
				 return "";
	 }

        //saving user's profile image in database in the form of image-string
	@RequestMapping(method=RequestMethod.POST, value="app/{id}/image-upload")
	 public Optional<User> saveImageToUser(@PathVariable String id, @RequestParam("file") MultipartFile file) {
				 Optional<User> optuser = userRepository.findById(id);
				 if (optuser.isPresent()) {
					 User user = optuser.get();
					 try {
						 // // Encoding to a Base64 String
						 String imageBase64String = Base64.getEncoder().encodeToString(file.getBytes());
						 // // Now storing it in the format:
						 String imageString = "data:" + file.getContentType() + ";base64," + imageBase64String;
						 user.setImageString(imageString);
						 userRepository.save(user);

						 Optional<User> newUser = Optional.of(user);
						 System.out.println("Successfully image updated");
						 return newUser;
				 } catch (Exception e) {
						 System.out.println("saveImage Exception:" + e);

						 Optional<User> newUser = Optional.of(user);

						 return newUser;
				 }
		 } else {
				 System.out.println("Couldn't find user");
				 return optuser;

		 }
 }}
