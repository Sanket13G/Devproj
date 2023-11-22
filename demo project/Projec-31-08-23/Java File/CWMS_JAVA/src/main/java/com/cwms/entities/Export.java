package com.cwms.entities;

import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@IdClass(ExportId.class)

@Entity
@Table(name = "Export")
public class Export {

	@Id
	@Column(name = "Company_Id", length = 6)
	private String companyId;

	@Id
	@Column(name = "Branch_Id", length = 6)
	private String branchId;

	@Id
	@Column(name = "SB_Number", length = 15)
	private String sbNo;

	@Id
	@Column(name = "SB_Request_Id", length = 20)
	private String sbRequestId;

	@Column(name = "SB_Date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date sbDate;

	@Column(name = "IEC_Code", length = 25)
	private String iecCode;

	@Column(name = "Entity_Id", length = 20)
	private String entityId;

	@Column(name = "Exporter_Name", length = 50)
	private String nameOfExporter;

	@Column(name = "SER_No", length = 20)
	private String serNo;

	@Column(name = "gross_Weight")
	private Double grossWeight;

	@Column(name = "UOMGrossWeight")
	private String uomGrossWeight;

	@Column(name = "CountryOfDestination", length = 25)
	private String countryOfDestination;

	@Column(name = "PortOfDestination", length = 25)
	private String portOfDestination;

	@Column(name = "Airway_Bill_No", length = 25)
	private String airwayBillNo;

	@Column(name = "Description_Of_Goods", length = 40)
	private String descriptionOfGoods;

	@Column(name = "NSDL_Status", length = 50)
	private String nsdlStatus;

	@Column(name = "DGDC_Status", length = 50)
	private String dgdcStatus;

	@Column(name = "CHANo", length = 20)
	private String chaNo;

	@Column(name = "CHAName", length = 50)
	private String chaName;

	@Column(name = "ConsoleAgent", length = 25)
	private String consoleAgent;

	@Column(name = "FOBValueInINR")
	private Double fobValueInINR;

	@Column(name = "NoOfPackages")
	private int noOfPackages;

	@Column(name = "UOMOfPackages")
	private String uomOfPackages;

	@Column(name = "Status", length = 1)
	private String status;

	@Column(name = "Created_By")
	private String createdBy;

	@Column(name = "Created_Date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdDate;

	@Column(name = "Edited_By")
	private String editedBy;

	@Column(name = "Edited_Date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date editedDate;

	@Column(name = "Approved_By")
	private String approvedBy;

	@Column(name = "Approved_Date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date approvedDate;

	public void setAppovedate() {
		Date date = new Date();
		approvedDate = date;

	}

	public void setCurrentDate() {
		Date date = new Date();
		Date formattedDate = null;

		// Create a SimpleDateFormat object for formatting the date as "dd-MM-yyyy"
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

		// Format the date as "dd-MM-yyyy" string
		String formattedDateStr = sdf.format(date);

//		System.out.println("Formatted Date String: " + formattedDateStr);

		try {
			// Parse the formatted date string back into a Date object
			 formattedDate = sdf.parse(formattedDateStr);

//			System.out.println("Formatted Date as Date Object: " + formattedDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		if (editedDate == null) {

			editedDate = formattedDate ;
		}
		if (createdDate == null) {
			createdDate = formattedDate ;
		}
		if (approvedDate == null) {
			approvedDate = formattedDate ;
		}
	}

	public Export() {
		super();
	}

	public Export(String companyId, String branchId, String sbNo, String sbRequestId, Date sbDate,
			String iecCode, String entityId, String nameOfExporter, String serNo, Double grossWeight,
			String uomGrossWeight, String countryOfDestination, String portOfDestination, String airwayBillNo,
			String descriptionOfGoods, String nsdlStatus, String dgdcStatus, String chaNo, String chaName,
			String consoleAgent, Double fobValueInINR, int noOfPackages, String uomOfPackages, String status,
			String createdBy, Date createdDate, String editedBy, Date editedDate, String approvedBy,
			Date approvedDate) {
		super();
		this.companyId = companyId;
		this.branchId = branchId;
		this.sbNo = sbNo;
		this.sbRequestId = sbRequestId;
		this.sbDate = sbDate;
		this.iecCode = iecCode;
		this.entityId = entityId;
		this.nameOfExporter = nameOfExporter;
		this.serNo = serNo;
		this.grossWeight = grossWeight;
		this.uomGrossWeight = uomGrossWeight;
		this.countryOfDestination = countryOfDestination;
		this.portOfDestination = portOfDestination;
		this.airwayBillNo = airwayBillNo;
		this.descriptionOfGoods = descriptionOfGoods;
		this.nsdlStatus = nsdlStatus;
		this.dgdcStatus = dgdcStatus;
		this.chaNo = chaNo;
		this.chaName = chaName;
		this.consoleAgent = consoleAgent;
		this.fobValueInINR = fobValueInINR;
		this.noOfPackages = noOfPackages;
		this.uomOfPackages = uomOfPackages;
		this.status = status;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.editedBy = editedBy;
		this.editedDate = editedDate;
		this.approvedBy = approvedBy;
		this.approvedDate = approvedDate;
	}

	public String toString() {
		StringBuilder sb = new StringBuilder();
		System.out.println();
		sb.append("+----------------------+-------------------------------------").append(System.lineSeparator());
		sb.append("| Field                | Value                               |").append(System.lineSeparator());
		sb.append("+----------------------+-------------------------------------").append(System.lineSeparator());
		sb.append(String.format("| Company ID            | %-34s |%n", companyId));
		sb.append(String.format("| Branch ID             | %-34s |%n", branchId));
		sb.append(String.format("| SB No                 | %-34s |%n", sbNo));
		sb.append(String.format("| SB Request ID         | %-34s |%n", sbRequestId));
		sb.append(String.format("| SB Date               | %-34s |%n", sbDate));
		sb.append(String.format("| IEC Code              | %-34s |%n", iecCode));
		sb.append(String.format("| Entity ID             | %-34s |%n", entityId));
		sb.append(String.format("| Name of Exporter      | %-34s |%n", nameOfExporter));
		sb.append(String.format("| Ser No                | %-34s |%n", serNo));
		sb.append(String.format("| Gross Weight          | %-34s |%n", grossWeight));
		sb.append(String.format("| UOM Gross Weight      | %-34s |%n", uomGrossWeight));
		sb.append(String.format("| Country of Destination| %-34s |%n", countryOfDestination));
		sb.append(String.format("| Port of Destination   | %-34s |%n", portOfDestination));
		sb.append(String.format("| Airway Bill No        | %-34s |%n", airwayBillNo));
		sb.append(String.format("| Description of Goods  | %-34s |%n", descriptionOfGoods));
		sb.append(String.format("| NSDL Status           | %-34s |%n", nsdlStatus));
		sb.append(String.format("| DGDC Status           | %-34s |%n", dgdcStatus));
		sb.append(String.format("| CHA No                | %-34s |%n", chaNo));
		sb.append(String.format("| CHA Name              | %-34s |%n", chaName));
		sb.append(String.format("| Console Agent         | %-34s |%n", consoleAgent));
		sb.append(String.format("| FOB Value in INR      | %-34s |%n", fobValueInINR));
		sb.append(String.format("| No of Packages        | %-34s |%n", noOfPackages));
		sb.append(String.format("| UOM of Packages       | %-34s |%n", uomOfPackages));
		sb.append(String.format("| Status                | %-34s |%n", status));
		sb.append(String.format("| Created By            | %-34s |%n", createdBy));
		sb.append(String.format("| Created Date          | %-34s |%n", createdDate));
		sb.append(String.format("| Edited By             | %-34s |%n", editedBy));
		sb.append(String.format("| Edited Date           | %-34s |%n", editedDate));
		sb.append(String.format("| Approved By           | %-34s |%n", approvedBy));
		sb.append(String.format("| Approved Date         | %-34s |%n", approvedDate));
		sb.append("+----------------------+-----------------------------------+%n");

		return sb.toString();
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getBranchId() {
		return branchId;
	}

	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	public String getSbNo() {
		return sbNo;
	}

	public void setSbNo(String sbNo) {
		this.sbNo = sbNo;
	}

	public String getSbRequestId() {
		return sbRequestId;
	}

	public void setSbRequestId(String sbRequestId) {
		this.sbRequestId = sbRequestId;
	}

	public Date getSbDate() {
		return sbDate;
	}

	public void setSbDate(Date sbDate) {
		this.sbDate = sbDate;
	}

	public String getIecCode() {
		return iecCode;
	}

	public void setIecCode(String iecCode) {
		this.iecCode = iecCode;
	}

	public String getEntityId() {
		return entityId;
	}

	public void setEntityId(String entityId) {
		this.entityId = entityId;
	}

	public String getNameOfExporter() {
		return nameOfExporter;
	}

	public void setNameOfExporter(String nameOfExporter) {
		this.nameOfExporter = nameOfExporter;
	}

	public String getSerNo() {
		return serNo;
	}

	public void setSerNo(String serNo) {
		this.serNo = serNo;
	}

	public Double getGrossWeight() {
		return grossWeight;
	}

	public void setGrossWeight(Double grossWeight) {
		this.grossWeight = grossWeight;
	}

	public String getUomGrossWeight() {
		return uomGrossWeight;
	}

	public void setUomGrossWeight(String uomGrossWeight) {
		this.uomGrossWeight = uomGrossWeight;
	}

	public String getCountryOfDestination() {
		return countryOfDestination;
	}

	public void setCountryOfDestination(String countryOfDestination) {
		this.countryOfDestination = countryOfDestination;
	}

	public String getPortOfDestination() {
		return portOfDestination;
	}

	public void setPortOfDestination(String portOfDestination) {
		this.portOfDestination = portOfDestination;
	}

	public String getAirwayBillNo() {
		return airwayBillNo;
	}

	public void setAirwayBillNo(String airwayBillNo) {
		this.airwayBillNo = airwayBillNo;
	}

	public String getDescriptionOfGoods() {
		return descriptionOfGoods;
	}

	public void setDescriptionOfGoods(String descriptionOfGoods) {
		this.descriptionOfGoods = descriptionOfGoods;
	}

	public String getNsdlStatus() {
		return nsdlStatus;
	}

	public void setNsdlStatus(String nsdlStatus) {
		this.nsdlStatus = nsdlStatus;
	}

	public String getDgdcStatus() {
		return dgdcStatus;
	}

	public void setDgdcStatus(String dgdcStatus) {
		this.dgdcStatus = dgdcStatus;
	}

	public String getChaNo() {
		return chaNo;
	}

	public void setChaNo(String chaNo) {
		this.chaNo = chaNo;
	}

	public String getChaName() {
		return chaName;
	}

	public void setChaName(String chaName) {
		this.chaName = chaName;
	}

	public String getConsoleAgent() {
		return consoleAgent;
	}

	public void setConsoleAgent(String consoleAgent) {
		this.consoleAgent = consoleAgent;
	}

	public Double getFobValueInINR() {
		return fobValueInINR;
	}

	public void setFobValueInINR(Double fobValueInINR) {
		this.fobValueInINR = fobValueInINR;
	}

	public int getNoOfPackages() {
		return noOfPackages;
	}

	public void setNoOfPackages(int noOfPackages) {
		this.noOfPackages = noOfPackages;
	}

	public String getUomOfPackages() {
		return uomOfPackages;
	}

	public void setUomOfPackages(String uomOfPackages) {
		this.uomOfPackages = uomOfPackages;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getEditedBy() {
		return editedBy;
	}

	public void setEditedBy(String editedBy) {
		this.editedBy = editedBy;
	}

	public Date getEditedDate() {
		return editedDate;
	}

	public void setEditedDate(Date editedDate) {
		this.editedDate = editedDate;
	}

	public String getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(String approvedBy) {
		this.approvedBy = approvedBy;
	}

	public Date getApprovedDate() {
		return approvedDate;
	}

	public void setApprovedDate(Date approvedDate) {
		this.approvedDate = approvedDate;
	}

}