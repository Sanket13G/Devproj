package com.cwms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.cwms.entities.CfsTarrif;

public interface CFSRepositary extends JpaRepository<CfsTarrif, String>
{

//	 @Query(value = "SELECT * FROM cfstdtrf as s WHERE s.CFS_Tariff_No = :cfstarrifno", nativeQuery = true)
//	    CfsTarrif findByCfsTarrifNo(@Param("cfstarrifno") String cfstarrifno);
	 
	 List<CfsTarrif> findByCompanyIdAndBranchId(String companyId, String branchId);
	 
	 @Query(value = "SELECT * FROM cfstdtrf WHERE cfs_tariff_no = ?1 AND company_id = ?2 AND branch_id = ?3", nativeQuery = true)
	    CfsTarrif findByCfsTariffNoAndCompanyIdAndBranchId(String cfsTariffNo, String companyId, String branchId);
	 
	 
//	 CfsTarrif findByCfsTariffNoAndCompanyIdAndBranchId(String cfsTariffNo, String companyId, String branchId);
}