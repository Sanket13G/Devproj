package com.cwms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import com.cwms.entities.Jar;
import com.cwms.entities.JarDetail;

@Repository
public interface JarDetailRepository extends JpaRepository<JarDetail, String> {

	@Query(value = "select * from jar_detail where jar_dtl_id=:id" ,nativeQuery = true)
	JarDetail findJarDetailByID(@Param("id")String id);



	@Query(value = "SELECT * FROM jar_detail WHERE jar_id =:jarid AND Status != 'd' and company_id=:cid " ,nativeQuery = true)
	List<JarDetail> findByID(@Param("jarid") String  jarid, @Param("cid") String  cid );

	@Query(value = "SELECT * FROM jar_detail WHERE jar_id = 'J00009' AND Status != 'd' and company_id=:cid " ,nativeQuery = true)
	List<JarDetail> findDataByID(@Param("cid") String  cid );
	
}