package com.app.foodweb.controllers;

import com.app.foodweb.models.User;
import com.app.foodweb.models.BlockedUser;
import com.app.foodweb.repositories.UserRepository;
import com.app.foodweb.repositories.BlockedUserRepository;

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

import java.util.Base64;
import java.util.Optional;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
public class UserController {

	@Autowired
    UserRepository userRepository;

		BlockedUserRepository blockedUserRepository;

    @RequestMapping(method=RequestMethod.POST, value="app/home")
    public User save(@RequestBody User user) {
        userRepository.save(user);
        return user;
    }

    @RequestMapping(method=RequestMethod.POST, value="app/signup")
    public User signup(@RequestBody User user){

        if(userRepository.existsByEmail(user.getEmail())){
            User userD = userRepository.findByEmail(user.getEmail());
            return userD;
        }
            userRepository.save(user);
            return user;
    }


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
					if(user.getImageBase64() != null){
            u.setImageBase64(user.getImageBase64());
		      }
					if(user.getImage() != null){
            u.setImage(user.getImage());
		      }
					if(user.getActive() != null){
            u.setActive(user.getActive());
		      }
					userRepository.save(u);
          return u;

	 }



	 @RequestMapping(method=RequestMethod.PUT, value="app/{id}/follow")
	 public User followUser(@PathVariable String id){
		 Optional<User> optuser = userRepository.findById(id);
	   User u = optuser.get();
		 u.setNumberOfFollowing(u.getNumberOfFollowing() + 1);
		 userRepository.save(u);
		 return u;
	 }

	 @RequestMapping(method=RequestMethod.PUT, value="app/{id}/unfollow")
	 public User unFollowUser(@PathVariable String id){
		 Optional<User> optuser = userRepository.findById(id);
		 User u = optuser.get();
		 u.setNumberOfFollowing(u.getNumberOfFollowing() - 1);
		 userRepository.save(u);
		 return u;
	 }

	 @RequestMapping(method=RequestMethod.GET, value="app/user/{id}")
	 public User getUser(@PathVariable String id){
		       return userRepository.findById(id).get();
	 }

	 @RequestMapping(method=RequestMethod.PUT, value="app/deactivate_account/{id}")
	 public User deactivateAccount(@PathVariable String id){
					 Optional<User> optuser = userRepository.findById(id);
					 User u = optuser.get();
					 u.setActive("false");
					 userRepository.save(u);
					 return u;
	 }

	 @RequestMapping(method=RequestMethod.PUT, value="app/activate_account/{id}")
	 public User activateAccount(@PathVariable String id){
					 Optional<User> optuser = userRepository.findById(id);
					 User u = optuser.get();
					 u.setActive("true");
					 userRepository.save(u);
					 return u;
	 }


	 @RequestMapping(method=RequestMethod.DELETE, value="app/delete_account/{id}")
	 public String deleteAccount(@PathVariable String id){
		 Optional<User> optuser = userRepository.findById(id);
		 User u = optuser.get();
     userRepository.delete(u);
     return "";

	 }

    @RequestMapping(method=RequestMethod.GET, value="app/{id}/blocked_users")
    public Map<String, String> getBlockedUsers(@PathVariable String id){

			  //blocked users' names with their user_ids
        Map<String,String> blockedUsersNamesWithIds = new HashMap<String,String>();

			  Iterable<BlockedUser> allBlockedUsers = blockedUserRepository.findAll();

				Iterator<BlockedUser> iter = allBlockedUsers.iterator();

				while(iter.hasNext()){
	             BlockedUser blockuser = iter.next();
							 if(blockuser.getBlockerUserId().equals(id)){
								 String blockedUserName = userRepository.findById(blockuser.getBlockedUserId()).get().getUserName();
								 blockedUsersNamesWithIds.put(blockedUserName,blockuser.getBlockedUserId());
							 }
        }

				return blockedUsersNamesWithIds;

		}


	 @RequestMapping(method=RequestMethod.POST, value="app/{id}/image-upload")
    public Optional<User> saveImageToUser(@PathVariable String id, @RequestBody MultipartFile file) {
		    	Optional<User> optuser = userRepository.findById(id);


					if (optuser.isPresent()) {
            User user = optuser.get();

            try {
							// Encoding to a Base64 String
							String imageBase64String = Base64.getEncoder().encodeToString(file.getBytes());
							// Now storing it in the format:
              String imageString = "data:" + file.getContentType() + ";base64," + imageBase64String;

              // Save it on the user
              user.setImageString(imageString);

							Binary image = new Binary(BsonBinarySubType.BINARY, file.getBytes());

              user.setImage(image);

							userRepository.save(user);

							Optional<User> newUser = Optional.of(user);

              return newUser;
					} catch (Exception e) {
							System.out.println("saveImage Exception: " + e);

							Optional<User> newUser = Optional.of(user);

              return newUser;
					}
			} else {
					return optuser;
			}
	}

	/*
	@RequestMapping(method=RequestMethod.POST, value="app/message")
	public User sendMessage(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/add_review")
	public User giveReview(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/add_comment")
	public User giveComment(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/add_recipe")
	public User addRecipe(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/get_messages")
	public User getAllMessages(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/get_notifications")
	public User getAllNotifications(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/get_followers_list")
	public User getAllFollowers(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/get_followings_list")
	public User getAllFollowings(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/go_live")
	public User startLiveStreaming(@RequestBody User user){}

	@RequestMapping(method=RequestMethod.POST, value="app/block_user")
	public User blockUser(@RequestBody User user){}
	*/






















}
