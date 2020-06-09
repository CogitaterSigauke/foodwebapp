package com.app.foodweb;

import  com.app.foodweb.controllers.UserController;
import  com.app.foodweb.controllers.RecipeController;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestController {

	@Autowired
	private UserController userController;
	
	@Autowired
	private RecipeController recipeController;
	
	

	@Test
	public void contexLoads() throws Exception {
		assertThat(userController).isNotNull();
		//Passes
		assertThat(userController).isNotSameAs(recipeController);
		assertThat(recipeController).hasNoNullFieldsOrProperties();
		//Fails
		assertThat(userController).isNotSameAs(userController);
		
	}
}

