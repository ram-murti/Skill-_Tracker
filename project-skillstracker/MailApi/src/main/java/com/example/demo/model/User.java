package com.example.demo.model;

import javax.persistence.Entity;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Component;

@Component
public class User {


	private String emailAddress;

	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
}
