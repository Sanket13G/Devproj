package com.cwms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cwms.entities.User;
import com.cwms.repository.UserCreationRepository;
import com.cwms.repository.UserRepository;
import com.cwms.service.UserCreationService;
import com.cwms.service.UserCreationServiceImpliment;

@CrossOrigin("*")
@RequestMapping("/UserCreation")
@RestController
public class UserCreationController {

	@Autowired
	UserCreationRepository userCreationRepository;

	@Autowired
	private UserRepository userrepo;
	
	
	@Autowired
	UserCreationServiceImpliment creationServiceImpliment;

	@Autowired
	private BCryptPasswordEncoder passwordencode;

	@PostMapping(value = "/add")
	public User saveUserCreation(@RequestBody User entity) {
	    if (entity.getStatus() == null || entity.getStatus().isEmpty()) {
	        entity.setStatus("N");
	    } else if (entity.getStatus().equals("N")) {
	        entity.setStatus("E");
	    }

	    // Fetch the existing user from the database
	    User existingUser = userrepo.findByUser_Id(entity.getUser_Id());

	    if (existingUser == null) {
	        // New user, encode the password
	        entity.setUser_Password(passwordencode.encode(entity.getUser_Password()));
	    } else if (!entity.getUser_Password().equals(existingUser.getUser_Password()) &&
	               (existingUser.getUser_Password() != null && !existingUser.getUser_Password().isEmpty())) {
	        // Existing user, new password is different from old and old password is not empty
	        entity.setUser_Password(passwordencode.encode(entity.getUser_Password()));
	    } else {
	        // Use the existing password
	        entity.setUser_Password(existingUser.getUser_Password());
	    }

	    entity.setCurrentSystemDate();
	    System.out.println(entity);
	    return creationServiceImpliment.saveUser(entity);
	}


	@PostMapping(value = "/Update")
	public User updateUserCreation(@RequestBody User entity) {
	    if (entity.getStatus().equals("N") || entity.getStatus().equals("E")) {
	        entity.setStatus("A");
	    }

	    User existingUser = userrepo.findByUser_Id(entity.getUser_Id()); // Fetch the existing user from the database

	    // Check if the new password is different from the old password
	    if (!entity.getUser_Password().equals(existingUser.getUser_Password())) {
	        // Encode the new password
	        entity.setUser_Password(passwordencode.encode(entity.getUser_Password()));
	    }

	    entity.setCurrentSystemDate();
	    System.out.println(entity);

	    return creationServiceImpliment.saveUser(entity);
	}



	@GetMapping(value = "/list")
	public List<User> getUserCreationList() {
		return creationServiceImpliment.getlist();
	}

	@DeleteMapping(value = "/delete/{id}")
	public String deleteMethodName(@PathVariable String id) {

		User user = userCreationRepository.findByUser_Id(id);
		user.setStatus("D");

		creationServiceImpliment.saveUser(user);
		return "Successfully Deleted...";
	}

}