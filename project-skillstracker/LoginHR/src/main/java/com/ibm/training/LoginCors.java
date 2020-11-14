package com.ibm.training;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Component
public class LoginCors extends WebMvcConfigurerAdapter
{
	@Override
	public void addCorsMappings(CorsRegistry registry) 
	{
		registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
		
	}
}
