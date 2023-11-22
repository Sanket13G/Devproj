package com.cwms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cwms.entities.ProcessNextId;
import com.cwms.entities.ProcessNextIdPK;

import jakarta.transaction.Transactional;

@Repository
public interface ProcessNextIdRepository extends JpaRepository<ProcessNextId, ProcessNextIdPK> {

	List<ProcessNextId> findByProcessId(String processId);

	@Query(value = "Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00037' AND  Fin_Year = '2006' AND  Process_Id = 'P00011'", nativeQuery = true)
	String findNextId();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00001' AND Branch_Id = 'B00037' AND Process_Id = 'P00011' AND fin_year='2006'", nativeQuery = true)
	void updateNextId(String nextId);

	@Query(value = "Select Next_Id from  processnextid  where Company_Id ='C00011' AND Branch_Id = 'B00038' AND  Fin_Year = '2006' AND  Process_Id = 'P00012'", nativeQuery = true)
	String findNextIdforHoliday();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00011' AND Branch_Id = 'B00038' AND Process_Id = 'P00012' AND fin_year='2006'", nativeQuery = true)
	void updateNextIdforHoliday(String nextholi);

	@Query(value = "Select Next_Id from  processnextid  where Company_Id ='C00090' AND Branch_Id = 'B00090' AND  Fin_Year = '2007' AND  Process_Id = 'P00009'", nativeQuery = true)
	String findNextMailId();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00090' AND Branch_Id = 'B00090' AND Process_Id = 'P00009' AND fin_year='2007'", nativeQuery = true)
	void updateNextMailId(String mailId);
	
	
	
	@Query(value = "Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00001' AND  Fin_Year = '2006' AND  Process_Id = 'P00001'", nativeQuery = true)
	String findNextJarDId();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00001' AND Branch_Id = 'B00001' AND Process_Id = 'P00001' AND fin_year='2006'", nativeQuery = true)
	void updateNextJarDId(String nextJarDId);

	@Query(value = "Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00001' AND  Fin_Year = '2007' AND  Process_Id = 'P00002'", nativeQuery = true)
	String findNextJarId();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00001' AND Branch_Id = 'B00001' AND Process_Id = 'P00002' AND fin_year='2007'", nativeQuery = true)
	void updateNextJarId(String nextJarId);
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00099' AND Branch_Id = 'B00099' AND  Fin_Year = '2009' AND  Process_Id = 'P00099'", nativeQuery = true)
	String findNextReId();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00099' AND Branch_Id = 'B00099' AND Process_Id = 'P00099' AND fin_year='2009'", nativeQuery = true)
	void updateNextReId(String mailId);
	
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00012' AND Branch_Id = 'B00039' AND  Fin_Year = '2007' AND  Process_Id = 'P00013'", nativeQuery = true)
	String findNextServiceId();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00012' AND Branch_Id = 'B00039' AND Process_Id = 'P00013' AND fin_year='2007'", nativeQuery = true)
	void updateNextServiceId(String nextServiceId);
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00013' AND Branch_Id = 'B00040' AND  Fin_Year = '2007' AND  Process_Id = 'P00014'", nativeQuery = true)
	String findNextCFSTarrifNo();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00013' AND Branch_Id = 'B00040' AND Process_Id = 'P00014' AND fin_year='2007'", nativeQuery = true)
	void updateNextCFSTarrifNo(String nextCFSTarrifNo);
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00001' AND  Fin_Year = '2007' AND  Process_Id = 'P00015'", nativeQuery = true)
	String findNextSIRNo();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00001' AND Branch_Id = 'B00001' AND Process_Id = 'P00015' AND fin_year='2007'", nativeQuery = true)
	void updateNextSIRNo(String nextSIRNo);
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00001' AND  Fin_Year = '2007' AND  Process_Id = 'P00016'", nativeQuery = true)
	String findNextimpTransId();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00001' AND Branch_Id = 'B00001' AND Process_Id = 'P00016' AND fin_year='2007'", nativeQuery = true)
	void updateNextimpTransId(String nextimpTransId);
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00001' AND  Fin_Year = '2111' AND Process_Id = 'P00100' ", nativeQuery = true)
	String findNextsubimpid();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET  Next_Id = :nextimpTransId WHERE Company_Id = 'C00001' AND Branch_Id = 'B00001' AND fin_year='2111' and Process_Id = 'P00100'", nativeQuery = true)
	void updateNexsubimpid(@Param("nextimpTransId")String nextimpTransId);
	
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00001' AND  Fin_Year = '2010' AND  Process_Id = 'P00015'", nativeQuery = true)
	String findNextSIRExportNo();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET Next_Id = ?1 WHERE Company_Id = 'C00001' AND Branch_Id = 'B00001' AND Process_Id = 'P00015' AND fin_year='2007'", nativeQuery = true)
	void updateNextSIRExportNo(String nextSIRNo);
	
	
	@Query(value = 
			"Select Next_Id from  processnextid  where Company_Id ='C00001' AND Branch_Id = 'B00001' AND  Fin_Year = '2222' AND Process_Id = 'P00200' ", nativeQuery = true)
	String findNextsubimptransid();

	@Modifying
	@Transactional
	@Query(value = "UPDATE processnextid SET  Next_Id = :nextimpTransId WHERE Company_Id = 'C00001' AND Branch_Id = 'B00001' AND fin_year='2222' and Process_Id = 'P00200'", nativeQuery = true)
	void updateNexsubimptransid(@Param("nextimpTransId")String nextimpTransId);
}
