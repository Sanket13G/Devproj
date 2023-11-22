package com.cwms.controller;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cwms.entities.ImportSub;
import com.cwms.repository.ImportSubRepository;
import com.cwms.service.ProcessNextIdService;

import jakarta.transaction.Transactional;

@CrossOrigin("*")
@RestController
@RequestMapping("/importsub")
public class ImportSubController {

	@Autowired
	private ImportSubRepository impsubrepo;
	
	@Autowired
	private ProcessNextIdService nextservice;

	@GetMapping("/all/{cid}/{bid}")
	public List<ImportSub> getAlldata(@PathVariable("cid") String cid, @PathVariable("bid") String bid) {
		return impsubrepo.getall(cid, bid);
	}

	@PostMapping("/insertdata/{id}")
	public ImportSub singlesavedata( @RequestBody ImportSub impsub,@PathVariable("id") String id) {
		String nextid = nextservice.autoIncrementSubImpId();
		String nexttransid = nextservice.autoIncrementSubImpTransId();
		impsub.setSirNo(nextid);
		impsub.setImpSubId(nexttransid);
		impsub.setCreatedBy(id);
		impsub.setCreatedDate(new Date());
		impsub.setStatus("N");
		impsub.setDgdcStatus("Handed over to DGDC SEEPZ");
		impsub.setNsdlStatus("pending");
		impsub.setReentryDate(new Date());
		impsub.setSirDate(new Date());
		
		return impsubrepo.save(impsub);
	}
	
	@GetMapping("/byid/{cid}/{bid}/{impsubid}/{reqid}")
	public ImportSub getdatabyid(@PathVariable("cid") String companyId,@PathVariable("bid") String branchId,@PathVariable("impsubid") String impSubId,@PathVariable("reqid") String reqId) {
		return impsubrepo.findImportSub(companyId, branchId, impSubId, reqId);
	}

	@Transactional
	@PostMapping("/updateData")
    public ImportSub updateImportSub(@RequestBody ImportSub updatedImportSub) {
            return impsubrepo.save(updatedImportSub);
        
    }
	
	@GetMapping("/getdata")
	public List<ImportSub> getdata() {
		return impsubrepo.findAll();
		
	}
}
