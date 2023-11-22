package com.cwms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.cwms.entities.Branch;

@EnableJpaRepositories
public interface BranchRepo extends JpaRepository<Branch, String> {

	@Query(value="select * from branch b where b.company_id =:cid",nativeQuery=true)
	public List<Branch> findByCompanyId(@Param("cid") String cid);
	
	//public List<Branch> findByCompany_id(String company_id_company_id);
	
	@Query(value="select * from branch b where b.branch_id=:bid",nativeQuery=true)
	public Optional<Branch> findById(@Param("bid") String bid);
	
	
	@Query(value="select * from branch b where b.branch_id=:bid",nativeQuery=true)
	public Branch findByBranchId(@Param("bid") String bid);
	
	
	
}
