package com.cwms.controller;

import java.io.IOException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cwms.entities.Export;
import com.cwms.entities.ReadURL;
import com.cwms.entities.ScanData;
import com.cwms.service.ExportService;
import com.cwms.service.ProcessNextIdService;

@CrossOrigin("*")
@RequestMapping("/export")
@RestController
public class ExportController {

	@Autowired
	private ExportService sbTransactionService;

	@Autowired
	private ProcessNextIdService processNextIdService;

	

	@PostMapping(value = "/readurl")
	public Map<String, String> getlink(@RequestBody ReadURL readURL) throws IOException {
		String s = readURL.getLink();
		URL url = new URL(s);
		System.out.println(s);
		int timeoutMillis = 50000; // 5 seconds
		Document document = Jsoup.parse(url, timeoutMillis);
		Map<String, String> hashMap = new LinkedHashMap<>();

		Elements labels = document.select(".Label, .LabelHeader, .SubHeader");

		String currentKey = "";
		String Demo = "";
		String key = "";

		for (Element label : labels) {

			if (label.hasClass("LabelHeader") || label.hasClass("SubHeader")) {
				key = "";
				currentKey = label.text();
				currentKey = currentKey.toLowerCase();

				for (int i = 0; i < currentKey.length(); i++) {
					if ((int) currentKey.charAt(i) >= 97 && (int) currentKey.charAt(i) <= 122) {
						key += currentKey.charAt(i);
					}
				}

				if (label.text().equals("Consignment Details:")) {
					Demo = label.text();
					currentKey = Demo;
					hashMap.put(key, "");
				}

			} else {
				String value = label.text();

				hashMap.put(key, value);
			}
		}

		return hashMap;
	}

