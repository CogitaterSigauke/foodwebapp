package com.app.foodweb.controllers;

import com.app.foodweb.models.SuperChat;
import com.app.foodweb.repositories.SuperChatRepository;

//SPRING BOOT

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
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

//JAVA

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Comparator;
import java.time.LocalDateTime;


@CrossOrigin
@RestController
public class SuperChatController {

	@Autowired
	SuperChatRepository superChatRepository;



	@RequestMapping(method=RequestMethod.POST, value="app/superchat")
	public SuperChat sentsuperChat(@RequestBody SuperChat superChat) {

		superChatRepository.save(superChat);
		return superChat;
	}

	//primary user is the user who is requesting for the superChats
	@RequestMapping(method=RequestMethod.GET, value="app/superchat/{recipeId}")
	public List<SuperChat> getRecentSuperChats(@PathVariable String recipeId) {

		List<SuperChat> superChats = superChatRepository.findSuperChats(recipeId);
		superChats.sort((SuperChat m1, SuperChat m2)->LocalDateTime.parse(m2.getCreatedAt()).compareTo(LocalDateTime.parse(m1.getCreatedAt())));
		return superChats;
	}

	@RequestMapping(method=RequestMethod.DELETE, value="app/superChat/{superChatId}")
	public Map<String,String> deleteSuperChat(@PathVariable String superChatId){

		SuperChat superChat = superChatRepository.findById(superChatId).get();
		superChatRepository.delete(superChat);
		Map<String,String> res = new HashMap<String, String>();
		res.put("status","success");
		return res;
	}

}
