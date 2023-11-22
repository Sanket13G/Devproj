import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import '../Components/Style.css';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import { animateScroll as scroll } from "react-scroll";
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-bootstrap/Pagination';


export default function Rate_chart() {
  const [errors, setErrors] = useState({});
  const [cfsTariffNo, setCfsTariffNo] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [cfsDocRefNo, setcfsDocRefNo] = useState('');
  const [partyId, setpartyId] = useState('');
  const [party_Name, setparty_Name] = useState('');
  const [approvedDate, setapprovedDate] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedBy, setEditedBy] = useState('');
  const [cfsValidateDate, setcfsValidateDate] = useState('');
  const [cfsTariffDate, setcfsTariffDate] = useState('');
  const [status, setstatus] = useState('');
  const [comments, setComments] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [serviceUnit, setServiceUnit] = useState('');
  const [serviceUnit1, setServiceUnit1] = useState('');
  const [typeOfCharges, setTypeOfCharges] = useState('N');
  const [Alltarrifs, setAllTarrifs] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [cargoMovement, setcargoMovement] = useState('');
  const [cfstarrifServices, setcfstarrifServices] = useState([]);
  const [taxApplicable, seTtaxApplicable] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [negotiable, setNegotiable] = useState('');
  const [commodity, setcommodity] = useState('');
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [cfsAmndNo, setcfsAmndNo] = useState('');
  const { trfno } = useParams();
  const [CreatedUser, setCreatedUser] = useState('');
  const [approvedUser, setApprovedUser] = useState('');


  const {
    userId,
    username,
    branchId,
    companyid,

  } = useContext(AuthContext);


  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the array of services to display only the current page's items
  const currentfilteredImports = Alltarrifs.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination items
  const paginationItems = [];
  for (let number = 1; number <= Math.ceil(Alltarrifs.length / itemsPerPage); number++) {
      paginationItems.push(
          <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
              {number}
          </Pagination.Item>
      );
  }




  const getCreatedUser = (id3,companyid,branchid) => {
    Rate_Chart_Service.getUserbyUserId(id3,companyid,branchId).then((res) => {
      setCreatedUser(res.data.user_Name);
      // alert(CreatedUser);
    })
  };

  const getApprovedUser = (id2,companyid,branchid) => {
    if (id2) {
      Rate_Chart_Service.getUserbyUserId(id2,companyid,branchId).then((res) => {
        setApprovedUser(res.data.user_Name);
      })
    };
  };





  const Tarrifs =
  {
    cfsTariffNo, cfsDocRefNo, partyId, party_Name, cfsValidateDate, serviceId, cfsAmndNo, commodity,
    status, comments, taxApplicable, typeOfCharges, cargoMovement, cfsTariffDate,
    createdDate, editedDate, createdBy, editedBy, approvedBy, approvedDate, companyId, branchId
  }





  const handleDateChange = (date) => {
    setcfsValidateDate(date);
  };

  const today = new Date(); // Today's date
  today.setHours(14, 0, 0, 0); // Set time to 2:00 PM

  const formatDate2 = (value) => {

    if (!value) {
      return ""; // Return an empty string if value is empty or undefined
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const DeleteServicesOfTarrifs = (comp,branch,tno,amnd, sid, type) => {
    if (type === 'Plain') {
      //Delete from cfstrfsrv

      Rate_Chart_Service.deletecfssrvTarrif(comp,branch,tno,amnd,sid).then((res) => {
        findByTarrifNoServices(companyId,branchId,tno);
        toast.error('Record Deleted Successfully !', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 700,
        });
      })
    }
    else {
      // Delete From cfstrfrng
      Rate_Chart_Service.deletecfsrangeTarrif(comp,branch,tno,amnd,sid).then((res) => {
        findByTarrifNoServices(companyId,branchId,tno);
        toast.error('Record Deleted Successfully !', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 700,
        });
      })
    }

  };


  useEffect(() => {
    setCompanyId(companyid);
    getCFSTArrifs(companyid,branchId);
    if (trfno) {
      getCFSTarrifById(companyid,branchId,trfno)
      findByTarrifNoServices(trfno);
    }

  }, [])

  const findupdatedparties = async (allTarrifsData) => {
    const partyIds = allTarrifsData.map(tariff => tariff.partyId);
    try {
      const partyResponse = await Rate_Chart_Service.getParties(partyIds);
      const partyOptions = partyResponse.data.map(party => ({
        value: party.partyId,
        label: party.partyName
      }));
      setParties(partyOptions);
    } catch (error) {
      console.error("Error loading party data:", error);
    }
  };



  const handlePartyChange = selectedOption => {
    setSelectedParty(selectedOption);
    console.warn(selectedOption);
    setparty_Name(selectedOption ? selectedOption.label : '');
    setpartyId(selectedOption ? selectedOption.value : '');
  };

  // Taking Current values








  const findByTarrifNoServices = async (companyid,branchId,tarrifno) => {



    Rate_Chart_Service.getCombinedServicesSingleTarrifNo(companyid, branchId, tarrifno).then((res) => {
      console.log("Combine");
      console.warn(res.data);
      setcfstarrifServices(res.data);
    });

  }


  const makeFieldsEmpty = async () => {
    setCfsTariffNo('');
    setcfsDocRefNo('');
    setcfsValidateDate('');
    setcfsTariffDate('');
    setComments('');
    setstatus('');
    setCreatedBy('');
    setApprovedBy('');
    setCreatedDate('')
    setEditedDate('');
    setNegotiable('');
    setErrors('');
    setServiceId('');
    setServiceUnit('');
    setServiceUnit1('');
    seTtaxApplicable('');
    setTypeOfCharges('');
    setpartyId('');
    setEditedBy('');
    setEditedDate('');
    setparty_Name('');
    setcfsAmndNo('');
    setcfstarrifServices([]);
    setCreatedUser('');
    setApprovedUser('');
  }


  const getCFSTArrifs = async (companyId,branchId) => {
    try {
      const response = await Rate_Chart_Service.getAllTarrifs(companyId,branchId);
      const allTarrifsData = response.data;
      setAllTarrifs(allTarrifsData);

      // Call findupdatedparties if Alltarrifs data is available
      // if (allTarrifsData.length > 0) {
      findupdatedparties(allTarrifsData);
      // }
    } catch (error) {
      console.error("Error loading tariff data:", error);
    }
  };


  const getCFSTarrifById = async (compid,branchId,cfsTariff) => {


    Rate_Chart_Service.getCFSTarrifById(compid,branchId,cfsTariff).then((res) => {
      // console.log(res.data);
      setcfsTariffDate(res.data.cfsTariffDate);
      setcfsValidateDate(new Date(res.data.cfsValidateDate));
      setCfsTariffNo(res.data.cfsTariffNo);
      setcfsDocRefNo(res.data.cfsDocRefNo);
      setComments(res.data.comments);
      setstatus(res.data.status);

      setCreatedBy(res.data.createdBy);
      getCreatedUser(res.data.createdBy,companyid,branchId);

      setApprovedBy(res.data.approvedBy);
      getApprovedUser(res.data.approvedBy,companyid,branchId);

      setEditedBy(res.data.editedBy);
      setEditedDate(res.data.editedDate);
      setCreatedDate(res.data.createdDate)
      setEditedDate(res.data.editedDate);
      setapprovedDate(res.data.approvedDate);
      setNegotiable(res.data.negotiable);
      seTtaxApplicable(res.data.taxApplicable);
      setTypeOfCharges(res.data.typeOfCharges);
      setpartyId(res.data.partyId);
      setCompanyId(res.data.companyId);
      setcfsAmndNo(res.data.cfsAmndNo)
      setparty_Name(res.data.party_Name)

      findByTarrifNoServices(res.data.companyId,res.data.branchId,res.data.cfsTariffNo,);



      scroll.scrollTo("targetSection", {
        smooth: true,
        duration: 0,
        offset: -50, // Adjust the scroll offset if needed
      });
    })
  };



  const handleValidation = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate serviceShortDescription
    if (!cfsDocRefNo) {
      formIsValid = false;
      newErrors['cfsDocRefNo'] = 'cfsDocRefNo is required.';

    }

    // Validate serviceUnit
    if (!party_Name) {
      formIsValid = false;
      newErrors['party_Name'] = 'party_Name is required.';

    }

    // Validate serviceType
    if (!cfsValidateDate) {
      formIsValid = false;
      newErrors['cfsValidateDate'] = 'cfsValidateDate is required.';

    }

    setErrors(newErrors);
    return formIsValid;
  };

  const UpdateTarrifStatus = async (e) => {
    const isFormValid = handleValidation();
    if (isFormValid) {
      Rate_Chart_Service.updateTarrifStatus(companyid, branchId, userId, cfsTariffNo, Tarrifs).then((res) => {
        getCFSTarrifById(res.data.companyId,res.data.branchId,res.data.cfsTariffNo);
        getCFSTArrifs(res.data.companyId,res.data.branchId);
      })
    } else {
      toast.error('Oops something went wrong !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 700,
      });
    }
  }


  const addCfsTarrif = async (e) => {
    const addedTarrif = await Rate_Chart_Service.addTarrif(companyid, branchId, userId, Tarrifs);
    getCFSTarrifById(addedTarrif.data.companyId,addedTarrif.data.branchId,addedTarrif.data.cfsTariffNo);
    getCFSTArrifs(addedTarrif.data.companyId,addedTarrif.data.branchId);
  }


  const UpdateCfsTarrif = async (e) => {
    Rate_Chart_Service.updateTarrif(companyid, branchId, userId, cfsTariffNo, Tarrifs).then((res) => {
      getCFSTarrifById(res.data.companyId,res.data.branchId,res.data.cfsTariffNo);
      getCFSTArrifs(res.data.companyId,res.data.branchId);
    })


  }

  const SaveOrUpdate = async (e) => {
    const isFormValid = handleValidation();
    if (isFormValid) {

      // console.log(Tarrifs);
      if (cfsTariffNo) {
        // Update
        UpdateCfsTarrif();
      }
      else {
        // Add
        addCfsTarrif();
      }
    }
    else {
      toast.error('Oops something went wrong !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 700,
      });
    }
  }
  const [isServiceModalOpen, setisServiceModalOpen] = useState(false);
  const openServiceModel = () => {

    const isFormValid = handleValidation();
    if (isFormValid) {
      setisServiceModalOpen(true);
    }
    else {

      toast.error('Oops something went wrong !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 700,
      });
    }
  }

  const closeServiceModal = () => {
    setisServiceModalOpen(false);
  };

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <h5 style={{ backgroundColor: '' }} className="pageHead" >Warehouse Standard Tarrifs</h5>
      <Card style={{ backgroundColor: "#F8F8F8" }}>

        <CardBody>

          {/* 1st */}
          <Row>
            <Col>
              <Row>
                <Col md={8}>

                  <FormGroup>
                    <Label className="forlabel" for="branchId">Tarrif Id</Label>
                    <Input
                      type="text" name="cfsTariffNo"
                      id='service' readOnly
                      className="form-control"
                      value={cfsTariffNo}
                    />
                  </FormGroup>


                </Col>

                <Col md={4}>

                  <FormGroup>
                    {/* <Label className="forlabel" for="branchId">Tarrif Id</Label> */}
                    <Input
                      type="text" name="cfsAmndNo"
                      style={{ marginTop: '32px' }}
                      id='service' readOnly
                      value={cfsAmndNo}
                      onChange={(e) => setcfsAmndNo(e.target.value)}
                    />
                  </FormGroup>

                </Col>

              </Row>

            </Col>

            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Tarrif Date</Label>
                <Input
                  type="text"
                  id="service"
                  readOnly
                  name="cfsTariffDate"
                  className="form-control"
                  value={formatDate2(cfsTariffDate)}
                  onChange={(e) => setcfsTariffDate(e.target.value)}
                />
              </FormGroup>
            </Col>



            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Status</Label>
                <Input
                  type="text" name="status"
                  id='service' readOnly
                  className="form-control"
                  value={status === "A" ? "Approved" : status === "U" ? "Edit" : status === "N" ? "New" : " "}
                  onChange={(e) => setstatus(e.target.value)}
                />
              </FormGroup>
            </Col>


          </Row>

          {/* 2nd */}

          <Row>
            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Document Number</Label>
                <Input
                  type="text" name="cfsDocRefNo"
                  className="form-control"
                  onChange={(e) => setcfsDocRefNo(e.target.value)}
                  value={cfsDocRefNo}
                  style={{ borderColor: errors.cfsDocRefNo ? '#f52b2b' : '' }}
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Validity</Label>
                <div className="input-group"> {/* Wrap in an input group */}
                  <DatePicker
                    selected={cfsValidateDate}
                    onChange={handleDateChange}
                    minDate={today}
                    dateFormat="dd/MM/yyyy"
                    value={cfsValidateDate} // Set the value from the database
                    className="form-control"
                    customInput={<input style={{ width: '25vw', borderColor: errors.cfsValidateDate ? '#f52b2b' : '' }} />}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Created By</Label>
                <Input
                  type="text" name="createdBy"
                  id='service' readOnly
                  className="form-control"
                  value={CreatedUser}
                />
              </FormGroup>
            </Col>

          </Row>

          {/* 3rd */}


          <Row>
            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Party</Label>
                <Select
                  options={parties}
                  value={{ value: party_Name, label: party_Name }}
                  onChange={handlePartyChange}
                  isClearable
                  isDisabled={cfsTariffNo}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: errors.party ? '#f52b2b' : '',
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      boxShadow: 'none',
                      '&:hover': {
                        border: '1px solid #ccc'
                      }
                    }),
                    indicatorSeparator: () => ({
                      display: 'none'
                    }),
                    dropdownIndicator: () => ({
                      display: 'none'
                    })
                  }}
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Comments</Label>
                <textarea className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="2" name="Comments"
                  onChange={(e) => setComments(e.target.value)}
                  value={comments}
                >
                </textarea>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Approved By</Label>
                <Input
                  id='service' readOnly
                  className="form-control"
                  value={approvedUser}
                />
              </FormGroup>
            </Col>

          </Row>

          <div className="text-center mt-4">
            {/* <Link
              className={`btn ${cfsTariffNo ? 'btn-outline-primary' : 'btn-disabled'}`}
              to={cfsTariffNo ? `/parent/rate-chart-services/${cfsTariffNo}` : ''}
              style={{ marginRight: 10 }}
            >
              Add Service
            </Link> */}


            <Link
              // className="btn  gap-2   btn-outline-danger link"
              className={`btn ${cfsTariffNo ? 'btn-outline-danger link gap-2' : 'btn-disabled'}`}
              style={{ marginRight: 10 }}
              to={cfsTariffNo ? `/parent/rate-chart-services/${cfsTariffNo}` : ''}
            ><FontAwesomeIcon icon={faAdd} style={{ marginRight: '5px' }} />
              ADD SERVICE
            </Link>

            {/* <Button variant="outline-primary" className='btnwidth' style={{ marginRight: 10 }}
              onClick={(e) => SaveOrUpdate(e)}
            >Save</Button>
            <Button variant="outline-primary" className='btnwidth'
              onClick={(e) => UpdateTarrifStatus(e)}
            >Submit</Button>
            <Button variant="outline-primary" style={{ marginLeft: 10 }}
              onClick={(e) => makeFieldsEmpty(e)}
            >Clear</Button>
            <Button variant="outline-info" style={{ marginLeft: 10 }}
            >Ammend</Button> */}

            <button
              type="button"
              className="btn gap-2 widthbtn btn-outline-danger"
              style={{ marginRight: 10 }}
              onClick={(e) => SaveOrUpdate(e)}
            > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
              SAVE
            </button>
            <button
              type="button"
              className="btn gap-2 widthbtn  btn-outline-danger"
              style={{ marginRight: 10 }}
              onClick={(e) => UpdateTarrifStatus(e)}
            > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
              SUBMIT
            </button>
            <button
              type="button"
              className="btn gap-2 widthbtn  btn-outline-danger"
              style={{ marginRight: 10 }}
              onClick={(e) => makeFieldsEmpty(e)}
            > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
              CLEAR
            </button>

            <button
              type="button"
              className="btn gap-2   btn-outline-danger"
            // style={{ width: '100%' }}

            > <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
              AMMEND
            </button>






          </div>




          {cfstarrifServices.length > 0 && (
            // <div className="card mt-3">
            <div className="mt-3">
              <h4 className="text-center">Warehouse Standard Services</h4>
              <hr />
              <div className="table-responsive">
                <Table className="table table-bordered custom-table">
                  <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                    <tr className="text-center">
                      <th scope="col">Service Id</th>
                      <th scope="col">Service</th>
                      <th scope="col">Tax Applicable</th>
                      <th scope="col">Range</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cfstarrifServices.map((servicemaster, index) =>

                        <tr key={index} className="text-center">
                          <td className="table-column">{servicemaster[1]}</td>
                          <td className="table-column">{servicemaster[3]}</td>
                          <td className="table-column">{servicemaster[2] === 'Y' ? "Yes" : "No"}</td>
                          <td className="table-column">{servicemaster[4]}</td>
                          <td className="table-column">{servicemaster[5] || "00.00"}</td>
                          <td className="table-column">
                            <div className="d-flex justify-content-center" >
                              {/* <Link style={{ flex: 1, maxWidth: '45%', marginRight: 5 }} className="btn btn-outline-primary"
                                to={`/parent/rate-chart-services/${servicemaster[0]}/${servicemaster[1]}/${servicemaster[4]}/${servicemaster[6]}`}>Edit</Link> */}
                              {/* <Button style={{ flex: 1, maxWidth: '45%', marginLeft: 5 }} variant="outline-danger" onClick={(e) => DeleteServicesOfTarrifs(servicemaster[0], servicemaster[1], servicemaster[4])}>Delete</Button> */}

                              {/* <button
                                type="button"
                                className="btn gap-2  btn-outline-danger"
                                onClick={(e) => DeleteServicesOfTarrifs(servicemaster[0], servicemaster[1], servicemaster[4])}
                              > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                EDIT
                              </button> */}


                              <Link
                                className="btn gap-2  btn-outline-danger link"
                                style={{ flex: 1, maxWidth: '40%', marginRight: 5 }}
                                to={`/parent/rate-chart-services/${servicemaster[0]}/${servicemaster[1]}/${servicemaster[4]}/${servicemaster[6]}`}
                              ><FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                                EDIT
                              </Link>

                              <button
                                type="button"
                                className="btn gap-2 widthbtn btn-outline-danger"
                                style={{ flex: 1, maxWidth: '40%', marginLeft: 5 }}
                                onClick={(e) => DeleteServicesOfTarrifs(companyid,branchId,servicemaster[0],servicemaster[6] ,servicemaster[1], servicemaster[4])}
                              > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                DELETE
                              </button>
                            </div>
                          </td>
                        </tr>

                      )
                    }

                  </tbody>
                </Table>
              </div>
            </div>


          )}

          <h4 className="text-center">Warehouse Standard Tarrifs</h4>
          <hr />
          <div className="table-responsive">
            <Table className="table table-bordered custom-table">
              <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                <tr className="text-center">
                  <th scope="col">Tarrif No.</th>
                  <th scope="col">Doc No.</th>
                  <th scope="col">Party Name</th>
                  <th scope="col">Tarrif Date</th>
                  <th scope="col">Validate Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>

                {currentfilteredImports.map((service, index) =>

                  <tr className="text-center">
                    <td className="table-column">{service.cfsTariffNo}</td>
                    <td className="table-column">{service.cfsDocRefNo}</td>
                    <td className="table-column">{service.party_Name}</td>
                    <td className="table-column">{formatDate2(service.cfsTariffDate)}</td>
                    <td className="table-column">{formatDate2(service.cfsValidateDate)}</td>
                    <td className="table-column">
                      {service.status === "A"
                        ? "Approved"
                        : service.status === "U"
                          ? "Edit"
                          : service.status === "N"
                            ? "New"
                            : service.status === "D"
                              ? "Deleted"
                              : ""}
                    </td>
                    <td className="table-column">
                      <div className="d-flex justify-content-center">


                        <button
                          type="button"
                          className="btn gap-2  btn-outline-danger"
                          style={{ width: '100%' }}
                          onClick={(e) => getCFSTarrifById(service.companyId,service.branchId,service.cfsTariffNo)}
                        > <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                          EDIT
                        </button>


                        {/* <Button
                          style={{ flex: 1 }}
                          variant="outline-primary"
                          onClick={(e) => getCFSTarrifById(service.cfsTariffNo)}
                        >
                          Edit
                        </Button> */}

                      </div>
                    </td>
                  </tr>
                )
                }
              </tbody>
            </Table>
            <div className="text-center">
                        {/* Pagination */}
                        <Pagination>{paginationItems}</Pagination>
                   
            </div>
          </div>



        </CardBody>




      </Card>
    </>
  );
}