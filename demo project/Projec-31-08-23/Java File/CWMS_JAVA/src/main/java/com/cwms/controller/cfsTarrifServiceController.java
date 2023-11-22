package com.cwms.controller;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cwms.entities.CFSTariffService;
import com.cwms.entities.Services;
import com.cwms.service.*;

@RestController
@RequestMapping("cfstarrif")
@CrossOrigin("*")
public class cfsTarrifServiceController {
	@Autowired
	private cfsTarrifServiceService cfsTarrifServiceService;

	@Autowired
	public ServiceImpl ServiceImpl;

	@GetMapping("/{CompId}/{BranchId}")
	public List<CFSTariffService> getAllCFSTariffService(@PathVariable("CompId")String CompId,@PathVariable("BranchId") String BranchId) {

		return cfsTarrifServiceService.getcfsTarrifService(CompId,BranchId);
	}

	@GetMapping("/{CompId}/{BranchId}/{cfsTarrifNo}/cfstservices")
	public List<CFSTariffService> getTRFServicesByCfsTarrifNo(@PathVariable("cfsTarrifNo") String cfsTarrifNo,@PathVariable("CompId")String CompId,@PathVariable("BranchId") String BranchId) {

		return cfsTarrifServiceService.getcfsTarrifServiceById(cfsTarrifNo,CompId,BranchId);
	}


	@PostMapping("/{CompId}/{BranchId}/{CurrentUser}")
	public ResponseEntity<?> addCFSService(@PathVariable("CompId") String CompId,
			@PathVariable("BranchId") String BranchId, @RequestBody CFSTariffService CFSTariffService,
			@PathVariable("CurrentUser") String CurrentUser) {
		
		String currentStatus = CFSTariffService.getStatus();

		if (currentStatus == null || currentStatus.isEmpty()) {
			CFSTariffService.setStatus("N");
			CFSTariffService.setEditedBy(CurrentUser);
		} else if ("N".equals(currentStatus)) {
			CFSTariffService.setStatus("U");
			CFSTariffService.setEditedBy(CurrentUser);
		}
		
		CFSTariffService.setCreatedBy(CurrentUser);
		CFSTariffService.setCompanyId(CompId);
		CFSTariffService.setBranchId(BranchId);
		CFSTariffService addcfsTarrifService = cfsTarrifServiceService.addcfsTarrifService(CFSTariffService);
		return ResponseEntity.ok(addcfsTarrifService);
	}

	@PutMapping("/{CompId}/{BranchId}/{CurrentUser}/{cfstarrifno}")
	public ResponseEntity<?> UpdateCFSService(@PathVariable("CompId") String CompId,
			@PathVariable("BranchId") String BranchId, @RequestBody CFSTariffService CFSTariffService,
			@PathVariable("CurrentUser") String CurrentUser) {
		
				
		String currentStatus = CFSTariffService.getStatus();

		if (currentStatus == null || currentStatus.isEmpty()) {
			CFSTariffService.setStatus("N");
			CFSTariffService.setEditedBy(CurrentUser);
		} else if ("N".equals(currentStatus)) {
			CFSTariffService.setStatus("U");
			CFSTariffService.setEditedBy(CurrentUser);
		}

		CFSTariffService.setCompanyId(CompId);
		CFSTariffService.setBranchId(BranchId);
		CFSTariffService addcfsTarrifService = cfsTarrifServiceService.updatecfsTarrifService(CFSTariffService);
		return ResponseEntity.ok(addcfsTarrifService);
	}

	@PutMapping("/{CompId}/{BranchId}/{CurrentUser}/{cfstarrifno}/status")
	public ResponseEntity<?> UpdateCFSServiceStatus(@PathVariable("CompId") String CompId,
			@PathVariable("BranchId") String BranchId, @RequestBody CFSTariffService CFSTariffService,
			@PathVariable("CurrentUser") String CurrentUser) {
		
		CFSTariffService.setStatus("A");
		CFSTariffService.setCompanyId(CompId);
		CFSTariffService.setBranchId(BranchId);
		CFSTariffService.setApprovedBy(CurrentUser);
		CFSTariffService.setApprovedDate(new Date());
		CFSTariffService addcfsTarrifService = cfsTarrifServiceService.updatecfsTarrifService(CFSTariffService);
		return ResponseEntity.ok(addcfsTarrifService);
	}

	@GetMapping("/{CompId}/{BranchId}/{TarrifNo}/{amndno}/{ServiceId}/Single")
	public CFSTariffService findByTarrifNoAndService(@PathVariable("TarrifNo") String TarrifNo,
			@PathVariable("amndno") String amndno,
			@PathVariable("CompId") String CompId,
			@PathVariable("BranchId") String BranchId,
			@PathVariable("ServiceId") String ServiceId) {
		return cfsTarrifServiceService.findByTarrifNoandServiceId(CompId,BranchId,TarrifNo,amndno,ServiceId);
	}
	
	@DeleteMapping("/{CompId}/{BranchId}/{TarrifNo}/{amndno}/{ServiceId}/delete")
	public void DeleteTarrif(@PathVariable("TarrifNo") String TarrifNo,
			@PathVariable("ServiceId") String ServiceId,
			@PathVariable("amndno") String amndno,
			@PathVariable("CompId") String CompId,
			@PathVariable("BranchId") String BranchId			
			)
	{
		CFSTariffService findByTarrifNoandServiceId = cfsTarrifServiceService.findByTarrifNoandServiceId(CompId,BranchId,TarrifNo,amndno,ServiceId);
		findByTarrifNoandServiceId.setStatus("D");
		cfsTarrifServiceService.updatecfsTarrifService(findByTarrifNoandServiceId);
		
	}
}