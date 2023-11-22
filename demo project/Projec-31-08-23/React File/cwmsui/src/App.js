import React, { useState,useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Export from './Parent_Pages/Export';
import Import from './Parent_Pages/Import';
import Import_Unidentified from './Parent_Pages/Import_Unidentified';
import Subcontract_Export from './Parent_Pages/Subcontract_Export';
import Subcontract_Import from './Parent_Pages/Subcontract_Import';
import Detection_List from './Parent_Pages/Detention_List';
import Payment_and_bill from './Parent_Pages/Payment_and_bill';
import Rate_chart from './Parent_Pages/Rate_chart';
import Holiday_list from './Parent_Pages/Holiday_list';
import Carting_Agent from './Child_Pages/Carting_Agent';
import Carting_Sheet from './Child_Pages/Carting_Sheet';
import Common from './Child_Pages/Common';
import Delivery_order from './Child_Pages/Delivery_order';
import Export_personal_gate_pass from './Child_Pages/Export_personal_gate_pass';
import Export_register from './Child_Pages/Export_register';
import Export_transaction from './Child_Pages/Export_transaction';
import ExportPctm from './Child_Pages/ExportPctm';
import Exporttp from './Child_Pages/Exporttp';
import Forwardparcel from './Child_Pages/Forwardparcel';
import Generate_AWB_SER from './Child_Pages/Generate_AWB_SER';
import Heavy_parcel from './Child_Pages/Heavy_parcel';
import Import_PCTM from './Child_Pages/Import_PCTM';
import Import_Register from './Child_Pages/Import_Register';
import Import_transaction from './Child_Pages/Import_transaction';
import Importtp from './Child_Pages/Importtp';
import Nipt_BE_Scan from './Child_Pages/Nipt_BE_Scan';
import Party_bill_summary from './Child_Pages/Party_bill_summary';
import Print_tag from './Child_Pages/Print_tag';
import Scan_BE_QR_Code from './Child_Pages/Scan_BE_QR_Code';
import Scan_personal_BE from './Child_Pages/Scan_personal_BE';
import Stock_at_vault from './Child_Pages/Stock_at_vault';
import Sub_import_transaction from './Child_Pages/Sub_import_transaction';
import Subcontract_report from './Child_Pages/Subcontract_report';
import Update_Nsdl_status from './Child_Pages/Update_Nsdl_status';
import Login2 from './Components/Login2';
import { AuthProvider } from './Components/AuthProvider';
import User from './Child_Pages/User';
import UserRights from './Child_Pages/UserRights';
import ManageExternalUser from './Parent_Pages/ManageExternalUser';
import ManageInternalUser from './Parent_Pages/ManageInternalUser';
import Head from './Components/NavBar';
import { Col, Row } from 'reactstrap';
import SideBar from './Components/SideBar';
import PartyForm from './Parent_Pages/PartyForm';
import PartyListTable from './Parent_Pages/PartyListTable';
import UpdatePartyForm from './Parent_Pages/updatePartyForm';
import { ToastContainer } from 'react-toastify';
import Party from './Parent_Pages/Party';
import Package_Content_Type from './Child_Pages/Package_Content_Type';
import Service_Master from './Child_Pages/Service_Master';
import Airline from './Child_Pages/Airline';
import Generate_Bill from './Child_Pages/Generate_Bill';
import Sub_export_transaction from './Child_Pages/Sub_export_transaction';
import GST_Reports from './Child_Pages/GST_Reports';
import New_GST_Reports from './Child_Pages/New_GST_Reports';
import Party_Bill_Payments_Reports from './Child_Pages/Party_Bill_Payments_Reports';
import TDS_Reports from './Child_Pages/TDS_Reports';
import Import_Register_1 from './Child_Pages/Import_Register_1';
import Representative_Details from './Parent_Pages/Representative_Details';
import './Components/Style.css'
import AddJarDetails from "./Components/AddJarDetails";
import Jar from "./Child_Pages/Jar";
import SearchComp from "./Components/SearchComp";
import PartyEntry from "./Components/PartyEntry";
import Rate_CFS_Service from "./Parent_Pages/Rate_CFS_Service";
import SBTransaction from "./Parent_Pages/SBTransaction";
import PDFReport from "./Child_Pages/PDFReport";
import Import_Model from "./Parent_Pages/Import_Model";

function App() {
  const [collapsed, setCollapsed] = useState(false);
 
  return (
    <div>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"></ToastContainer>
      <BrowserRouter>

        <AuthProvider>
          <div className="app pad">
            {/* <SideBar/> */}
            <main className={`pad ${collapsed ? 'content-collapsed' : ''}`}>
              <Routes>
                {/* The Login page without Dashboard */}
                <Route path='/login' element={<Login2 />} />
                <Route path='/' element={<Login2 />} />

                {/* All other pages with Dashboard */}
                <Route
                  path='*'
                  element={
                    <>
                      {/* <Dashboard /> */}
                      <Head />
                      <Row>
                    
                      <Col md={collapsed ? 1 : 2}>
                            <SideBar />
                          </Col>
                  
                          <Col md={collapsed ? 11 : 10}>
                            <div className="content-wrapper">
                            <Routes >
                              {/* <Route path='/parent/party-form' Component={PartyForm}/> */}
                              {/* <Route path='/nav' element={<Head/>}/>
                             <Route path='/side' element={<Sidecontent/>}/> */}
                              <Route path="/parent/export" element={<Export />} />
                              <Route
                                path="/parent/SBTransaction"
                                element={<SBTransaction />}
                              />
                              <Route path="/parent/import" element={<Import />} />
                              <Route path="/parent/import-unidentified" element={<Import_Unidentified />} />
                              <Route path="/parent/subcontract-export" element={<Subcontract_Export />} />
                              <Route path="/parent/subcontract-import" element={<Subcontract_Import />} />
                              <Route path="/parent/detention-list" element={<Detection_List />} />
                              <Route path="/parent/payment-bill" element={<Payment_and_bill />} />
                              <Route path="/parent/rate-chart" element={<Rate_chart />} />
                              <Route path="/parent/holiday-list" element={<Holiday_list />} />
                              <Route path="/parent/manage-e-user" element={<ManageExternalUser />} />
                              <Route path="/parent/manage-i-user" element={<ManageInternalUser />} />
                              <Route path="/parent/manage-party" element={<Party />} />
                              <Route path="/parent/party-form" element={<PartyForm />} />
                              <Route path="/parent/update-party" element={<UpdatePartyForm />} />
                              <Route path="/parent/party-list" element={<PartyListTable />} />
                              <Route path="/Parent_Pages/AddJarDetails/:jarid/:jartype" element={<AddJarDetails/> } />
                              <Route path="/parent/rate-chart" element={<Rate_chart />} />
                              <Route path="/parent/rate-chart/:trfno" element={<Rate_chart />} />
                              <Route path="/parent/rate-chart-services/:cfsTarrifNo" element={<Rate_CFS_Service />} />
                              <Route path="/parent/rate-chart-services/:cfsTarrifNo/:sirid/:range/:sta" element={<Rate_CFS_Service />} />
                              <Route path="/parent/import/add-new" element={<Import_Model />} /> 
                              <Route path="/parent/import/add-new/:transId3/:mawb3/:hawb3/:sir3/view" element={<Import_Model />} /> 
                              <Route path="/parent/import/add-new/:transId2/:mawb2/:hawb2/:sir2/modify" element={<Import_Model />} />
                              <Route path="/parent/representative-details" element={<Representative_Details/>}/>
                              <Route path="/parent/rate-chart" element={<Rate_chart />} />
                              <Route path="/parent/rate-chart/:trfno" element={<Rate_chart />} />
                              <Route path="/parent/rate-chart-services/:cfsTarrifNo" element={<Rate_CFS_Service />} />
                              <Route path="/parent/rate-chart-services/:cfsTarrifNo/:sirid/:range/:amnd" element={<Rate_CFS_Service />} />

                              <Route path="/child/carting-agent" element={<Carting_Agent />} />
                              <Route path="/child/common" element={<Common />} />
                              <Route path="/child/export-personal-gate-pass" element={<Export_personal_gate_pass />} />
                              <Route path="/child/forward-parcel" element={<Forwardparcel />} />
                              <Route path="/child/heavy-parcel" element={<Heavy_parcel />} />
                              <Route path="/child/update-nsdl-status" element={<Update_Nsdl_status />} />
                              <Route path="/child/print-tag" element={<Print_tag />} />
                              <Route path="/child/generate-awb-ser" element={<Generate_AWB_SER />} />
                              <Route path="/child/scan-personal-be" element={<Scan_personal_BE />} />
                              <Route path="/child/nipt-be-scan" element={<Nipt_BE_Scan />} />
                              <Route path="/child/scan-be-qr-code" element={<Scan_BE_QR_Code />} />
                              <Route path="/child/import-tp" element={<Importtp />} />
                              <Route path="/child/export-tp" element={<Exporttp />} />
                              <Route path="/child/import-pctm" element={<Import_PCTM />} />
                              <Route path="/child/export-pctm" element={<ExportPctm />} />
                              <Route path="/child/export-register" element={<Export_register />} />
                              <Route path="/child/import-register" element={<Import_Register />} />
                              <Route path="/child/carting-sheet" element={<Carting_Sheet />} />
                              <Route path="/child/export-transaction" element={<Export_transaction />} />
                              <Route path="/child/import-transaction" element={<Import_transaction />} />
                              <Route path="/child/delivery-order" element={<Delivery_order />} />
                              <Route path="/child/stock-at-vault" element={<Stock_at_vault />} />
                              <Route path="/child/subcontract-report" element={<Subcontract_report />} />
                              <Route path="/child/party-bill-summary" element={<Party_bill_summary />} />
                              <Route path="/child/sub-import-transaction" element={<Sub_import_transaction />} />
                              <Route path="/child/user" element={<User />} />
                              <Route path="/child/userRights" element={<UserRights />} />
                              <Route path="/child/package-content-type" element={<Package_Content_Type />} />
                              <Route path="/child/Airline" element={<Airline />} />
                              <Route path="/child/generate-bill" element={<Generate_Bill />} />
                              <Route path="/child/service-master" element={<Service_Master />} />
                              <Route path="/child/subcontract-export" element={<Sub_export_transaction />} />
                              <Route path="/child/GST-reports" element={<GST_Reports />} />
                              <Route path="/child/New-GST-reports" element={<New_GST_Reports />} />
                              <Route path="/child/Party-bill-payments-reports" element={<Party_Bill_Payments_Reports />} />
                              <Route path="/child/TDS_reports" element={<TDS_Reports />} />
                              <Route path="/child/Import-Register1" element={<Import_Register_1 />} />
                              <Route path="/child/Jar" element={<Jar />} />
                              <Route path="/pdfReport" element={<PDFReport />} />

                              <Route path="/representative" element={<SearchComp/>}/>
                              <Route path="/party" element={<PartyEntry/>}/>
                            </Routes>
                            </div>
                          </Col>
                       
                      </Row>
                    </>
                  }
                />
              </Routes>

            </main>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;