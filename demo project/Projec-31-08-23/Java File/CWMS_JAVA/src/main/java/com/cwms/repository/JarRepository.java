package com.cwms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.cwms.entities.Jar;
import com.cwms.entities.JarId;
@Repository
public interface JarRepository extends JpaRepository<Jar, String> {


	
	
	Jar findByJarId(String id);
}