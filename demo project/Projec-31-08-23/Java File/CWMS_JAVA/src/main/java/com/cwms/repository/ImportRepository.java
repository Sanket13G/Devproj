package com.cwms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;
import com.cwms.entities.Import;

import jakarta.transaction.Transactional;

@EnableJpaRepositories
public interface ImportRepository extends JpaRepository<Import, String> {
	
	@Query(value="select * from import",nativeQuery=true)
	public List<Import> findByAll();

	   @Query(value="select distinct i.tp_no from import i where i.tp_date=:date and i.company_id=:cid and i.branch_id=:bid" , nativeQuery=true)
	    public List<String> findByTp(@Param("date") Date date,@Param("cid") String cid,@Param("bid") String bid);
	
	
	public List<Import> findByTpDate(Date tpDate);
	
	
	@Query(value = "select * from import i where i.company_id=:cid and i.branch_id=:bid and i.tp_date=:date and i.tp_no=:tpno", nativeQuery = true)
	public List<Import> findByTpdateTpno(
	    @Param("cid") String cid,
	    @Param("bid") String bid,
	    @Param("date") Date date,
	    @Param("tpno") String tp_no
	   // @Param("status") char status
	    ); // Use "status" parameter here

	@Query(value = "SELECT airline_name FROM import WHERE company_id = ?1 AND branch_id = ?2 AND sir_date BETWEEN ?3 AND ?4 AND status = 'A' AND pctm_no = '' GROUP BY airline_name", nativeQuery = true)
	   List<String> findAirlineNames(String companyId, String branchId, Date startDate, Date endDate);
	   
	   
	   @Query(value = "SELECT DISTINCT airline_name, mawb,  sir_no,sir_date, parcel_type, hawb, nop ,flight_date,flight_no FROM import  WHERE company_id =:companyId AND branch_id =:branchId  AND sir_date BETWEEN :startDate AND :endDate AND status = 'A' AND pctm_no = '' AND airline_name = :airlineName", nativeQuery = true)
	    List<Object[]> findImportData(@Param("companyId") String companyId, @Param("branchId") String branchId,@Param("startDate") Date startDate,@Param("endDate") Date endDate,
	    		@Param("airlineName") String airlineName);

	    
	    @Query(value = "SELECT DISTINCT * " +
	            "FROM import " +
	            "WHERE company_id = :companyId " +
	            "AND branch_id = :branchId " +
	            "AND sir_date BETWEEN :startDate AND :endDate " +
	            "AND status = 'A'" +
	            "AND pctm_no = '' " +
	            "AND airline_name = :airlineName", nativeQuery = true)
	     List<Import> findImportAllData(String companyId, String branchId, Date startDate, Date endDate,
	                                    String airlineName);


}
