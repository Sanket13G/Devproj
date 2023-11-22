package com.cwms.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cwms.entities.Import;
import com.cwms.entities.Import_History;
import com.cwms.repository.ImportRepository;
import com.cwms.service.ImportService;
import com.cwms.service.ImportServiceImpl;
import com.cwms.service.Import_HistoryService;
import com.cwms.service.ProcessNextIdService;

@RestController
@CrossOrigin("*")
@RequestMapping("/import")
public class ImportController {

	@Autowired
	private ImportRepository imprepo;
	
	@Autowired
	private ImportServiceImpl importService;
	
	@Autowired
	private Import_HistoryService historyService;
	
	@Autowired
	public ImportService importServices;
	
	@Autowired
	public ProcessNextIdService proccessNextIdService;
	
	
	
	@GetMapping("/all")
	public List<Import> getAll() {
		return this.imprepo.findByAll();
	}
	
	@GetMapping("/tpdate")
	public List<String> getAllbytpdate(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam("cid") String cid,@RequestParam("bid") String bid) {
		
		return imprepo.findByTp(date,cid,bid);
	}
	
	@GetMapping("/getalldata")
	public List<Import> getallbyTpnoandTpdate(
	    @RequestParam("cid") String cid,
	    @RequestParam("bid") String bid,
	    @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
	    @RequestParam("tpno") String tpno
	  //  @RequestParam("status") char status
	    ) { // Change the parameter name to "status"
	    return imprepo.findByTpdateTpno(cid, bid, date, tpno); // Use "status" parameter here
	}
	
	@GetMapping("/importData")
	public List<Object[]> getImportData(@RequestParam("companyId") String companyId,
			@RequestParam("branchId") String branchId,
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,

			@RequestParam("airlineName") String airlineName) {
		
		 System.out.println("Received companyId: " + companyId);
		    System.out.println("Received branchId: " + branchId);
		    System.out.println("Received startDate: " + startDate);
		    System.out.println("Received endDate: " + endDate);
		    System.out.println("Received airlineName: " + airlineName);
		List<Object[]> imp = importService.findImportData(companyId, branchId, startDate, endDate, airlineName);

		
		for (Object[] i : imp) {
			System.out.println(i);
		}
		return imp;
	}

	// Dyanamic
	@GetMapping("/airline-names")
	public List<String> getAirlineNames(@RequestParam("companyId") String companyId,
			@RequestParam("branchId") String branchId,
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endDate) {
		List<String> airlineNames = importService.findAirlineName(companyId, branchId, startDate, endDate);
		 
		Import i= new Import();
		i.getSirDate();
		System.out.println( "Sir Date is" +i.getSirDate());

		// Print each airline name individually
		for (String name : airlineNames) {
			System.out.println(name);
		}

		return airlineNames;
	}
	
	
	
	

	@GetMapping("/allimportData")
	public List<Import> getAllImportData(@RequestParam("companyId") String companyId,
			@RequestParam("branchId") String branchId,
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endDate,

			@RequestParam("airlineName") String airlineName) {
		
		 System.out.println("Received companyId: " + companyId);
      return imprepo.findImportAllData(companyId, branchId, startDate, endDate, airlineName);
	}

	
	
	
	
	
	@GetMapping("/{compid}/{branchId}/{tranId}/{MAWB}/{HAWB}/{sirNo}/getSingle")
	public Import findByMAWBANDHAWB(
	        @PathVariable("MAWB") String MAWB,
	        @PathVariable("HAWB") String HAWB,
	        @PathVariable("compid") String compid,
	        @PathVariable("branchId") String branchId,
	        @PathVariable("tranId") String transId,
	        @PathVariable("sirNo") String sirNo) {
	    
	    return importServices.getByMAWBANdHAWB(compid, branchId, transId, MAWB, HAWB, sirNo);
	}
	
	
	@GetMapping("/{cid}/{bid}/{MAWBNo}")
	public List<Import> getByMawbNo(@PathVariable("MAWBNo")String MAWBNo,@PathVariable("cid") String cid, @PathVariable("bid") String bid)
	{
		return importServices.getByMAWB(cid,bid,MAWBNo);
	}
	
	@GetMapping("/{cid}/{bid}/All")
	public List<Import> getAll(@PathVariable("cid") String cid, @PathVariable("bid") String bid)
	{
		return importServices.getAll(cid,bid);
	}
	
	
	@PostMapping("/{compid}/{branchId}/{user}/add")
	public Import addImport(@PathVariable("compid")String compid,@PathVariable("branchId")String branchId,
			@RequestBody Import import2,@PathVariable("user")String User)
	{
		import2.setCompanyId(compid);
		import2.setBranchId(branchId);
		import2.setNSDL_Status("");
		import2.setDGDC_Status("Handed over to DGDC Cargo");
		
		String autoIncrementIMPTransId = proccessNextIdService.autoIncrementIMPTransId();
		import2.setImpTransId(autoIncrementIMPTransId);
		String autoIncrementSIRId = proccessNextIdService.autoIncrementSIRId();
		import2.setSirNo(autoIncrementSIRId);
		import2.setSirDate(new Date());
		import2.setImpTransDate(new Date());
		import2.setCreatedBy(User);
		import2.setCreatedDate(new Date());
		import2.setStatus("A");
		import2.setApprovedBy(User);
		import2.setApprovedDate(new Date());
		import2.setEditedBy(User);
		import2.setEditedDate(new Date());
		
		Import_History history=new Import_History();
		history.setCompanyId(compid);
		history.setBranchId(branchId);
		history.setSirNo(autoIncrementSIRId);
		history.setMawb(import2.getMawb());
		history.setHawb(import2.getHawb());
		history.setTransport_Date(new Date());
		history.setOldStatus("Pending");
		history.setNewStatus("Handed over to DGDC Cargo");
		history.setUpdatedBy(User);
		historyService.addHistory(history);
		return importServices.addImport(import2);
	}
	
