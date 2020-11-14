package com.ibm.training;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController 
{
	@Autowired
	LoginService service;
	
	@Autowired
	private MailService notificationService;

	
	
	@GetMapping(path="/hrDetails/all")
	public @ResponseBody Iterable<HR> getAllHR() {
		System.out.println("url hit for all");
		return service.getAllHR();
	}
	
	@RequestMapping("/send-mail")
	public String send(@RequestBody HR hr) 
	{
		System.out.println("controller called");
		//user.setEmailAddress(hr.getUseremail());  //Receiver's email address
		try {
			notificationService.sendEmail(hr);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		return "Congratulations! Your mail has been send to the user.";
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/updateHR")
	void updateHR(@RequestBody HR hr) 
	{
		System.out.println(hr);
		service.updateHR(hr);
	}
}
