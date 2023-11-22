import React from 'react'
import NavBar from './NavBar'
import MenuBar from './MenuBar'
import { Col, Container, Row } from 'reactstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login2 from './Login2'
import Export from '../Parent_Pages/Export'
import Import from '../Parent_Pages/Import'
import Import_Unidentified from '../Parent_Pages/Import_Unidentified'
import Subcontract_Export from '../Parent_Pages/Subcontract_Export'
import Subcontract_Import from '../Parent_Pages/Subcontract_Import'
import Detection_List from '../Parent_Pages/Detention_List'
import Payment_and_bill from '../Parent_Pages/Payment_and_bill'
import Rate_chart from '../Parent_Pages/Rate_chart'
import Holiday_list from '../Parent_Pages/Holiday_list'
import ManageExternalUser from '../Parent_Pages/ManageExternalUser'
import ManageInternalUser from '../Parent_Pages/ManageInternalUser'
import ManageParty from '../Parent_Pages/ManageParty'
import Carting_Agent from '../Child_Pages/Carting_Agent'
import Common from '../Child_Pages/Common'
import Forwardparcel from '../Child_Pages/Forwardparcel'
import Heavy_parcel from '../Child_Pages/Heavy_parcel'
import Export_personal_gate_pass from '../Child_Pages/Export_personal_gate_pass'
import Print_tag from '../Child_Pages/Print_tag'
import Generate_AWB_SER from '../Child_Pages/Generate_AWB_SER'
import Scan_personal_BE from '../Child_Pages/Scan_personal_BE'
import Nipt_BE_Scan from '../Child_Pages/Nipt_BE_Scan'
import Scan_BE_QR_Code from '../Child_Pages/Scan_BE_QR_Code'
import Importtp from '../Child_Pages/Importtp'
import Exporttp from '../Child_Pages/Exporttp'
import ExportPctm from '../Child_Pages/ExportPctm'
import Export_register from '../Child_Pages/Export_register'
import Import_Register from '../Child_Pages/Import_Register'
import Carting_Sheet from '../Child_Pages/Carting_Sheet'
import Export_transaction from '../Child_Pages/Export_transaction'
import Import_transaction from '../Child_Pages/Import_transaction'
import Delivery_order from '../Child_Pages/Delivery_order'
import Stock_at_vault from '../Child_Pages/Stock_at_vault'
import Subcontract_report from '../Child_Pages/Subcontract_report'
import Party_bill_summary from '../Child_Pages/Party_bill_summary'
import Sub_import_transaction from '../Child_Pages/Sub_import_transaction'
import User from '../Child_Pages/User'
import UserRights from '../Child_Pages/UserRights'
import Import_PCTM from '../Child_Pages/Import_PCTM'

const  AfterLogin = () => {
  return (
    <div>
        <NavBar/>
        <Container>
           <Row>
            <Col md={3} style={{marginLeft:18}}>
            <MenuBar/>
            </Col>
            </Row>
        
        
        </Container>.        
        {/* <Router>
        <Container>
           <Row>
            <Col md={3} style={{marginLeft:18}}>
            <MenuBar/>
            </Col>
            <Col md={9}>
            <Routes>
                <Route path='/' element={<Login2/>} />
                <Route  path='/MenuBar' element={<MenuBar/>} />
                <Route  path='/NavBar' element={<NavBar/>} />
                <Route path='/login' element={<Login2/>} />
                <Route path='/AfterLogin' element={<AfterLogin/>} />
                <Route path="/parent/export" element={<Export />} />
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
                <Route path="/parent/manage-party" element={<ManageParty />} />

                <Route path="/child/carting-agent" element={<Carting_Agent />} />
                <Route path="/child/common" element={<Common />} />
                <Route path="/child/export-personal-gate-pass" element={<Export_personal_gate_pass />} />
                <Route path="/child/forward-parcel" element={<Forwardparcel />} />
                <Route path="/child/heavy-parcel" element={<Heavy_parcel />} />
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
                <Route path="/child/user" element={<User/>} />
                <Route path="/child/userRights" element={<UserRights />} />

            </Routes>
        
            </Col>
          </Row>
    
        </Container>
        </Router>
         */}
    </div>
  )
}
export default AfterLogin;