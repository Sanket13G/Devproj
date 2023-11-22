package com.cwms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.emitter.Emitable;

import com.cwms.repository.*;
import com.cwms.service.*;
import com.cwms.entities.*;

import jakarta.annotation.PreDestroy;
import jakarta.transaction.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@CrossOrigin("*")
@RestController
@RequestMapping("/parties")

public class PartyController {

	@Autowired
	public EmailService emailService;

	@Autowired
	public PartyRepository partyRepository;



	@Autowired
	public PartyService partyService;

	@Autowired
	public ProcessNextIdService proccessNextIdService;

	@Autowired
	private EmialInfoRepository emailInfoRepository;
	
	
	@Value("${spring.from.mail}")
	private String fromEmail;

	private ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

	@PostMapping("/add")
	public ResponseEntity<Object> createParty(@RequestBody Party party) {
		String nextId = proccessNextIdService.autoIncrementNextIdNext();
		party.setPartyId(nextId);
		party.setStatus("N");
		
		partyRepository.save(party);
		Party createdParty = partyService.saveParty(party);
		

		// Create the XLS file
		Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("Party Data");

		Row headerRow = sheet.createRow(0);
		headerRow.createCell(0).setCellValue("Party Name");
		headerRow.createCell(1).setCellValue("Party ID");
		headerRow.createCell(2).setCellValue("Address");
		headerRow.createCell(3).setCellValue("City");
		headerRow.createCell(4).setCellValue("State");
		headerRow.createCell(5).setCellValue("Country");
		headerRow.createCell(6).setCellValue("Unit Admin Name");
		headerRow.createCell(7).setCellValue("Unit Type");
		headerRow.createCell(8).setCellValue("Email");
		headerRow.createCell(9).setCellValue("Phone No");
		headerRow.createCell(10).setCellValue("Mobile No");
		headerRow.createCell(11).setCellValue("Party Code");
		headerRow.createCell(12).setCellValue("ERP Code");
		headerRow.createCell(13).setCellValue("Credit Limit");
		headerRow.createCell(14).setCellValue("IEC No");
		headerRow.createCell(15).setCellValue("Entity ID");
		headerRow.createCell(16).setCellValue("PAN No");
		headerRow.createCell(17).setCellValue("GST No");
		headerRow.createCell(18).setCellValue("LOA Number");
		headerRow.createCell(19).setCellValue("LOA Issue Date");
		headerRow.createCell(20).setCellValue("LOA Expiry Date");
		headerRow.createCell(21).setCellValue("Created By");
		headerRow.createCell(22).setCellValue("Created Date");
		headerRow.createCell(23).setCellValue("Edited By");
		headerRow.createCell(24).setCellValue("Edited Date");
		headerRow.createCell(25).setCellValue("Approved By");
		headerRow.createCell(26).setCellValue("Approved Date");
		headerRow.createCell(27).setCellValue("Status");

		Row dataRow = sheet.createRow(1);
		dataRow.createCell(0).setCellValue(createdParty.getPartyName());
		dataRow.createCell(1).setCellValue(createdParty.getPartyId());
		dataRow.createCell(2).setCellValue(
				createdParty.getAddress1() + ", " + createdParty.getAddress2() + ", " + createdParty.getAddress3());
		dataRow.createCell(3).setCellValue(createdParty.getCity());
		dataRow.createCell(4).setCellValue(createdParty.getState());
		dataRow.createCell(5).setCellValue(createdParty.getCountry());
		dataRow.createCell(6).setCellValue(createdParty.getUnitAdminName());
		dataRow.createCell(7).setCellValue(createdParty.getUnitType());
		dataRow.createCell(8).setCellValue(createdParty.getEmail());
		dataRow.createCell(9).setCellValue(createdParty.getPhoneNo());
		dataRow.createCell(10).setCellValue(createdParty.getMobileNo());
		dataRow.createCell(11).setCellValue(createdParty.getPartyCode());
		dataRow.createCell(12).setCellValue(createdParty.getErpCode());
		dataRow.createCell(13).setCellValue(createdParty.getCreditLimit());
		dataRow.createCell(14).setCellValue(createdParty.getIecNo());
		dataRow.createCell(15).setCellValue(createdParty.getEntityId());
		dataRow.createCell(16).setCellValue(createdParty.getPanNo());
		dataRow.createCell(17).setCellValue(createdParty.getGstNo());
		dataRow.createCell(18).setCellValue(createdParty.getLoaNumber());
		dataRow.createCell(19).setCellValue(createdParty.getLoaIssueDate().toString());
		dataRow.createCell(20).setCellValue(createdParty.getLoaExpiryDate().toString());
		dataRow.createCell(21).setCellValue(createdParty.getCreatedBy());
		dataRow.createCell(22).setCellValue(createdParty.getCreatedDate().toString());
		dataRow.createCell(23).setCellValue(createdParty.getEditedBy());
		dataRow.createCell(24)
				.setCellValue(createdParty.getEditedDate() != null ? createdParty.getEditedDate().toString() : "");
		dataRow.createCell(25).setCellValue(createdParty.getApprovedBy());
		dataRow.createCell(26)
				.setCellValue(createdParty.getApprovedDate() != null ? createdParty.getApprovedDate().toString() : "");
		dataRow.createCell(27).setCellValue(createdParty.getStatus());

		String to = createdParty.getEmail();

		String subject = "New Party Added";
//		String htmlContent = "<html>" + "<body style=\"background-color: #f2f2f2; padding: 20px;\">"
//				+ "<h2 style=\"color: #ff9900;\">New Party Added</h2>"
//				+ "<h3>You have been registered at our Software on Date :</h3>" + createdParty.getCreatedDate()+ "<h3> with the following details</h3>" + createdParty.getCreatedDate() + "<ul>"
//				+ "<li><strong>Party Name :</strong> " + createdParty.getPartyName() + "</li></br>"
//				+ "<li><strong>Party ID :</strong> " + createdParty.getPartyId() + "</li></br>" 
//				+ "<li><strong>Pan No :</strong> " + createdParty.getPanNo()+ "</li></br>"
//				+ "<li><strong>GST No :</strong> " + createdParty.getGstNo() + "</li></br>"
//				+ "<li><strong>Contact No :</strong> " + createdParty.getMobileNo()+ "</li></br>"
//				
//				+ "</ul>" 
//				+ "<li><strong>Rapportsoft Consulting & Technology Pvt. Ltd.\n"
//				+ "Visit: www.rapportsoft.co.in</strong> "  + "</li></br>"+ "</body>"
//				+ "</html>";

//		String htmlContent = "<html>" +
//			    "<body style=\"background-color: #f2f2f2; padding: 20px;\">" +
//			    "<h2 style=\"color: #ff9900;\">New Party Added</h2>" +
//			    "<h3>You have been registered at our Software on Date :</h3>" + createdParty.getCreatedDate() +
//			    "<h3> with the following details</h3>" + 
//			    "<table border=\"1\" cellpadding=\"10\">" +
//			    "<tr><th>Field</th><th>Value</th></tr>" +
//			    "<tr><td><strong>Party Name :</strong></td><td>" + createdParty.getPartyName() + "</td></tr>" +
//			    "<tr><td><strong>Party ID :</strong></td><td>" + createdParty.getPartyId() + "</td></tr>" +
//			    "<tr><td><strong>Pan No :</strong></td><td>" + createdParty.getPanNo() + "</td></tr>" +
//			    "<tr><td><strong>GST No :</strong></td><td>" + createdParty.getGstNo() + "</td></tr>" +
//			    "<tr><td><strong>Contact No :</strong></td><td>" + createdParty.getMobileNo() + "</td></tr>" +
//			    "</table>" +
//			    "<p><strong>Rapportsoft Consulting & Technology Pvt. Ltd.<br>Visit: www.rapportsoft.co.in</strong></p>" +
//			    "</body>" +
//			    "</html>";

//		String htmlContent = "<html>" +
//			    "<body style=\"background-color: #f2f2f2; padding: 20px;\">" +
//			    "<h2 style=\"color: #ff9900;\">New Party Added</h2>" +
//			    "<h3>You have been registered at our Software on Date :</h3>" + createdParty.getCreatedDate() +
//			    "<h3> with the following details</h3>" +
//			    "<table border=\"1\" cellpadding=\"10\">" +
//			    "<tr><th>Field</th><th>Value</th></tr>" +
//			    "<tr><td><strong>Party Name :</strong></td><td>" + createdParty.getPartyName() + "</td></tr>" +
//			    "<tr><td><strong>Party ID :</strong></td><td>" + createdParty.getPartyId() + "</td></tr>" +
//			    "<tr><td><strong>Pan No :</strong></td><td>" + createdParty.getPanNo() + "</td></tr>" +
//			    "<tr><td><strong>GST No :</strong></td><td>" + createdParty.getGstNo() + "</td></tr>" +
//			    "<tr><td><strong>Contact No :</strong></td><td>" + createdParty.getMobileNo() + "</td></tr>" +
//			    "</table>" +
//			    "<p>Thanks a lot for your co-operation.</p>" +
//			    "<p>Thanks & Regards,</p>" +
//			    "<p>E-Warehouse System.</p>" +
//			    "</body>" +
//			    "</html>";

		// "<p>You have been registered at our Software on Date :" +
		// createdParty.getCreatedDate() +"<p> with the following details :</p></p>"
		String htmlContent = "<html>" + "<body style=\"background-color: #f2f2f2; padding: 20px;\">"
				+ "<h2 style=\"color: #ff9900;\">New Party Added</h2>" +
//			    "<p>You have been registered at our Software on Date :</p>" + createdParty.getCreatedDate() +
//			    "<p> with the following details :</p>" +
				"<p>You have been registered at our Software on Date :" + createdParty.getCreatedDate()
				+ "<p> with the following details :</p></p>" + "<table border=\"1\" cellpadding=\"10\">"
				+ "<tr><th><strong>Party Name </strong></th>" + "<th><strong>Party ID </strong></th>"
				+ "<th><strong>Pan No </strong></th>" + "<th><strong>GST No </strong></th>"
				+ "<th><strong>Contact No </strong></th>" + "</tr>" +

				"<tr><td> " + createdParty.getPartyName() + "</td>" + "<td>" + createdParty.getPartyId() + "</td>"
				+ "<td>" + createdParty.getPanNo() + "</td>" + "<td>" + createdParty.getGstNo() + "</td>" + "<td>"
				+ createdParty.getMobileNo() + "</td></tr>" + "</table>" + "<p>Please find the document attached </p>"
				+ "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "<p>Thanks a lot for your co-operation.</p>"
				+ "<p>Thanks & Regards,</p>" + "<p>E-Warehouse System.</p>" + "</body>" + "</html>";
		System.out.println(createdParty.getPanNo());
		// Save the XLS file to a temporary location
		String xlsFileName = "party_data.xlsx";
		String xlsFilePath = System.getProperty("java.io.tmpdir") + File.separator + xlsFileName;
		try (FileOutputStream fileOut = new FileOutputStream(xlsFilePath)) {
			workbook.write(fileOut);
		} catch (Exception e) {
			e.printStackTrace();
		}

		String ccEmail = "bhondemahesh2022@gmail.com"; // Replace with your sender's email
		// String attachmentPath = xlsFilePath; // Provide the attachment path

		EmailRequest emailInfo = new EmailRequest();
		String nextMailId = proccessNextIdService.autoIncrementMailId();
		emailInfo.setMailTransId(nextMailId);

		emailInfo.setTo(createdParty.getEmail());
		emailInfo.setFromEmail(fromEmail);
		emailInfo.setAttachmentPath(xlsFilePath);
		emailInfo.setSubject("New Party Added");
		emailInfo.setFileCreatedDate(new Date());
		emailInfo.setSentDate(new Date());
		emailInfo.setCompanyId(createdParty.getCompanyId());
		emailInfo.setBranchId(createdParty.getBranchId());
		emailInfo.setCcMail(ccEmail); // Replace with the actual CC email address
		emailInfo.setBodyMail(htmlContent);
		emailInfo.setMailStatus("Send Successfully");
		emailInfo.setStatus("N");
		emailInfoRepository.save(emailInfo);

		// Schedule email sending after a delay (1 minute in this example)
		executorService.schedule(() -> {
			boolean emailResult = emailService.sendEmailWithHtmlContentAndAttachment(emailInfo.getSubject(),
					htmlContent, emailInfo.getTo(), xlsFilePath, fromEmail, emailInfo.getCcMail());
			if (emailResult) {
				emailInfo.setStatus("Y");
				emailInfo.setSentDate(new Date());
				// Update status to "Y" if email is sent successfully
			} else {
				emailInfo.setStatus("N"); // Update status to "N" if email sending fails
				System.out.println("Failed to send email...");
			}
			emailInfoRepository.save(emailInfo);
		}, 1, TimeUnit.MINUTES);

		return new ResponseEntity<>("Party added successfully. Email sent.", HttpStatus.OK);

	}

