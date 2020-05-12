package com.app.foodweb.controllers;

<<<<<<< HEAD

import com.app.foodweb.models.User;


import com.app.foodweb.repositories.UserRepository;

=======
import com.app.foodweb.models.Video;
import com.app.foodweb.repositories.VideoRepository;
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

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class VideoController {
	
	@Autowired
    VideoRepository videoRepository;
    	
    @RequestMapping(method=RequestMethod.POST, value="app/home")
    public User save(@RequestBody User user) {
        videoRepository.save(user);
        return user;
    }

    @RequestMapping(method=RequestMethod.POST, value="app/signup")
    public User signup(@RequestBody User user){

        if(videoRepository.existsByEmail(user.getEmail())){
            User userD = videoRepository.findByEmail(user.getEmail());
            return userD;
        }
            videoRepository.save(user);
            return user;
        

    }
 
            
=======
@RestController
public class VideoController {
	
	
 
                
>>>>>>> 2b513dcfed2bff45f7437a5214f2f8d01a16c904
}
