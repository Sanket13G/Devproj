package com.cwms.service;

import java.util.List;

import com.cwms.entities.Jar;
import com.cwms.entities.JarId;

public interface JarService {

	List<Jar> getlist();
	
	Jar saveJar(Jar jar);

	Jar findByJarID(String id);

}