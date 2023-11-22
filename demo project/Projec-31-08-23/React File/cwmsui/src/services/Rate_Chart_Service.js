import axios from "axios";
const service_url = 'http://localhost:8080/service/'
const party_url = 'http://localhost:8080/parties'
const cfsservice_url = 'http://localhost:8080/cfstarrif'
const tarrif_url = 'http://localhost:8080/tarrif/'
const range_url = 'http://localhost:8080/range/'
const user_url = 'http://localhost:8080/user/'
const import_url = 'http://localhost:8080/import/'
const airline_url = 'http://localhost:8080/Airline/'
const jardetail_url = 'http://localhost:8080/jardetail/' 
const ImportHistory_url = 'http://localhost:8080/history/' 
class Rate_Chart_Service {

  getServices(compid,branchid) {
    return axios.get(`${service_url}${compid}/${branchid}`);
  }
  getExcludedServices(compid,branchid,excludedserviceIds) {
    return axios.get(`${service_url}${compid}/${branchid}/diffservice?excludedserviceIds=${excludedserviceIds}`);
  }

  getByServiceId(compid,branchid,sid) {
    return axios.get(`${service_url}${compid}/${branchid}/${sid}`)
  }

  getAllParties() 
  {
    return axios.get(`${party_url}/getAll`);
  }
  getParties(excludedPartyIds) {
    const excludedPartyIdsStr = excludedPartyIds.join(','); // Convert array to comma-separated string
    return axios.get(`${party_url}/diffparty?excludedPartyIds=${excludedPartyIdsStr}`);
  }
  getPartyById(companyId, branchId, partyId) {
    return axios.get(`${party_url}/${companyId}/${branchId}/${partyId}`)
  }

  addCFSserviceOnlyService(companyId, branchId, currentUser, service_Id, cfsService) {
    return axios.post(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${service_Id}/service`, cfsService)
  }

  addCFSservice(companyId, branchId, currentUser, cfsService) {
    return axios.post(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}`, cfsService)
  }

  getCFSServiceById(cfsTarrifNo) {
    return axios.get(`${cfsservice_url}/${cfsTarrifNo}/cfstservices`);
  }
  getCFSService(compId, BranchId) {
    return axios.get(`${cfsservice_url}/${compId}/${BranchId}`);
  }

  updateCFSservice(companyId, branchId, currentUser, cfstarrifno, cfsService) {
    return axios.put(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${cfstarrifno}`, cfsService)
  }

  updateCFSservicestatus(companyId, branchId, currentUser, cfstarrifno, cfsService) {
    return axios.put(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${cfstarrifno}/status`, cfsService)
  }

  findByTarrifNoAndServiceID(compid,branchid,tarrifNo,amndno,ServiceId) {
    return axios.get(`${cfsservice_url}/${compid}/${branchid}/${tarrifNo}/${amndno}/${ServiceId}/Single`)
  }
  // All Tarifs Functions

  getAllTarrifs(compId,branchId) {
    return axios.get(`${tarrif_url}${compId}/${branchId}`)
  }

  addTarrif(compId, BranchId, currentUser, tarrif) {
    return axios.post(`${tarrif_url}${compId}/${BranchId}/${currentUser}`, tarrif);
  }

  updateTarrif(compId, BranchId, currentUser,cfstarrifno, tarrif) {
    return axios.put(`${tarrif_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/update`, tarrif);
  }

  updateTarrifStatus(compId, BranchId, currentUser,cfstarrifno, tarrif) {
    return axios.put(`${tarrif_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/status`, tarrif);
  }

  getCFSTarrifById(compId, BranchId,cfsTarrifNo) {
    return axios.get(`${tarrif_url}${compId}/${BranchId}/${cfsTarrifNo}/cfstarrif`);
  }


  getRangeByTarrifNoAndServiceId(compId,branchId,tarrifno,amondno,serlno)
  {
    return axios.get(`${range_url}${compId}/${branchId}/${tarrifno}/${amondno}/${serlno}/ser`)
  }


  addTarrifRange(compId, BranchId, currentUser, range) {
    return axios.post(`${range_url}${compId}/${BranchId}/${currentUser}/add`, range);
  }

  updateTarrifRange(compId, BranchId, currentUser,cfstarrifno, range) {
    return axios.put(`${range_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/update`, range);
  }

  updateTarrifRangeStatus(compId, BranchId, currentUser,cfstarrifno, range) {
    return axios.put(`${range_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/status`, range);
  }
  

  getCombinedServicesSingleTarrifNo(cid,bid,cfsTarrifNo) {
    return axios.get(`${range_url}${cid}/${bid}/${cfsTarrifNo}/join`);
  }

  saveAllTarrifRanges(TarrifRanges,user)
  {
    return axios.post(`${range_url}tariffRanges/saveAll/${user}`,TarrifRanges)
  }




deletecfssrvTarrif(cid,bid,TarrifNo,amndno,ServiceId)
{
  return axios.delete(`${cfsservice_url}/${cid}/${bid}/${TarrifNo}/${amndno}/${ServiceId}/delete`);
}

deletecfsrangeTarrif(cid,bid,TarrifNo,amndno,ServiceId)
{
  return axios.delete(`${range_url}${cid}/${bid}/${TarrifNo}/${amndno}/${ServiceId}/delete`);
}

getUserbyUserId(userId,cid,bid)
{
  return axios.get(`${user_url}get-user/${userId}/${cid}/${bid}`);
}


getAllImports(compId,branchId)
{
  return axios.get(`${import_url}${compId}/${branchId}/All`);
}

getByMAWBNo(compId,branchId,mawbno)
{
  return axios.get(`${import_url}${compId}/${branchId}/${mawbno}`);
}
addImport(compid,bid,username,import2)
{
  return axios.post(`${import_url}${compid}/${bid}/${username}/add`,import2);
}
updateImport(compid,bid,username,import2)
{
  return axios.put(`${import_url}${compid}/${bid}/${username}/update`,import2);
}

ModifyupdateImport(compid,bid,username,import2)
{
  return axios.put(`${import_url}${compid}/${bid}/${username}/modifyupdate`,import2);
}

// Airline 
getAllairline (cid,bid)
{
  return axios.get(`${airline_url}list/${bid}/${cid}`);
}

GetByMAWBandHAWB(compid,bid,transId,MAWb,HAWB,sirNo)
{
  return axios.get(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/getSingle`);
}

findByFlightNo(flightno,cid,bid)
{
  return axios.get(`${airline_url}find/${cid}/${bid}/${flightno}`);
}

getjarsByJarId(jarId,company_Id)
{
  return axios.get(`${jardetail_url}jarIdList/${jarId}/${company_Id}`);
}

getHistoryBySIRNo(cid,bid,sirno)
{
  return axios.get(`${ImportHistory_url}${cid}/${bid}/${sirno}`);
}

deleteimportofmawb(compid,bid,transId,MAWb,HAWB,sirNo)
{
  return axios.delete(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/delete`);
}


}
export default new Rate_Chart_Service();