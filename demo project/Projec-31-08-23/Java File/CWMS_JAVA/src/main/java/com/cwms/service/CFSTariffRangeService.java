package com.cwms.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.cwms.entities.CFSTariffRange;
@Service
public interface CFSTariffRangeService 
{

	public CFSTariffRange addcfsTarrifServiceRange(CFSTariffRange CFSTariffRange);
	public CFSTariffRange updatecfsTarrifServiceRange(CFSTariffRange CFSTariffRange);
	public List<CFSTariffRange> getcfsTarrifServiceRange(String compId,String branchId);
	public List<CFSTariffRange> getcfsTarrifServiceRangeById(String compId,String branchId,String cfstid,String amndno);
	public List<CFSTariffRange> findByCfsTariffNoAndServiceId(String compId,String branchId,String cfsTariffNo,String amndno, String serviceId);
	public List<CFSTariffRange> saveAllTariffRanges(List<CFSTariffRange> tariffRanges);
	
}