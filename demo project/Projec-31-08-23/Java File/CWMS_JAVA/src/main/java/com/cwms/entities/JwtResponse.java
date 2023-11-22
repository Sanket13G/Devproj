package com.cwms.entities;

public class JwtResponse {

    private String jwtToken;
    private String userId;
    private String username;
    private String branchId;
    private String companyid;
    private String role;
    private String companyname;
    private String branchname;
	public JwtResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public JwtResponse(String jwtToken, String userId, String username, String branchId, String companyid, String role,
			String companyname, String branchname) {
		super();
		this.jwtToken = jwtToken;
		this.userId = userId;
		this.username = username;
		this.branchId = branchId;
		this.companyid = companyid;
		this.role = role;
		this.companyname = companyname;
		this.branchname = branchname;
	}
	public String getJwtToken() {
		return jwtToken;
	}
	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getBranchId() {
		return branchId;
	}
	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}
	public String getCompanyid() {
		return companyid;
	}
	public void setCompanyid(String companyid) {
		this.companyid = companyid;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getCompanyname() {
		return companyname;
	}
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}
	public String getBranchname() {
		return branchname;
	}
	public void setBranchname(String branchname) {
		this.branchname = branchname;
	}
	@Override
	public String toString() {
		return "JwtResponse [jwtToken=" + jwtToken + ", userId=" + userId + ", username=" + username + ", branchId="
				+ branchId + ", companyid=" + companyid + ", role=" + role + ", companyname=" + companyname
				+ ", branchname=" + branchname + "]";
	}
	
	
}
