package com.app.foodweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import  java.security.Security; //for algolia search

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class FoodwebApplication {

	public static void main(String[] args) {
		Security.setProperty("networkaddress.cache.ttl", "60");
		SpringApplication.run(FoodwebApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/app/signup").allowedOrigins("http://localhost:3000");
			}
		};
	}


}