	@PutMapping("/{compid}/{branchId}/{user}/update")
	public Import updateImport(@PathVariable("compid")String compid,@PathVariable("branchId")String branchId,
			@RequestBody Import import2,@PathVariable("user")String User)
	{
//		import2.setBranchId(branchId);
		import2.setEditedBy(User);
		import2.setEditedDate(new Date());
//		
		return importServices.updateImport(import2);
	}
	
	@PutMapping("/{compid}/{branchId}/{user}/modifyupdate")
	public Import updateImportByIMpTransId(@PathVariable("compid")String compid,@PathVariable("branchId")String branchId,
			@RequestBody Import import2,@PathVariable("user")String User)
	{
//		import2.setBranchId(branchId);
		
		Import existingImport = importServices.findBytransIdAndSirNo(compid,branchId,import2.getImpTransId(),import2.getSirNo());
		
		if(existingImport != null)
		{
			
			importServices.deleteImport(existingImport);
			Import newImport=new Import();
			
		newImport.setEditedBy(User);
		newImport.setEditedDate(new Date());
		newImport.setAirlineName(import2.getAirlineName());
		newImport.setCreatedBy(import2.getCreatedBy());
		newImport.setCreatedDate(import2.getCreatedDate());
		newImport.setApprovedBy(import2.getApprovedBy());
		newImport.setApprovedDate(import2.getApprovedDate());
		newImport.setCompanyId(import2.getCompanyId());
		newImport.setBranchId(import2.getBranchId());
		newImport.setMawb(import2.getMawb());
		newImport.setHawb(import2.getHawb());
		newImport.setSirNo(import2.getSirNo());
		newImport.setNop(import2.getNop());
		newImport.setImporterId(import2.getImporterId());
		newImport.setConsoleName(import2.getConsoleName());
		newImport.setImportRemarks(import2.getImportRemarks());
		newImport.setBeDate(import2.getBeDate());	
		newImport.setSirDate(import2.getSirDate());
		newImport.setImpTransId(import2.getImpTransId());
		newImport.setImpTransDate(import2.getImpTransDate());
		newImport.setBeDate(import2.getBeDate());
		newImport.setIec(import2.getIec());
		newImport.setBeNo(import2.getBeNo());
		newImport.setBeRequestId(import2.getBeRequestId());
		newImport.setIgmNo(import2.getIgmNo());
		newImport.setIgmDate(import2.getIgmDate());
		newImport.setPctmNo(import2.getPctmNo());
		newImport.setPackageContentType(import2.getPackageContentType());
		newImport.setUomPackages(import2.getUomPackages());
		newImport.setUomWeight(import2.getUomWeight());
		newImport.setTpNo(import2.getTpNo());
		newImport.setTpDate(import2.getTpDate());
		newImport.setFlightNo(import2.getFlightNo());
		newImport.setFlightDate(import2.getFlightDate());
		newImport.setCountryOrigin(import2.getCountryOrigin());
		newImport.setPortOrigin(import2.getPortOrigin());
		newImport.setNSDL_Status(import2.getNSDL_Status());
		newImport.setDGDC_Status(import2.getDGDC_Status());
		newImport.setDescriptionOfGoods(import2.getDescriptionOfGoods());
		newImport.setImportAddress(import2.getImportAddress());
		newImport.setChaCde(import2.getChaCde());
		newImport.setAssessableValue(import2.getAssessableValue());
		newImport.setGrossWeight(import2.getGrossWeight());
		newImport.setStatus(import2.getStatus());
		
		return importServices.updateImport(newImport);
		}
		
		return null;
	}
	
	@DeleteMapping("/{compid}/{branchId}/{tranId}/{MAWB}/{HAWB}/{sirNo}/delete")
	public void deleteImport(@PathVariable("MAWB") String MAWB,
	        @PathVariable("HAWB") String HAWB,
	        @PathVariable("compid") String compid,
	        @PathVariable("branchId") String branchId,
	        @PathVariable("tranId") String transId,
	        @PathVariable("sirNo") String sirNo)
	{
		Import byMAWBANdHAWB = importServices.getByMAWBANdHAWB(compid, branchId, transId, MAWB, HAWB, sirNo);
		if(byMAWBANdHAWB != null)
		{
			byMAWBANdHAWB.setStatus("D");
			importServices.updateImport(byMAWBANdHAWB);
		}
	}
}
