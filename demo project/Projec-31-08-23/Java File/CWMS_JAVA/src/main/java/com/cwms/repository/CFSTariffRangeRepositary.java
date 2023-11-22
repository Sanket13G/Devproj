package com.cwms.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.cwms.entities.CFSTariffRange;
import com.cwms.entities.CFSTariffService;

public interface CFSTariffRangeRepositary extends JpaRepository<CFSTariffRange, String> {
	
	List<CFSTariffRange> findByCompanyIdAndBranchIdAndCfsTariffNoAndCfsAmndNo(
		        String companyId, String branchId, String cfsTariffNo, String cfsAmndNo
		    );

	 List<CFSTariffRange> findByCompanyIdAndBranchId(String companyId, String branchId);
	
	 List<CFSTariffRange> findByCompanyIdAndBranchIdAndCfsTariffNoAndCfsAmndNoAndServiceIdAndStatusNot(String companyId, String branchId, String cfsTariffNo, String cfsAmndNo, String serviceId, String status
		    );
//	List<CFSTariffRange> findByCfsTariffNoAndServiceId(String cfsTariffNo, String serviceId);

//	CFSTariffRange findByCfsTariffNoAndServiceIdAndSrlNo(String tarrifNo, String serviceId, int srlNo);

	@Query(value = 
	        "SELECT DISTINCT a.cfs_tariff_no, a.service_id, a.tax_applicable, s.service_short_desc, s.rate_calculation, a.rate,a.CFS_Amnd_No " +
	        "FROM cfstdtrfrng a " +
	        "LEFT OUTER JOIN services s ON a.company_id = s.company_id AND a.branch_id = s.branch_id AND a.service_ID = s.service_id " +
	        "WHERE a.company_id = :companyId AND a.branch_id = :branchId AND a.CFS_Tariff_No = :tariffNo AND a.status <> 'D' " +
	        
	        "UNION ALL " +
	        
	        "SELECT a.cfs_tariff_no, a.service_id, a.tax_applicable, s.service_short_desc,s.rate_calculation ,a.rate,a.CFS_Amnd_No " +
	        "FROM cfstdtrfsrv a " +
	        "LEFT OUTER JOIN services s ON a.company_id = s.company_id AND a.branch_id = s.branch_id AND a.service_ID = s.service_id " +
	        "WHERE a.company_id = :companyId AND a.branch_id = :branchId AND a.CFS_Tariff_No = :tariffNo AND a.status <> 'D'", nativeQuery = true)
	    List<Object[]> getCombinedResultsForTariff(String companyId, String branchId, String tariffNo);

//	select a.cfs_tariff_no,a.service_id,a.tax_applicable,
//	s.service_short_desc from
//	cfstdtrfsrv a
//	left outer
//	join services
//	s on a.company_id=
//	s.company_id and a.branch_id=s.branch_id and a.service_ID=
//	s.service_id where a.company_id='C00001'
//	and a.branch_id='B00001'
//	and a.CFS_Tariff_No='CFST000002';
}