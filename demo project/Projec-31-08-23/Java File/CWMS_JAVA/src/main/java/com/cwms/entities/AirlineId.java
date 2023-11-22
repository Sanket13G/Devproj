package com.cwms.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;

public class AirlineId implements Serializable {

	private String companyId;
	private String branchId;
	private String airlineName;
	private String flightNo;
	public AirlineId(String companyId, String branchId, String airlineName, String flightNo) {
		super();
		this.companyId = companyId;
		this.branchId = branchId;
		this.airlineName = airlineName;
		this.flightNo = flightNo;
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
	public AirlineId() {
		super();
	}

	
}