package com.cwms.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.*;


@Entity
@Table(name = "importsub")
@IdClass(ImportSubId.class)
public class ImportSub   {

    @Id
    @Column(name = "Company_Id", length = 6, nullable = false)
    private String companyId;

    @Id
    @Column(name = "Branch_Id", length = 6, nullable = false)
    private String branchId;

    @Id
    @Column(name = "Imp_Sub_Id", length = 10, nullable = false)
    private String impSubId;

    @Id
    @Column(name = "Request_Id", length = 30)
    private String requestId;

   
    @Column(name = "SIR_No", length = 20, nullable = false)
    private String sirNo;

    @Temporal(TemporalType.DATE)
    @Column(name = "SIR_Date", nullable = false)
    private Date sirDate;

    @Column(name = "Import_Type", length = 20, nullable = false)
    private String importType;

    @Column(name = "Exporter", length = 80, nullable = false)
    private String exporter;

    @Column(name = "Challan_No", length = 30, nullable = false)
    private String challanNo;

    @Temporal(TemporalType.DATE)
    @Column(name = "Challan_Date", nullable = false)
    private Date challanDate;

    @Column(name = "Invoice_No", length = 30, nullable = false)
    private String invoiceNo;

    @Temporal(TemporalType.DATE)
    @Column(name = "Invoice_Date", nullable = false)
    private Date invoiceDate;

    @Column(name = "Nop", nullable = false, columnDefinition = "int default 0")
    private int nop;

    @Column(name = "Net_Weight", nullable = false, precision = 15, scale = 3)
    private BigDecimal netWeight;

    @Column(name = "Net_weight_unit", length = 20, nullable = false)
    private String netWeightUnit;

    @Column(name = "Product_Value", nullable = false, precision = 15, scale = 3)
    private BigDecimal productValue;

    @Column(name = "Currency", length = 15, nullable = false)
    private String currency;

    @Column(name = "Remarks", length = 255, nullable = false)
    private String remarks;

    @Temporal(TemporalType.DATE)
    @Column(name = "Reentry_Date", nullable = false)
    private Date reentryDate;

    @Column(name = "NSDL_Status", length = 30, nullable = false)
    private String nsdlStatus;

    @Column(name = "DGDC_Status", length = 30, nullable = false)
    private String dgdcStatus;

    @Column(name = "Status", length = 1, nullable = false)
    private String status;

    @Column(name = "Created_By", length = 10)
    private String createdBy;

    @Column(name = "Created_Date", nullable = false)
    private Date createdDate;

    @Column(name = "Edited_By", length = 10)
    private String editedBy;

    @Column(name = "Edited_Date")
    private Date editedDate;

    @Column(name = "Approved_By", length = 10)
    private String approvedBy;

    @Column(name = "Approved_Date")
    private Date approvedDate;

	public ImportSub() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ImportSub(String companyId, String branchId, String impSubId, String requestId, String sirNo, Date sirDate,
			String importType, String exporter, String challanNo, Date challanDate, String invoiceNo, Date invoiceDate,
			int nop, BigDecimal netWeight, String netWeightUnit, BigDecimal productValue, String currency,
			String remarks, Date reentryDate, String nsdlStatus, String dgdcStatus, String status, String createdBy,
			Date createdDate, String editedBy, Date editedDate, String approvedBy, Date approvedDate) {
		super();
		this.companyId = companyId;
		this.branchId = branchId;
		this.impSubId = impSubId;
		this.requestId = requestId;
		this.sirNo = sirNo;
		this.sirDate = sirDate;
		this.importType = importType;
		this.exporter = exporter;
		this.challanNo = challanNo;
		this.challanDate = challanDate;
		this.invoiceNo = invoiceNo;
		this.invoiceDate = invoiceDate;
		this.nop = nop;
		this.netWeight = netWeight;
		this.netWeightUnit = netWeightUnit;
		this.productValue = productValue;
		this.currency = currency;
		this.remarks = remarks;
		this.reentryDate = reentryDate;
		this.nsdlStatus = nsdlStatus;
		this.dgdcStatus = dgdcStatus;
		this.status = status;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.editedBy = editedBy;
		this.editedDate = editedDate;
		this.approvedBy = approvedBy;
		this.approvedDate = approvedDate;
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

	public String getImpSubId() {
		return impSubId;
	}

	public void setImpSubId(String impSubId) {
		this.impSubId = impSubId;
	}

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public String getSirNo() {
		return sirNo;
	}

	public void setSirNo(String sirNo) {
		this.sirNo = sirNo;
	}

	public Date getSirDate() {
		return sirDate;
	}

	public void setSirDate(Date sirDate) {
		this.sirDate = sirDate;
	}

	public String getImportType() {
		return importType;
	}

	public void setImportType(String importType) {
		this.importType = importType;
	}

	public String getExporter() {
		return exporter;
	}

	public void setExporter(String exporter) {
		this.exporter = exporter;
	}

	public String getChallanNo() {
		return challanNo;
	}

	public void setChallanNo(String challanNo) {
		this.challanNo = challanNo;
	}

	public Date getChallanDate() {
		return challanDate;
	}

	public void setChallanDate(Date challanDate) {
		this.challanDate = challanDate;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public int getNop() {
		return nop;
	}

	public void setNop(int nop) {
		this.nop = nop;
	}

	public BigDecimal getNetWeight() {
		return netWeight;
	}

	public void setNetWeight(BigDecimal netWeight) {
		this.netWeight = netWeight;
	}

	public String getNetWeightUnit() {
		return netWeightUnit;
	}

	public void setNetWeightUnit(String netWeightUnit) {
		this.netWeightUnit = netWeightUnit;
	}

	public BigDecimal getProductValue() {
		return productValue;
	}

	public void setProductValue(BigDecimal productValue) {
		this.productValue = productValue;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Date getReentryDate() {
		return reentryDate;
	}

	public void setReentryDate(Date reentryDate) {
		this.reentryDate = reentryDate;
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

	@Override
	public String toString() {
		return "ImportSub [companyId=" + companyId + ", branchId=" + branchId + ", impSubId=" + impSubId
				+ ", requestId=" + requestId + ", sirNo=" + sirNo + ", sirDate=" + sirDate + ", importType="
				+ importType + ", exporter=" + exporter + ", challanNo=" + challanNo + ", challanDate=" + challanDate
				+ ", invoiceNo=" + invoiceNo + ", invoiceDate=" + invoiceDate + ", nop=" + nop + ", netWeight="
				+ netWeight + ", netWeightUnit=" + netWeightUnit + ", productValue=" + productValue + ", currency="
				+ currency + ", remarks=" + remarks + ", reentryDate=" + reentryDate + ", nsdlStatus=" + nsdlStatus
				+ ", dgdcStatus=" + dgdcStatus + ", status=" + status + ", createdBy=" + createdBy + ", createdDate="
				+ createdDate + ", editedBy=" + editedBy + ", editedDate=" + editedDate + ", approvedBy=" + approvedBy
				+ ", approvedDate=" + approvedDate + "]";
	}

    
}

