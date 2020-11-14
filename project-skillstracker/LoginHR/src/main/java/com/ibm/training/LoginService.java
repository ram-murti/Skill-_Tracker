package com.ibm.training;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService 
{
	@Autowired
	LoginRepo repo;
	
	public Iterable<HR> getAllHR() 
	{
		return repo.findAll();
	}

	public void updateHR(HR hr) {
		repo.save(hr);
	}
	
}
