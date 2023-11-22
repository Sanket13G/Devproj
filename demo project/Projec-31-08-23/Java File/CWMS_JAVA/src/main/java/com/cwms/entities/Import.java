package com.cwms.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "import")
@IdClass(ImportIds.class)
public class Import {

	@Id
    @Column(name = "Company_Id",length = 6)
    private String companyId;

    @Id
    @Column(name = "Branch_Id",length = 6)
    private String branchId;

    @Id
    @Column(name = "Imp_Trans_Id",length = 10)
    private String impTransId;

    @Column(name = "Imp_Trans_Date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date impTransDate;

    @Column(name = "MAWB",length = 12)
    private String mawb;

    @Column(name = "HAWB",length = 10)
    private String hawb;

    @Column(name = "IGM_No",length = 10)
    private String igmNo;

    @Column(name = "IGM_Date")
    @Temporal(TemporalType.DATE)
    private Date igmDate;

    @Column(name = "SIR_No",length = 10)
    private String sirNo;

    @Column(name = "SIR_Date")
    @Temporal(TemporalType.DATE)
    private Date sirDate;

    @Column(name = "PCTM_No")
    private String pctmNo;

    @Column(name = "TP_No")
    private String tpNo;

    @Column(name = "TP_Date")
    @Temporal(TemporalType.DATE)
    private Date tpDate;

    @Column(name = "Airline_Name")
    private String airlineName;

    @Column(name = "Flight_No")
    private String flightNo;

    @Column(name = "Flight_Date")
    @Temporal(TemporalType.DATE)
    private Date flightDate;

    @Column(name = "COUNTRY_ORIGIN")
    private String countryOrigin;

    @Column(name = "PORT_ORIGIN")
    private String portOrigin;

    @Column(name = "Importer_Id")
    private String importerId;

    @Column(name = "IEC")
    private String iec;

    @Column(name = "SEZ_ENTITY_ID")
    private String sezEntityId;

    @Column(name = "consoleName")
    private String consoleName;

    @Column(name = "Package_Content_Type")
    private String packageContentType;

    @Column(name = "Parcel_Type")
    private String parcelType;

    @Column(name = "UOM_PACKAGES")
    private String uomPackages;
    
      
    

    @Column(name = "Nop")
    private int nop;

    @Column(name = "Import_Remarks")
    private String importRemarks;

    @Column(name = "DESCRIPTION_OF_GOODS")
    private String descriptionOfGoods;

    @Column(name = "CHA_CDE")
    private String chaCde;

    @Column(name = "ASSESSABLE_VALUE")
    private String assessableValue;

    @Column(name = "Gross_Weight")
    private BigDecimal grossWeight;

    @Column(name = "BE_REQUEST_ID")
    private String beRequestId;

    @Column(name = "UOM_Weight")
    private BigDecimal uomWeight;
    
    @Column(name = "BE_No")
    private String beNo;

    @Column(name = "BE_Date")
    @Temporal(TemporalType.DATE)
    private Date beDate;

    @Column(name = "Import_Address")
    private String importAddress;

    @Column(name = "Status")
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
    
    @Column(name = "NSDL_Status")
    private String nsdl_Status;
    
    @Column(name = "DGDC_Status")
    private String dgdc_Status;

	public Import() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public String getNSDL_Status() {
		return nsdl_Status;
	}


	public void setNSDL_Status(String nSDL_Status) {
		nsdl_Status = nSDL_Status;
	}


	public String getDGDC_Status() {
		return dgdc_Status;
	}


	public void setDGDC_Status(String dGDC_Status) {
		dgdc_Status = dGDC_Status;
	}


	public Import(String companyId, String branchId, String impTransId, Date impTransDate, String mawb, String hawb,
			String igmNo, Date igmDate, String sirNo, Date sirDate, String pctmNo, String tpNo, Date tpDate,
			String airlineName, String flightNo, Date flightDate, String countryOrigin, String portOrigin,
			String importerId, String iec, String sezEntityId, String consoleName, String packageContentType,
			String parcelType, String uomPackages, int nop, String importRemarks, String descriptionOfGoods,
			String chaCde, String assessableValue, BigDecimal grossWeight, String beRequestId, BigDecimal uomWeight,
			String beNo, Date beDate, String importAddress, String status, String createdBy, Date createdDate,
			String editedBy, Date editedDate, String approvedBy, Date approvedDate, String nSDL_Status,
			String dGDC_Status) {
		super();
		this.companyId = companyId;
		this.branchId = branchId;
		this.impTransId = impTransId;
		this.impTransDate = impTransDate;
		this.mawb = mawb;
		this.hawb = hawb;
		this.igmNo = igmNo;
		this.igmDate = igmDate;
		this.sirNo = sirNo;
		this.sirDate = sirDate;
		this.pctmNo = pctmNo;
		this.tpNo = tpNo;
		this.tpDate = tpDate;
		this.airlineName = airlineName;
		this.flightNo = flightNo;
		this.flightDate = flightDate;
		this.countryOrigin = countryOrigin;
		this.portOrigin = portOrigin;
		this.importerId = importerId;
		this.iec = iec;
		this.sezEntityId = sezEntityId;
		this.consoleName = consoleName;
		this.packageContentType = packageContentType;
		this.parcelType = parcelType;
		this.uomPackages = uomPackages;
		this.nop = nop;
		this.importRemarks = importRemarks;
		this.descriptionOfGoods = descriptionOfGoods;
		this.chaCde = chaCde;
		this.assessableValue = assessableValue;
		this.grossWeight = grossWeight;
		this.beRequestId = beRequestId;
		this.uomWeight = uomWeight;
		this.beNo = beNo;
		this.beDate = beDate;
		this.importAddress = importAddress;
		this.status = status;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.editedBy = editedBy;
		this.editedDate = editedDate;
		this.approvedBy = approvedBy;
		this.approvedDate = approvedDate;
		nsdl_Status = nSDL_Status;
		dgdc_Status = dGDC_Status;
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

	public String getImpTransId() {
		return impTransId;
	}

	public void setImpTransId(String impTransId) {
		this.impTransId = impTransId;
	}

	public Date getImpTransDate() {
		return impTransDate;
	}

	public void setImpTransDate(Date impTransDate) {
		this.impTransDate = impTransDate;
	}

	public String getMawb() {
		return mawb;
	}

	public void setMawb(String mawb) {
		this.mawb = mawb;
	}

	public String getHawb() {
		return hawb;
	}

	public void setHawb(String hawb) {
		this.hawb = hawb;
	}

	public String getIgmNo() {
		return igmNo;
	}

	public void setIgmNo(String igmNo) {
		this.igmNo = igmNo;
	}

	public Date getIgmDate() {
		return igmDate;
	}

	public void setIgmDate(Date igmDate) {
		this.igmDate = igmDate;
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

	public String getPctmNo() {
		return pctmNo;
	}

	public void setPctmNo(String pctmNo) {
		this.pctmNo = pctmNo;
	}

	public String getTpNo() {
		return tpNo;
	}

	public void setTpNo(String tpNo) {
		this.tpNo = tpNo;
	}

	public Date getTpDate() {
		return tpDate;
	}

	public void setTpDate(Date tpDate) {
		this.tpDate = tpDate;
	}

	public String getAirlineName() {
		return airlineName;
	}

	public void setAirlineName(String airlineName) {
		this.airlineName = airlineName;
	}

	public String getFlightNo() {
		return flightNo;
	}

	public void setFlightNo(String flightNo) {
		this.flightNo = flightNo;
	}

	public Date getFlightDate() {
		return flightDate;
	}

	public void setFlightDate(Date flightDate) {
		this.flightDate = flightDate;
	}

	public String getCountryOrigin() {
		return countryOrigin;
	}

	public void setCountryOrigin(String countryOrigin) {
		this.countryOrigin = countryOrigin;
	}

	public String getPortOrigin() {
		return portOrigin;
	}

	public void setPortOrigin(String portOrigin) {
		this.portOrigin = portOrigin;
	}

	public String getImporterId() {
		return importerId;
	}

	public void setImporterId(String importerId) {
		this.importerId = importerId;
	}

	public String getIec() {
		return iec;
	}

	public void setIec(String iec) {
		this.iec = iec;
	}

	public String getSezEntityId() {
		return sezEntityId;
	}

	public void setSezEntityId(String sezEntityId) {
		this.sezEntityId = sezEntityId;
	}

	public String getConsoleName() {
		return consoleName;
	}

	public void setConsoleName(String consoleName) {
		this.consoleName = consoleName;
	}

	public String getPackageContentType() {
		return packageContentType;
	}

	public void setPackageContentType(String packageContentType) {
		this.packageContentType = packageContentType;
	}

	public String getParcelType() {
		return parcelType;
	}

	public void setParcelType(String parcelType) {
		this.parcelType = parcelType;
	}

	public String getUomPackages() {
		return uomPackages;
	}

	public void setUomPackages(String uomPackages) {
		this.uomPackages = uomPackages;
	}

	public int getNop() {
		return nop;
	}

	public void setNop(int nop) {
		this.nop = nop;
	}

	public String getImportRemarks() {
		return importRemarks;
	}

	public void setImportRemarks(String importRemarks) {
		this.importRemarks = importRemarks;
	}

	public String getDescriptionOfGoods() {
		return descriptionOfGoods;
	}

	public void setDescriptionOfGoods(String descriptionOfGoods) {
		this.descriptionOfGoods = descriptionOfGoods;
	}

	public String getChaCde() {
		return chaCde;
	}

	public void setChaCde(String chaCde) {
		this.chaCde = chaCde;
	}

	public String getAssessableValue() {
		return assessableValue;
	}

	public void setAssessableValue(String assessableValue) {
		this.assessableValue = assessableValue;
	}

	public BigDecimal getGrossWeight() {
		return grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}

	public String getBeRequestId() {
		return beRequestId;
	}

	public void setBeRequestId(String beRequestId) {
		this.beRequestId = beRequestId;
	}

	public BigDecimal getUomWeight() {
		return uomWeight;
	}

	public void setUomWeight(BigDecimal uomWeight) {
		this.uomWeight = uomWeight;
	}

	public String getBeNo() {
		return beNo;
	}

	public void setBeNo(String beNo) {
		this.beNo = beNo;
	}

	public Date getBeDate() {
		return beDate;
	}

	public void setBeDate(Date beDate) {
		this.beDate = beDate;
	}

	public String getImportAddress() {
		return importAddress;
	}

	public void setImportAddress(String importAddress) {
		this.importAddress = importAddress;
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