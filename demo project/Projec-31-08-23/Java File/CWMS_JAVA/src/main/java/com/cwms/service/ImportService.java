package com.cwms.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.cwms.entities.Import;
@Service
public interface ImportService 
{
	public List<Import> getByMAWB(String CompId,String branchId,String mawbno);
	public Import addImport(Import import2);
	public Import updateImport(Import import2);
	public Import getByMAWBANdHAWB(String CompId,String branchId,String transId,String MAWB, String HAWB, String SirNo);	
	public List<Import> getAll(String CompId,String branchId);
//	Import findByCompanyIdAnsBranchIdAndimpTransId(String compId,String branchId,String impTransId);
	public void deleteImport(Import import2);
	
	
	public Import findBytransIdAndSirNo(String CompId,String branchId,String transId,String Sirno);
}