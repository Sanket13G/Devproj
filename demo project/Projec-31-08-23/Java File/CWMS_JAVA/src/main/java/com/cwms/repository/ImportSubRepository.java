package com.cwms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.cwms.entities.ImportSub;
import java.util.*;

@EnableJpaRepositories
public interface ImportSubRepository extends JpaRepository<ImportSub, String> {

	@Query(value = "select i.* from importsub i where i.company_id=:cid and i.branch_id=:bid", nativeQuery = true)
	public List<ImportSub> getall(@Param("cid") String cid,@Param("bid") String bid);
	
	@Query(value="select i.* from importsub i where i.company_id=:cid and i.branch_id=:bid and i.imp_sub_id=:subid and i.request_id=:reqid",nativeQuery=true)
	public ImportSub findImportSub(@Param("cid") String cid,@Param("bid") String bid,@Param("subid") String subid,@Param("reqid") String reqid);
	

}
