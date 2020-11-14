package com.ibm.training;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Message {
	
	private String message;
	@Id
	private String mail;
	
	

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
