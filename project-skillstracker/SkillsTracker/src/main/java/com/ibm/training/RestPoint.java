package com.ibm.training;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;;

@Component
public class RestPoint extends WebMvcConfigurerAdapter
{
	@Override
	public void addCorsMappings(CorsRegistry registry) 
	{
		registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
		
	}
}
