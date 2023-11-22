package com.cwms.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwms.entities.Import;
import com.cwms.repository.ImportRepo;
import com.cwms.repository.ImportRepository;
import com.cwms.entities.Import;
import com.cwms.repository.ImportRepo;
@Service
public class ImportServiceImpl implements ImportService {

	@Autowired
	private ImportRepository imprepo;
	
	
	
	
//	public List<Import> getdatabytpdate(Date date) {
//		return imprepo.findByTp(date);
//	}
	
	
	@Autowired
	public ImportRepository importRepo;
//	
	
	
	@Autowired
	public ImportRepo importRepository;
	
	@Override
	public List<Import> getByMAWB(String CompId,String branchId,String mawbno) {
		// TODO Auto-generated method stub
		return importRepository.findByCompanyIdAndBranchIdAndMawbAndStatusNot(CompId,branchId,mawbno,"D");
	}

	@Override
	public Import addImport(Import import2) {
		// TODO Auto-generated method stub
		return importRepository.save(import2);
	}

	@Override
	public Import updateImport(Import import2) {
		// TODO Auto-generated method stub
		return importRepository.save(import2);
	}

	@Override
	public Import getByMAWBANdHAWB(String CompId,String branchId,String transId,String MAWB, String HAWB, String SirNo) {
		// TODO Auto-generated method stub
		return importRepository.findByCompanyIdAndBranchIdAndImpTransIdAndMawbAndHawbAndSirNo(CompId,branchId,transId,MAWB,HAWB,SirNo);
	}

	@Override
	public List<Import> getAll(String CompId,String branchId) {
		// TODO Auto-generated method stub
		return importRepository.findByCompanyIdAndBranchIdAndStatusNot(CompId,branchId,"D");
	}

//	@Override
//	public Import findByCompanyIdAnsBranchIdAndimpTransId(String compId, String branchId, String impTransId) {
//		// TODO Auto-generated method stub
//		return importRepo.findByCompanyIdAndBranchIdAndImpTransId(compId, branchId, impTransId);
//	}

	@Override
	public void deleteImport(Import import2) {
		
		importRepository.delete(import2);
	}

	@Override
	public Import findBytransIdAndSirNo(String CompId, String branchId, String transId, String Sirno) {
		// TODO Auto-generated method stub
		return importRepository.findByCompanyIdAndBranchIdAndImpTransIdAndSirNo(CompId, branchId, transId, Sirno);
	}
//	public List<Import> getImportsBySirDateAndAirline(Date startDate, Date endDate, String airlineName) {
//        return importRepo.findImportsBySirDateAndAirline(startDate, endDate, airlineName);
//    }

	public List<Import> getAllImports() {
		return importRepo.findAll();
	}

	public List<Object[]> findImportData(String companyId, String branchId, Date startDate, Date endDate, 
			String airlineName) {
		return importRepo.findImportData(companyId, branchId, startDate, endDate, airlineName);
	}

	// Dyanamic
	public List<String> findAirlineName(String companyId, String branchId, Date startDate, Date endDate
			) {
		return importRepo.findAirlineNames(companyId, branchId, startDate, endDate);
	}
}
