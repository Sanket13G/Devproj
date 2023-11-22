package com.cwms.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cwms.entities.*;
import com.cwms.repository.*;

@Service
public class CFSTariffRangeServiceIMPL implements CFSTariffRangeService
{
	@Autowired
	public CFSTariffRangeRepositary CFSTariffRangeRepositary;

	@Override
	public CFSTariffRange addcfsTarrifServiceRange(CFSTariffRange CFSTariffRange) {
		// TODO Auto-generated method stub
		return CFSTariffRangeRepositary.save(CFSTariffRange);
	}

	@Override
	public CFSTariffRange updatecfsTarrifServiceRange(CFSTariffRange CFSTariffRange) {
		// TODO Auto-generated method stub
		return CFSTariffRangeRepositary.save(CFSTariffRange);
	}

	@Override
	public List<CFSTariffRange> getcfsTarrifServiceRange(String compId,String branchId) {
		// TODO Auto-generated method stub
		return CFSTariffRangeRepositary.findByCompanyIdAndBranchId(compId,branchId);
	}

	@Override
	public List<CFSTariffRange> getcfsTarrifServiceRangeById(String compId,String branchId,String cfstid,String amndno) {
		// TODO Auto-generated method stub
		return CFSTariffRangeRepositary.findByCompanyIdAndBranchIdAndCfsTariffNoAndCfsAmndNo(compId,branchId,cfstid,amndno);
	}

	

	@Override
	public List<CFSTariffRange> findByCfsTariffNoAndServiceId(String compId,String branchId,String cfsTariffNo,String amndno,String srlNo) {
		// TODO Auto-generated method stub
		return CFSTariffRangeRepositary.findByCompanyIdAndBranchIdAndCfsTariffNoAndCfsAmndNoAndServiceIdAndStatusNot(compId,branchId,cfsTariffNo,amndno,srlNo,"D");
	}

	@Override
	public List<CFSTariffRange> saveAllTariffRanges(List<CFSTariffRange> tariffRanges) {
		
		return CFSTariffRangeRepositary.saveAll(tariffRanges);
		
//		MAKe method
	}
	
	
	
	
	
}