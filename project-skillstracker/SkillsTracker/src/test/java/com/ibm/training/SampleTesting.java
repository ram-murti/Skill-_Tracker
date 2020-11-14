package com.ibm.training;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class SampleTesting 
{
//	@Autowired
//	RestTemplate restTemplate;
	
//	@Autowired
//	SkillsRestController sc;
	
	AssociateInfo assoInfo=new AssociateInfo();
	
	@Test
	public void testAssociate()
	{
		RestTemplate restTemplate = new RestTemplate();
		System.out.println("restTemplate "+restTemplate);
		ResponseEntity<AssociateInfo> response = restTemplate.getForEntity("http://localhost:8088/associate/1001", AssociateInfo.class);
		System.out.println("response: "+response);
		assertEquals(expectedAssociate().associateName, response.getBody().associateName);
	}
	
	AssociateInfo expectedAssociate()
	{
		assoInfo.setAssociateId("1001");
		assoInfo.setAssociateEmail("chandlerb1@in.ibm.com");
		assoInfo.setAssociateImage("http://127.0.0.1:8887/Chandler.jpg");
		assoInfo.setAssociateMobile("8976899890");
		assoInfo.setAssociateName("Chandler Bing");
		return assoInfo;
	}
}
