package com.cwms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cwms.entities.Import;

public interface ImportRepo extends JpaRepository<Import, String>
{

	Import findByCompanyIdAndBranchIdAndImpTransIdAndMawbAndHawbAndSirNo(
	        String companyId, String branchId, String impTransId, String mawb, String hawb, String sirNo
	    );
	 
	List<Import> findByCompanyIdAndBranchIdAndMawbAndStatusNot( String companyId, String branchId,String mawb,String status);
	
//	 Import findByMawbAndHawb(String mawb, String hawb);
	 List<Import> findByCompanyIdAndBranchIdAndStatusNot(String companyId, String branchId,String status);
	 
	 Import findByCompanyIdAndBranchIdAndImpTransIdAndSirNo(String companyId, String branchId, String impTransId,String SirNo);
}