	@PostMapping(value = "/readurlSBD") //read url SBD read url Shipping Bill Details
	public Export getlinkToChange(@RequestBody ReadURL readURL) throws IOException {
		String s = readURL.getLink();
		URL url = new URL(s);
		// System.out.println(s);
		int timeoutMillis = 50000; // 5 seconds
		Document document = Jsoup.parse(url, timeoutMillis);
		Map<String, String> hashMap = new LinkedHashMap<>();

		Elements labels = document.select(".Label, .LabelHeader, .SubHeader");

		String currentKey = "";
		String Demo = "";
		String key = "";

		for (Element label : labels) {

			if (label.hasClass("LabelHeader") || label.hasClass("SubHeader")) {
				key = "";
				currentKey = label.text();
				currentKey = currentKey.toLowerCase();

				for (int i = 0; i < currentKey.length(); i++) {
					if ((int) currentKey.charAt(i) >= 97 && (int) currentKey.charAt(i) <= 122) {
						key += currentKey.charAt(i);
					}
				}

				if (label.text().equals("Consignment Details:")) {
					Demo = label.text();
					currentKey = Demo;
					hashMap.put(key, "");
				}

			} else {
				String value = label.text();

				hashMap.put(key, value);
			}
		}
		ScanData ScanData = new ScanData();
		Export sbTransaction = new Export();

		ScanData.setDcoffice(hashMap.get("dcoffice"));
		ScanData.setSezname(hashMap.get("sezname"));
		ScanData.setSezunitdevelopercodeveloper(hashMap.get("sezunitdevelopercodeveloper"));

		ScanData.setImportexportcode(hashMap.get("importexportcode"));
		sbTransaction.setIecCode(hashMap.get("importexportcode"));

		ScanData.setEntityid(hashMap.get("entityid"));
		sbTransaction.setEntityId(hashMap.get("entityid"));

		ScanData.setRequestdetails(hashMap.get("requestdetails"));
		sbTransaction.setDescriptionOfGoods(hashMap.get("requestdetails"));

		ScanData.setRequestid(hashMap.get("requestid"));
		sbTransaction.setSbRequestId(hashMap.get("requestid"));

		ScanData.setPortofloading(hashMap.get("portofloading"));

		ScanData.setPortofdestination(hashMap.get("portofdestination"));
		sbTransaction.setPortOfDestination(hashMap.get("portofdestination"));

		ScanData.setCountryofdestination(hashMap.get("countryofdestination"));
		sbTransaction.setCountryOfDestination(hashMap.get("countryofdestination"));

		ScanData.setSbnodate(hashMap.get("sbnodate"));
		String sbnodate = hashMap.get("sbnodate");
		String[] parts = sbnodate.split(",");
		String sbno = parts[0].trim();
		sbTransaction.setSbNo(sbno);

		String inputDateStr = parts[1].trim();

		 SimpleDateFormat inputDateFormat = new SimpleDateFormat("dd/MM/yyyy");

	        try {
	            // Parse the input date string
	            Date inputDate = inputDateFormat.parse(inputDateStr);
	        	sbTransaction.setSbDate(inputDate);
	        	System.out.println("===========================================================================================");
	            System.out.println(sbTransaction.getSbDate());
	        	System.out.println("===========================================================================================");
	        } catch (ParseException e) {
	            e.printStackTrace();
	        }
		

		ScanData.setCustomhouseagentnamecode(hashMap.get("customhouseagentnamecode"));
		sbTransaction.setChaName(hashMap.get("customhouseagentnamecode"));
		sbTransaction.setChaNo(hashMap.get("customhouseagentnamecode"));
		ScanData.setAssessmentdate(hashMap.get("assessmentdate"));

		ScanData.setRequeststatus(hashMap.get("requeststatus"));
		sbTransaction.setNsdlStatus(hashMap.get("requeststatus"));
		ScanData.setConsignmentdetails(hashMap.get("consignmentdetails"));

		ScanData.setRotationnumberdate(hashMap.get("rotationnumberdate"));

		ScanData.setCargodetails(hashMap.get("cargodetails"));

		String cargoDetails = hashMap.get("cargodetails");
		String[] parts1 = cargoDetails.split(",");

		// Create two String variables to store the split cargo details
		String cargoDetail1 = parts1[0].trim();
		String cargoDetail2 = parts1[1].trim();

		Pattern pattern = Pattern.compile("Weight:\\s*(\\d+\\.\\d+)\\s*(\\w+)");
		Matcher matcher = pattern.matcher(cargoDetail1);

		if (matcher.find()) {
			String value1 = matcher.group(1); // This will be "1700.0000"
			String value2 = matcher.group(2); // This will be "GRAMS"
			sbTransaction.setGrossWeight(Double.valueOf(value1));
			sbTransaction.setUomGrossWeight(value2);
		}

//		System.out.println("Cargo Detail 2: " + cargoDetail2);
		cargoDetail2 = cargoDetail2.replace("Packets: ", "");

		// Split the remaining cargoDetail2 string by whitespace
		String[] subparts = cargoDetail2.split("\\s+");

		if (subparts.length >= 2) {
			String value1 = subparts[0].trim(); // This will be "1"
			String value2 = subparts[1].trim(); // This will be "PACKAGES"
			sbTransaction.setNoOfPackages(Integer.parseInt(value1));
			sbTransaction.setUomOfPackages(value2);
		}

		ScanData.setNetrealisablevalueinrs(hashMap.get("netrealisablevalueinrs"));
		try {
			double doubleValue = Double.parseDouble(hashMap.get("netrealisablevalueinrs"));
//			System.out.println("Converted double value: " + doubleValue);
			sbTransaction.setFobValueInINR(doubleValue);

		} catch (NumberFormatException e) {
			System.err.println("Error: Unable to convert the string to a double.");
			e.printStackTrace();
		}

		sbTransaction.setCurrentDate();
		sbTransaction.setCompanyId(readURL.getCompanyId());
		sbTransaction.setBranchId(readURL.getBranchId());

		

		sbTransaction.setNameOfExporter(ScanData.getSezname());
		sbTransaction.setCreatedBy(readURL.getCreatedBy());
		sbTransaction.setEditedBy(readURL.getEditedBy());
		sbTransaction.setApprovedBy(readURL.getApprovedBy());
		sbTransaction.setStatus("A");
		sbTransaction.setSerNo(processNextIdService.autoIncrementSIRExportId());
		sbTransaction.setDgdcStatus("Handed over to DGDC SEEPZ");
		
		System.out.println("----------------------------------------------------------");
		System.out.println(ScanData);
		System.out.println(sbTransaction);
		return sbTransactionService.createSBTransaction(sbTransaction);
	}

	@GetMapping("/{sbTransId}")
	public Export getSBTransaction(@PathVariable String sbTransId) {

		// Implement the logic to retrieve a single SBTransaction by sbTransId.
		return sbTransactionService.getSBTransaction(sbTransId);
	}
 
	@PostMapping("/save")
	public Export createSBTransaction(@RequestBody Export sbTransaction) {
		sbTransaction.setSerNo(processNextIdService.autoIncrementSIRExportId());
		sbTransaction.setAppovedate();
		if (sbTransaction.getStatus() == "N")
			sbTransaction.setStatus("A");
		else
			sbTransaction.setStatus("A");
		return sbTransactionService.createSBTransaction(sbTransaction);
	}

	@PostMapping("/submit")
	public Export createSBTransactionSubmit(@RequestBody Export sbTransaction) {
		sbTransaction.setAppovedate();
			sbTransaction.setStatus("A");
		return sbTransactionService.createSBTransaction(sbTransaction);
	}

	@PostMapping("/delete")
	public Export ToSetStatusD(@RequestBody Export sbTransaction) { // Implement the logic to

		sbTransaction.setStatus("D");
		System.out.println(sbTransaction);
		return sbTransactionService.createSBTransaction(sbTransaction);
	}

	@GetMapping(value = "/listSBTransaction")
	public List<Export> getListOfSBTransaction() {

		return sbTransactionService.getAllSBTransactions();
	}

	@DeleteMapping("/{sbTransId}")
	public void deleteSBTransaction(@PathVariable String sbTransId) {
		sbTransactionService.deleteSBTransaction(sbTransId);
	}
}