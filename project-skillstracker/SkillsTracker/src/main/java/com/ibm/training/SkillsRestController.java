package com.ibm.training;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SkillsRestController 
{
	@Autowired
	SkillsService service;
	
	@Autowired
	FileService fileservice;
	
	@Autowired
	private MailService notificationService;

	
	@Autowired
	RestTemplate restTemplate;
	 
	 @PostMapping("/profile/uploadpicture")
	 public ResponseEntity < String > handleFileUpload(@RequestParam("file") MultipartFile file) 
	 {
	  String message = "";
	  try {
	   System.out.println("File uploaded: "+file);
	   fileservice.store(file);
	   message = "You successfully uploaded " + file.getOriginalFilename() + "!";
	   System.out.println(message);
	   return ResponseEntity.status(HttpStatus.OK).body(message);
	  } catch (Exception e) {
	   message = "Fail to upload Profile Picture" + file.getOriginalFilename() + "!";
	   return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
	  }
	 }	
	 
	 
	@RequestMapping("/associate/{id}")
	Optional<AssociateInfo> getAssociate(@PathVariable("id") String id) {
		System.out.println("url hit");
		return service.getAssociate(id);
	}
	
	@GetMapping(path="/associate/all")
	public @ResponseBody Iterable<AssociateInfo> getAllAssociates() {
		System.out.println("url hit for all");
		return service.getAllAssociates();
	}
	
	@GetMapping(path="/associateSkills/{id}")
	List<AssociateSkills> getAllAssociatesSkills(@PathVariable("id") String id) {
		System.out.println("url hit for all skills");
		return service.getAllAssociatesSkills(id);
	}
	
	@GetMapping(path="/associateSkills/all")
	Iterable<AssociateSkills> getAssociatesSkills() {
		System.out.println("url hit for all associate skills");
		return service.getAssociatesSkills();
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/deleteAssociateSkillByAid/{id}")
	Iterable<AssociateSkills> deleteAssociatesSkillsByAid(@PathVariable String id) {
		return service.deleteAssociatesSkillsByAid(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/updateAssociateSkills")
	void updateAssociateSkills(@RequestBody AssociateSkills skills) 
	{
		System.out.println(skills);
		service.updateAssociateSkills(skills);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/updateAssociate")
	void updateAssociate(@RequestBody AssociateInfo associate) 
	{
		System.out.println(associate);
		service.updateAssociate(associate);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/saveAssociate")
	void saveAssociate(@RequestBody AssociateInfo associate) 
	{
		System.out.println(associate);
		service.saveAssociate(associate);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/deleteAssociate/{id}")
	void deleteAssociate(@PathVariable String id) {
		service.deleteAssociate(id);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/deleteAssociateSkill/{id}")
	void deleteAssociateSkill(@PathVariable Integer id) {
		service.deleteAssociateSkill(id);
	}
	
	@GetMapping(path="/skills/all")
	public Iterable<SkillsInfo> getAllSkills()
	{
		return service.getAllSkills();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/saveSkills")
	void saveSkills(@RequestBody List<SkillsInfo> skillInfo) 
	{
		System.out.println("save skills");
		service.saveSkills(skillInfo);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/send-mail")
	public String send(@RequestBody Message msg) 
	{
		System.out.println("controller called");
		System.out.println(msg.getMessage());
		//user.setEmailAddress(hr.getUseremail());  //Receiver's email address
		try {
			notificationService.sendEmail(msg);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		return "Congratulations! Your mail has been send to the user.";
	}
	
	
	
//	@SuppressWarnings("unchecked")
//	@GetMapping(path="/hrDetails/all")
//	public HR[] getFromLogin() {
//		System.out.println("url hit for login");
//		String url = "http://main-skillsLoginHR-tracker/hrDetails/all";
//		return restTemplate.getForObject(url, HR[].class);
//	}
	
//	@RequestMapping(method = RequestMethod.PUT, value = "/updateHR")
//	void updateHR(@RequestBody HR hr) 
//	{
//		System.out.println(hr);
//		String url = "http://main-skillsLoginHR-tracker/updateHR";
//		restTemplate.put(url, hr);
//	}
	
}