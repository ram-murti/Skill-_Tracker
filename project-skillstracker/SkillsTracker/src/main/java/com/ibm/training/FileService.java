package com.ibm.training;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.stereotype.Service;

@Service
public class FileService 
{
	 private final Path rootLocation = Paths.get("ProfilePictureStore");
	 public void store(MultipartFile file) {
	  try {
	   System.out.println(file.getOriginalFilename());
	   System.out.println(rootLocation.toUri());
	   System.out.println(file.getInputStream());
	   Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
	   System.out.println("stored");
	  } catch (Exception e) {
		  System.out.println("Exception "+e);
	   throw new RuntimeException("FAIL!");
	  }
	 }
}
