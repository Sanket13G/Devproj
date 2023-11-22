package com.cwms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.cwms.entities.CFSTariffService;
import com.cwms.entities.CfsTarrif;

public interface cfsServicesRepo extends JpaRepository<CFSTariffService, String>
{
	
	 List<CFSTariffService> findByCompanyIdAndBranchId(String companyId, String branchId);
	 
	 List<CFSTariffService> findByCfsTariffNoAndCompanyIdAndBranchId(String cfsTariffNo, String companyId, String branchId);
	 
	 CFSTariffService findByCompanyIdAndBranchIdAndCfsTariffNoAndCfsAmndNoAndServiceId(String companyId, String branchId, String cfsTariffNo,String amndno ,String serviceId);
}