package com.ibm.training;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	
	private JavaMailSender javaMailSender;

	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	public void sendEmail(HR hr) throws MailException 
	{
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(hr.getUseremail());
		mail.setSubject("Confidential - Password Reset");
		mail.setText("You can reset the password by clicking on this link http://localhost:4200/passwordPage");
		javaMailSender.send(mail);
		System.out.println("mail sent");
	}
}