	@PreDestroy
	public void cleanUp() {
		executorService.shutdown();
	}

	@GetMapping("/{companyId}/{branchId}/{partyId}")
	public ResponseEntity<Party> getParty(@PathVariable String companyId, @PathVariable String branchId,
			@PathVariable String partyId) {
		PartyId id = new PartyId(companyId, branchId, partyId);
		Party party = partyService.getPartyById(id);
		if (party != null) {
			return new ResponseEntity<>(party, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getAll")
	public ResponseEntity<List<Party>> getAllParties() {
		List<Party> parties = partyService.getAllParties();
		return new ResponseEntity<>(parties, HttpStatus.OK);
	}

	@PutMapping("/update/{partyId}")
	public ResponseEntity<Party> updatePartyById(@PathVariable String partyId, @RequestBody Party updatedParty) {
		Party updatedPartyResult = partyService.updatePartyById(partyId, updatedParty);
		updatedPartyResult.setStatus("E");
		updatedPartyResult.setEditedDate(new Date());
		partyRepository.save(updatedPartyResult);
		return new ResponseEntity<>(updatedPartyResult, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{partyId}")
	@Transactional
	public ResponseEntity<Void> deletePartyById(@PathVariable String partyId) {
		Party p=partyService.getParty(partyId);
		if(partyId!=null)
		{
			p.setStatus("D");
			partyService.updatePartyById(partyId, p);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		

	}
	
	@GetMapping("/diffparty")
    public List<Party> getPartiesNotInIds(@RequestParam("excludedPartyIds") List<String> excludedPartyIds) {
		 List<Party> partiesNotInIds = partyService.getPartiesNotInIds(excludedPartyIds);
		
		if(excludedPartyIds == null || excludedPartyIds.isEmpty())
		{
			return partyService.getAllParties();
		}
		return partiesNotInIds;
    }
}
