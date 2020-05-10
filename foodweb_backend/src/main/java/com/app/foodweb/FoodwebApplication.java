package com.app.foodweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import  java.security.Security; //for algolia search

@SpringBootApplication
public class FoodwebApplication {

	public static void main(String[] args) {
		Security.setProperty("networkaddress.cache.ttl", "60");
		SpringApplication.run(FoodwebApplication.class, args);
	}

}
