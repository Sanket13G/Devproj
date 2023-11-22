import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faXmark, faFileLines } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";


export default function Subcontract_Import() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [reqid, setRequestId] = useState('');
  const [JarListDtl, setJarListDtl] = useState([]);
  const [partys, setPartys] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [lowerInputReqId, setLowerInputReqId] = useState('');
  const [getsubimportdata, setGetsubimportdata] = useState([]);
  const [getdatabyid, setGetdatabyid] = useState([]);
  const [impsubhistory, setImpHistory] = useState([]);
  const [validateChallandate, setValidateChallandate] = useState('');
  const [validateInvoicedate, setValidateInvoicedate] = useState('');


  const today = new Date().toISOString().split('T')[0];

  const handlereqid = (e) => {
    setRequestId(e.target.value)
  }

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const toggleDivVisibility = () => {
    if (!isDivVisible) {
      setLowerInputReqId(reqid); // Set the value of lower input box when search button is clicked
    }
    setIsDivVisible(true);
    setLowerInputReqId(reqid);// Always keep the div open after the first click
  };

  const closeModalforReqid = () => {
    setIsModalOpen(false);
    setRequestId('');
    setLowerInputReqId('') // Clear the reqid value when the modal is closed
  };

  const {
    jwtToken,
    user_Id,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    if (isDivVisible && lowerInputReqId) {
      setData((prevData) => ({
        ...prevData,
        requestId: lowerInputReqId,
      }));
    }
  }, [isDivVisible, lowerInputReqId]);

  const [data, setData] = useState({
    companyId: companyid,
    branchId: branchId,
    impSubId: "",
    requestId: lowerInputReqId,
    sirNo: "",
    sirDate: "",
    importType: "",
    exporter: "",
    challanNo: "",
    challanDate: "",
    invoiceNo: "",
    invoiceDate: "",
    nop: "",
    netWeight: "",
    netWeightUnit: "",
    productValue: "",
    currency: "",
    remarks: "",
    reentryDate: "",
    nsdlStatus: "",
    dgdcStatus: "",
    status: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    approvedDate: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the server with the data object
      const response = await axios.post(`http://${ipaddress}:8080/importsub/insertdata/${user_Id}`, data);
      console.log("Saved data:", response.data);
      toast.success('Successfully Added');
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('error')
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenforupdate, setIsModalOpenforupdate] = useState(false);
  const [isModalOpenforhistory, setIsModelOpenforhistory] = useState(false);
  const [forimpsubid, setForimpsubid] = useState('');
  const [forreqid, setForreqid] = useState('');

  const openModalforreqid = () => {
    setIsModalOpen(true);
  };

  const closeModalforReqidforupdate = () => {
    setIsModalOpenforupdate(false);

  };

  const closeModelforHistory = () => {
    setIsModelOpenforhistory(false);
  }


  console.log('dgrtyhu', forimpsubid);

  const getlist = () => {
    axios
      .get(`http://${ipaddress}:8080/jardetail/dgdcstatus/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };



  const fetchPartyNames = async () => {
    try {
      const response = await fetch(`http://${ipaddress}:8080/parties/getAll`);
      const data = await response.json();

      setPartys(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };


  const fetchData = useCallback(() => {
    axios
      .get(`http://${ipaddress}:8080/importsub/all/${companyid}/${branchId}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setGetsubimportdata(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  }, [companyid, branchId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  useEffect(() => {
    getlist();
    fetchPartyNames();
  }, []);




  const formatDateTime = (value) => {
    if (!value) {
      return ""; // Return an empty string if value is empty or undefined
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} `;
  };

  const unixTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };



  const [updatedata, setUpdateData] = useState({
    companyId: '',
    branchId: '',
    impSubId: '',
    requestId: '',
    sirNo: '',
    sirDate: '',
    importType: '',
    exporter: '',
    challanNo: '',
    challanDate: '',
    invoiceNo: '',
    invoiceDate: '',
    nop: '',
    netWeight: '',
    netWeightUnit: '',
    productValue: '',
    currency: '',
    remarks: '',
    reentryDate: '',
    nsdlStatus: '',
    dgdcStatus: '',
    status: '',
    createdBy: '',
    createdDate: '',
    editedBy: '',
    editedDate: '',
    approvedBy: '',
    approvedDate: ''
  });


  const openModalforreqidUpdate = (data) => {
    setIsModalOpenforupdate(true);
    setUpdateData(data);
  };

  const openModalforHistory = (data) => {
    setIsModelOpenforhistory(true);
    setImpHistory(data);
  }

  console.log('impsubhistory',impsubhistory);

  useEffect(() => {
    const getDataById = async () => {
      try {
        const response = await axios.get(`http://${ipaddress}:8080/importsub/byid/${companyid}/${branchId}/${forimpsubid}/${forreqid}`);
        console.log("GET list response:", response.data);
        setGetdatabyid(response.data);

      } catch (error) {
        console.error("GET list error:", error);
      }
    };

    if (forimpsubid !== '' && forreqid !== '') {
      getDataById();
    }
  }, [companyid, branchId, forimpsubid, forreqid]);

  const formattedChallanDate = unixTimestampToDate(updatedata.challanDate);

  const formattedInvoiceDate = unixTimestampToDate(updatedata.invoiceDate);

  const handleChallanDateChange = (event) => {
    const newDate = event.target.value;
    setUpdateData((prevData) => ({
      ...prevData,
      challanDate: new Date(newDate),
    }));
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the server with the data object
      const response = await axios.post(`http://${ipaddress}:8080/importsub/updateData`, updatedata);
      console.log("Saved data:", response.data);
      toast.success('Successfully Updated');
      setUpdateData(response.data);
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('error');
    }
  };

  const handleInviceDateChange = (date) => {
    setUpdateData((prevData) => ({
      ...prevData,
      invoiceDate: date, // Update the date directly without event.target
    }));
  };


  return (
    <>
      <div className="container">
        <h5 className="pageHead" >Subcontract Import List</h5>
        <Card style={{ backgroundColor: "#F8F8F8" }}>
          <CardBody>

            <Form>
              <Row>
                <Col>
                  <DropdownButton
                    title='Action'
                    style={{ float: 'right' }}
                    variant="danger"
                  >
                    <Dropdown.Item onClick={openModalforreqid}>Add New</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Search By</Label>
                    <Input
                      type="text"
                      name="branchname"
                      id="branchname"
                      className="inputField"
                    />
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                    <Label for="status" className="forlabel">Date</Label>
                    <Input
                      type="date"
                      name=""
                      id="status"
                      className="inputField"
                      defaultValue={today}
                    />
                  </FormGroup>
                </Col>
                < Col >
                  <FormGroup>
                    <Label for="status" className="forlabel">&nbsp;</Label>
                    <Input
                      type="date"
                      name=""
                      id="status"
                      className="inputField"
                      defaultValue={today}
                    />
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                    <Label for="status" className="forlabel">DGDC Status</Label>
                    <select
                      id="hold"
                      className="form-control form-select"
                      required
                    >
                      <option value="">Select DGDC status</option>
                      {JarListDtl.map((data, index) => (
                        <option key={index} >{data.jarDtlDesc}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col >
                  <Button type="button" className="" variant="outline-danger" style={{ marginTop: '27px' }}>
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                    SEARCH
                  </Button>
                  <Button type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '27px' }} >
                    <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                    CLEAR
                  </Button>
                </Col>
              </Row>
            </Form>
            <Table striped bordered hover style={{ width: '100%', marginTop: '30px' }} className="table table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ background: "skyblue" }}>Sr.No.</th>
                  <th style={{ background: "skyblue" }}>SIR No</th>
                  <th style={{ background: "skyblue" }}>SIR Date</th>
                  <th style={{ background: "skyblue" }}>Request Id</th>
                  <th style={{ background: "skyblue" }}>Importer</th>
                  <th style={{ background: "skyblue" }}>NOP</th>
                  <th style={{ background: "skyblue" }}>Re-Entry Date</th>
                  <th style={{ background: "skyblue" }}>Passed-In Net Weight</th>
                  <th style={{ background: "skyblue" }}>NSDL Status</th>
                  <th style={{ background: "skyblue" }}>DGDC Status</th>
                  <th style={{ background: "skyblue" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {getsubimportdata.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.sirNo}</td>
                    <td>{formatDateTime(data.sirDate)}</td>
                    <td>{data.requestId}</td>
                    <td>{data.exporter}</td>
                    <td>{data.nop}</td>
                    <td>{formatDateTime(data.reentryDate)}</td>
                    <td>{data.netWeight}({data.netWeightUnit})</td>
                    <td>{data.nsdlStatus}</td>
                    <td>{data.dgdcStatus}</td>
                    <td className="text-center" >
                      <DropdownButton
                        title={<FontAwesomeIcon icon={faFileLines} style={{ marginRight: '5px', color: 'gray', width: '20px', height: '20px' }} />}
                        style={{ float: 'right', background: 'none' }}
                        variant="none"
                      >
                        <Dropdown.Item onClick={() => openModalforHistory(data)} >View History</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModalforreqidUpdate(data)}>Modify</Dropdown.Item>
                        <Dropdown.Item >Print SIR Tag</Dropdown.Item>
                        <Dropdown.Item >Impose Penalty</Dropdown.Item>
                        <Dropdown.Item >Delivery Update</Dropdown.Item>

                      </DropdownButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </CardBody>
        </Card>
      </div >
      {/* For Add requestId model */}
      <Modal Modal isOpen={isModalOpen} onClose={closeModalforReqid} toggle={closeModalforReqid} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforReqid} style={{ backgroundColor: 'skyblue' }}>
          Subcontract Import Entry
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={9}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Request Id</Label>
                <Input
                  type="text"
                  name="branchname"
                  id="branchname"
                  onChange={handlereqid}
                  maxLength={30}
                  className="inputField"
                />
              </FormGroup>
            </Col>
            <Col style={{ marginTop: '30px' }}>
              <Button variant="danger" onClick={toggleDivVisibility}>
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                SEARCH
              </Button>
            </Col>
          </Row>
          {isDivVisible && lowerInputReqId && (
            <div style={{ backgroundColor: "#F8F8F8" }}>
              <hr />
              <form >
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Request Id</Label>
                      <Input
                        type="text"
                        name="requestId"
                        id="branchname"
                        className="inputField"
                        onChange={handleInputChange}
                        maxLength={30}
                        value={data.requestId}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Import Type</Label>
                      <Input
                        type="text"
                        name="importType"
                        id="branchname"
                        className="inputField"
                        onChange={handleInputChange}
                        maxLength={20}
                        value={data.importType}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <FormGroup>
                      <Label for="search" className="forlabel">Select Exporter</Label>
                      <select
                        id="hold"
                        className="form-control form-select"
                        onChange={handleInputChange}
                        required
                        name="exporter"
                        value={data.exporter}
                      >
                        <option value="">Select exporter</option>
                        {partys.map((data, index) => (
                          <option key={index} >{data.partyName}</option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Challan No</Label>
                      <Input
                        type="text"
                        name="challanNo"
                        id="branchname"
                        maxLength={30}
                        onChange={handleInputChange}
                        className="inputField"
                        value={data.challanNo}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Challan Date</Label>
                      <Input
                        type="date"
                        name="challanDate"
                        id="status"
                        onChange={handleInputChange}
                        className="inputField"
                        value={data.challanDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Invoice No</Label>
                      <Input
                        type="text"
                        name="invoiceNo"
                        id="branchname"
                        onChange={handleInputChange}
                        maxLength={30}
                        className="inputField"
                        value={data.invoiceNo}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Invoice Date</Label>
                      <Input
                        type="date"
                        name="invoiceDate"
                        id="status"
                        onChange={handleInputChange}
                        className="inputField"
                        value={data.invoiceDate}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">No of packages</Label>
                      <Input
                        type="text"
                        name="nop"
                        onChange={handleInputChange}
                        id="branchname"
                        className="inputField"
                        value={data.nop}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Net weight</Label>
                      <Input
                        type="text"
                        name="netWeight"
                        id="branchname"
                        onChange={handleInputChange}
                        className="inputField"
                        maxLength={15}
                        value={data.netWeight}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Net weight unit</Label>
                      <Input
                        type="text"
                        name="netWeightUnit"
                        id="branchname"
                        onChange={handleInputChange}
                        maxLength={20}
                        className="inputField"
                        value={data.netWeightUnit}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Product value</Label>
                      <Input
                        type="text"
                        name="productValue"
                        id="branchname"
                        onChange={handleInputChange}
                        maxLength={15}
                        className="inputField"
                        value={data.productValue}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Currency</Label>
                      <Input
                        type="text"
                        name="currency"
                        id="branchname"
                        onChange={handleInputChange}
                        className="inputField"
                        maxLength={15}
                        value={data.currency}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Remarks</Label>
                      <Input
                        type="textarea"
                        name="remarks"
                        id="branchname"
                        onChange={handleInputChange}
                        maxLength={255}
                        className="inputField"
                        value={data.remarks}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Button onClick={handleSubmit} variant="danger">
                      <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                      SUBMIT
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          )}
        </ModalBody>
      </Modal >




      {/* For Update requestId model */}
      <Modal Modal isOpen={isModalOpenforupdate} onClose={closeModalforReqidforupdate} toggle={closeModalforReqidforupdate} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforReqidforupdate} style={{ backgroundColor: 'skyblue' }}>
          Modify Subcontract Import Details
        </ModalHeader>
        <ModalBody>
          <div style={{ backgroundColor: "#F8F8F8" }}>
            <hr />
            <form >
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Request Id</Label>
                    <Input
                      type="text"
                      name="requestId"
                      id="branchname"
                      readOnly
                      className="inputField"
                      onChange={handleUpdateInputChange}
                      maxLength={30}
                      value={updatedata.requestId}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Import Type</Label>
                    <Input
                      type="text"
                      name="importType"
                      id="branchname"
                      className="inputField"
                      maxLength={20}
                      onChange={handleUpdateInputChange}
                      value={updatedata.importType}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col >

                  <FormGroup>
                    <Label for="search" className="forlabel">Select Exporter</Label>
                    <select
                      id="hold"
                      className="form-control form-select"
                      onChange={handleUpdateInputChange}
                      required
                      name="exporter"
                      
                      value={updatedata.exporter}
                    >

                      {partys.map((data, index) => (
                        <option value="">Select exporter</option>,
                        <option key={index} >{data.partyName}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Challan No</Label>
                    <Input
                      type="text"
                      name="challanNo"
                      id="branchname"
                      onChange={handleUpdateInputChange}
                      className="inputField"
                      maxLength={30}
                      value={updatedata.challanNo}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Challan Date</Label>
                    <Input
                      type="date"
                      name="challanDate"
                      id="status"
                      onChange={handleUpdateInputChange} // Pass the date directly to the function
                      className=""
                      value={formattedChallanDate}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Invoice No</Label>
                    <Input
                      type="text"
                      name="invoiceNo"
                      maxLength={30}
                      id="branchname"
                      onChange={handleUpdateInputChange}
                      className="inputField"
                      value={updatedata.invoiceNo}

                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Invoice Date</Label>
                    <Input
                      type="date"
                      name="invoiceDate"
                      id="status"
                      onChange={handleUpdateInputChange} // Pass the date directly to the function
                      className=""
                      value={formattedInvoiceDate}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">No of packages</Label>
                    <Input
                      type="text"
                      name="nop"
                      onChange={handleUpdateInputChange}
                      id="branchname"
                      className="inputField"

                      value={updatedata.nop}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Net weight</Label>
                    <Input
                      type="text"
                      name="netWeight"
                      id="branchname"
                      onChange={handleUpdateInputChange}
                      maxLength={15}
                      className="inputField"
                      value={updatedata.netWeight}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Net weight unit</Label>
                    <Input
                      type="text"
                      name="netWeightUnit"
                      id="branchname"
                      maxLength={20}
                      onChange={handleUpdateInputChange}
                      className="inputField"
                      value={updatedata.netWeightUnit}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Product value</Label>
                    <Input
                      type="text"
                      name="productValue"
                      id="branchname"
                      onChange={handleUpdateInputChange}
                      maxLength={15}
                      className="inputField"
                      value={updatedata.productValue}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Currency</Label>
                    <Input
                      type="text"
                      name="currency"
                      id="branchname"
                      onChange={handleUpdateInputChange}
                      maxLength={15}
                      className="inputField"
                      value={updatedata.currency}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Remarks</Label>
                    <Input
                      type="textarea"
                      name="remarks"
                      id="branchname"
                      onChange={handleUpdateInputChange}
                      className="inputField"
                      maxLength={255}
                      value={updatedata.remarks}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button onClick={handleUpdateSubmit} variant="danger">
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </ModalBody>
      </Modal >




      {/* For Update requestId model */}
      <Modal Modal isOpen={isModalOpenforhistory} onClose={closeModelforHistory} toggle={closeModelforHistory} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModelforHistory} style={{ backgroundColor: 'skyblue' }}>
          View Subcontract History
        </ModalHeader>
        <ModalBody>
          <div style={{ backgroundColor: "#F8F8F8" }}>
            <hr />
            <form >
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Request Id</Label>
                    <Input
                      type="text"
                      name="requestId"
                      id="branchname"
                      readOnly
                      className="inputField"
                      value={impsubhistory.requestId}

                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Unit Name</Label>
                    <Input
                      type="text"
                      name="importType"
                      id="branchname"
                      className="inputField"
                      value={impsubhistory.exporter}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{ background: "skyblue" }}>Type</th>
                      <th style={{ background: "skyblue" }}>SIR No.</th>
                      <th style={{ background: "skyblue" }}>SIR Date</th>
                      <th style={{ background: "skyblue" }}>No. of Packages</th>
                      <th style={{ background: "skyblue" }}>Passed-In Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                
                      <tr >
                        <td>{impsubhistory.importType}</td>
                        <td>{impsubhistory.sirNo}</td>
                        <td>{formatDateTime(impsubhistory.sirDate)}</td>
                        <td>{impsubhistory.nop}</td>
                        <td>{impsubhistory.netWeight}({impsubhistory.netWeightUnit})</td>
                      </tr>


                 

                  </tbody>

                </Table>
              </Row>
              <Row>
                <Col>
                <FormGroup>
                    <Label className="forlabel" for="branchId">Net Pending Quantity</Label>
                    <Input
                      type="text"
                      name="importType"
                      id="branchname"
                      className="inputField"
                      value={-impsubhistory.netWeight}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col className="text-center">
                  <Button onClick={closeModelforHistory} variant="danger">
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                    OK
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </ModalBody>
      </Modal >

    </>
  );
}