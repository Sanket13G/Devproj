package com.cwms.controller;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cwms.entities.CfsTarrif;
import com.cwms.service.CFSService;
import com.cwms.service.ProcessNextIdService;

@RequestMapping("tarrif")
@CrossOrigin("*")
@RestController
public class CFSTarrifController {
	@Autowired
	public CFSService CFSService;

	@Autowired
	public ProcessNextIdService proccessNextIdService;

	@GetMapping("/{cid}/{bid}")
	public List<CfsTarrif> getAllTarrifServices(@PathVariable("cid") String cid, @PathVariable("bid") String bid) {
		return CFSService.getTarrif(cid,bid);
	}

	
	@GetMapping("/{cid}/{bid}/{cfsTarrifNo}/cfstarrif")
	public CfsTarrif getTarrifyCfsTarrifNo(@PathVariable("cid") String cid, @PathVariable("bid") String bid,@PathVariable("cfsTarrifNo") String cfsTarrifNo) {

		return CFSService.getTarrifById(cfsTarrifNo,cid,bid);
	}
	
	
	@PostMapping("/{CompId}/{BranchId}/{CurrentUser}")
	public ResponseEntity<?> addTarrf(@PathVariable("CompId") String CompId, @PathVariable("BranchId") String BranchId,
			@RequestBody CfsTarrif CfsTarrif, @PathVariable("CurrentUser") String CurrentUser) {
		CfsTarrif.setCompanyId(CompId);
		CfsTarrif.setCfsTariffDate(new Date());
		CfsTarrif.setBranchId(BranchId);
		CfsTarrif.setCreatedDate(new Date());
		CfsTarrif.setCreatedBy(CurrentUser);
		CfsTarrif.setCfsAmndNo("000");
		CfsTarrif.setStatus("N");
		String autoIncrementCFSTarrifNextId = proccessNextIdService.autoIncrementCFSTarrifNextId();
		CfsTarrif.setCfsTariffNo(autoIncrementCFSTarrifNextId);

		CfsTarrif addcfsTarrifService = CFSService.addTarrifService(CfsTarrif);
		return ResponseEntity.ok(addcfsTarrifService);
	}

	@PutMapping("/{CompId}/{BranchId}/{CurrentUser}/{cfstarrifno}/update")
	public ResponseEntity<?> updateTarrif(@PathVariable("CompId") String CompId,
			@PathVariable("BranchId") String BranchId, @RequestBody CfsTarrif CfsTarrif,
			@PathVariable("CurrentUser") String CurrentUser) {
		
		CfsTarrif.setCompanyId(CompId);
		CfsTarrif.setBranchId(BranchId);
		String currentStatus = CfsTarrif.getStatus();

		if (currentStatus == null || currentStatus.isEmpty()) {
			CfsTarrif.setStatus("N");
		} else if ("N".equals(currentStatus)) {
			CfsTarrif.setStatus("U");
			CfsTarrif.setEditedBy(CurrentUser);
			CfsTarrif.setEditedDate(new Date());
		}
		
		CfsTarrif updateTarrifService = CFSService.updateTarrif(CfsTarrif);
		return ResponseEntity.ok(updateTarrifService);
	}

	@PutMapping("/{CompId}/{BranchId}/{CurrentUser}/{tarrifno}/status")
	public ResponseEntity<?> UpdateTarrifStatus(@PathVariable("CompId") String CompId,
			@PathVariable("BranchId") String BranchId, @RequestBody CfsTarrif CfsTarrif,
			@PathVariable("CurrentUser") String CurrentUser) {
		
		CfsTarrif.setCompanyId(CompId);
		CfsTarrif.setBranchId(BranchId);
		CfsTarrif.setStatus("A");
		CfsTarrif.setApprovedBy(CurrentUser);
		CfsTarrif.setApprovedDate(new Date());
		CfsTarrif addcfsTarrifService = CFSService.updateTarrif(CfsTarrif);
		return ResponseEntity.ok(addcfsTarrifService);
	}

}