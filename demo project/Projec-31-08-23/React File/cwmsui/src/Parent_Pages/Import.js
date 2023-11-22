import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "../Components/Style.css";
import { Button, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from 'react-bootstrap/Pagination';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Import_Model from "./Import_Model";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faCog, faCheck } from '@fortawesome/free-solid-svg-icons';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";

function Import(props) {
  const [Datefrom, setDatefrom] = useState(new Date());
  const [dateto, setDateto] = useState(new Date());
  const [AllImports, setAllImports] = useState([]);
  const [DgdcStatusArray, setDgdcStatusArray] = useState([]);
  const [DGDC_Status, setDGDC_Status] = useState('');
  const [hold, setHold] = useState('');
  const [Personal_Carriage, setPersonal_Carriage] = useState('');
  const [Special_Carting, setSpecial_Carting] = useState('');
  const [Forwarded, setForwarded] = useState('');
  const [Heavy, setHeavy] = useState('');
  const [ImportsHistory, setImportsHistory] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredImports, setFilteredImports] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [partyNames, setPartyNames] = useState({});
  const [selectedDGDCStatus, setSelectedDGDCStatus] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the array of services to display only the current page's items
  const currentfilteredImports = filteredImports.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination items
  const paginationItems = [];
  for (let number = 1; number <= Math.ceil(filteredImports.length / itemsPerPage); number++) {
      paginationItems.push(
          <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
              {number}
          </Pagination.Item>
      );
  }




  // const handleStatusChange = (selectedOption) => {
  //   setSelectedDGDCStatus(selectedOption ? selectedOption.value : null);
  // };

  useEffect(() => {
    Rate_Chart_Service.getAllParties().then((res) => {
      const namesMap = {};
      res.data.forEach(party => {
        namesMap[party.partyId] = party.partyName;
      });
      setPartyNames(namesMap);
    });
  }, [])


  const handleShow = (comp, branch, sir) => {

    getHistoryBySIRNo(comp, branch, sir);
    setShowModal(true);
  };


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

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };


  const getHistoryBySIRNo = (comp, branch, sir) => {
    Rate_Chart_Service.getHistoryBySIRNo(comp, branch, sir).then((res) => {
      setImportsHistory(res.data);
     
    })
  }

  const {
    userId,
    username,
    branchId,
    companyid,

  } = useContext(AuthContext);

  useEffect(() => {
    const matchedResults = AllImports.filter((import2) =>
      import2.sirNo.toLowerCase().includes(searchValue.toLowerCase())
    );

    const unmatchedResults = AllImports.filter(
      (import2) => !import2.sirNo.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredImports([...matchedResults, ...unmatchedResults]);
    setHighlightedIndex(-1); // Reset highlighted index when search value changes
  }, [searchValue, AllImports]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleRowClick = (index) => {
    setHighlightedIndex(index);
  };



  const staticOptions = [
    { label: 'No', value: 'Option 1' },
    { label: 'Yes', value: 'Option 2' },
  ];

  const staticOptions2 = [
    { label: 'No', value: 'Option 1' },
    { label: 'Yes', value: 'Option 2' },
    { label: 'Received', value: 'Option 3' },
  ];

  const handleHold = selectedOption => {
    setHold(selectedOption ? selectedOption.label : '');
  }

  const handleCarriage = selectedOption => {
    setPersonal_Carriage(selectedOption ? selectedOption.label : '');
  }
  const handleCarting = selectedOption => {
    setSpecial_Carting(selectedOption ? selectedOption.label : '');
  }
  const handleForwarded = selectedOption => {
    setForwarded(selectedOption ? selectedOption.label : '');
  }

  const handleHeavyChange = selectedOption => {
    setHeavy(selectedOption ? selectedOption.label : '');
  }

  const findDgdcStatus = async () => {
    const PCKTYPEResponse = await Rate_Chart_Service.getjarsByJarId('J00009',companyid);
    const partyOptions = PCKTYPEResponse.data.map(jar => ({
      value: jar.jarId,
      label: jar.jarDtlDesc
    }));
    setDgdcStatusArray(partyOptions);
  };
  const handleStatusChange = selectedOption => {
    // setSelectedParty(selectedOption);
    // console.warn(selectedOption);
    setDGDC_Status(selectedOption ? selectedOption.label : '');
console.log(selectedOption.label);
    const filteredRecords = AllImports.filter(record => record.dgdc_Status === selectedOption.label);
    setFilteredImports(filteredRecords);
    // setImporterId(selectedOption ? selectedOption.value : '');
  };

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


  const handleDateFrom = (date) => {
    setDatefrom(date);
  };
  const handleDateto = (date) => {
    setDateto(date);
  };
  useEffect(() => {

    getAllImports(companyid,branchId);
    findDgdcStatus();
  }, [])


  const getAllImports = (compId,branchId) => {
    Rate_Chart_Service.getAllImports(compId,branchId).then((res) => {
      setAllImports(res.data);
      setFilteredImports(res.data);
    })
  }
  const navigate = useNavigate();
  const handleOptionButtonClick = (click) => {
    if (click == 'add-new') {
      navigate(
        "/parent/import/add-new"
      );
    }

  }

  return (
    <>


      <h5 style={{ backgroundColor: '' }} className="pageHead" >Add New Import</h5>
      <Card style={{ backgroundColor: "#F8F8F8" }}>
        {/* <div className="row"> */}
        <div className="col-11"><h3 className="text-center"></h3></div>

        {/* <div className="col-1"> */}


        <div className="d-flex justify-content-end" >
          <div className="btn-group">

            <button
              type="button"
              className="btn btn-danger dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Action
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleOptionButtonClick("add-new")}
                >
                  Add New
                </button>
              </li>

            </ul>
          </div>
        </div>
        {/* </div> */}

        {/* </div> */}


        <hr />

        <CardBody>

          <Row>

            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Search By</Label>
                <Input
                  type="text" name="SearchBy"
                  className="form-control inputField"
                  onChange={handleSearchChange}
                  value={searchValue}
                />
              </FormGroup>

            </Col>

            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Date From</Label>
                <div className="input-group"> {/* Wrap in an input group */}
                  <DatePicker
                    selected={Datefrom}
                    onChange={handleDateFrom}
                    dateFormat="dd/MM/yyyy"
                    value={Datefrom}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '24vw' }} />}

                  />

                </div>
              </FormGroup>
            </Col>


            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Date To</Label>
                <div className="input-group"> {/* Wrap in an input group */}
                  <DatePicker
                    selected={dateto}
                    onChange={handleDateto}
                    dateFormat="dd/MM/yyyy"
                    value={dateto}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '24vw' }} />}
                  />

                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>

              <FormGroup>
                <Label className="forlabel" for="branchId">Hold</Label>

                <Select
                  options={staticOptions2}
                  value={{ value: hold, label: hold }}
                  onChange={handleHold}
                  isClearable

                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      // borderColor: errors.consoleName ? '#f52b2b' : '',
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
                <Label className="forlabel" for="branchId">Personal Carriage</Label>

                <Select
                  options={staticOptions}
                  value={{ value: Personal_Carriage, label: Personal_Carriage }}
                  onChange={handleCarriage}
                  isClearable

                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      // borderColor: errors.consoleName ? '#f52b2b' : '',
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
                <Label className="forlabel" for="branchId">Special Carting</Label>

                <Select
                  options={staticOptions}
                  value={{ value: Special_Carting, label: Special_Carting }}
                  onChange={handleCarting}
                  isClearable

                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      // borderColor: errors.consoleName ? '#f52b2b' : '',
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


              </FormGroup></Col>
          </Row>


          <Row>
            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Forwarded</Label>

                <Select
                  options={staticOptions}
                  value={{ value: Forwarded, label: Forwarded }}
                  onChange={handleForwarded}
                  isClearable

                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      // borderColor: errors.consoleName ? '#f52b2b' : '',
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


              </FormGroup></Col>


            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">Heavy</Label>

                <Select
                  options={staticOptions}
                  value={{ value: Heavy, label: Heavy }}
                  onChange={handleHeavyChange}
                  isClearable

                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      // borderColor: errors.consoleName ? '#f52b2b' : '',
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


              </FormGroup></Col>



            <Col>
              <FormGroup>
                <Label className="forlabel" for="branchId">DGDC Status</Label>

                <Select
                  options={DgdcStatusArray}
                  value={{ value: DGDC_Status, label: DGDC_Status }}
                  onChange={handleStatusChange}
                  isClearable

                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      // borderColor: errors.consoleName ? '#f52b2b' : '',
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


              </FormGroup></Col>


          </Row>

          <div className="text-center mt-1 mb-1">
            <button
              type="button"
              className="btn me-md-2 widthbtn  btn-outline-danger"
            ><FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
              SEARCH
            </button>

            <button
              type="button"
              className="btn gap-2 widthbtn btn-outline-danger"
            > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
              RESET
            </button>
          </div>


          {filteredImports.length > 0 && (
            <div className="table-responsive">
              <Table className="table table-bordered custom-table">
                <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                  <tr className="text-center">
                    <th scope="col">Sr</th>
                    <th scope="col">SIR Date</th>
                    <th scope="col">SIR No</th>
                    <th scope="col">Flight No</th>
                    <th scope="col">Importer</th>
                    <th scope="col">PCKGS</th>
                    <th scope="col">MAWB No</th>
                    <th scope="col">HAWB No</th>
                    <th scope="col">BE Req ID</th>
                    <th scope="col">NSDL Status</th>
                    <th scope="col">DGDC Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {currentfilteredImports.map((import2, index) =>

                    <tr className={`text-center ${index === highlightedIndex ? 'highlighted-row' : ''}`}
                      key={index}
                      onClick={() => handleRowClick(index)}>
                      <td className="table-column">{index + 1}</td>
                      <td className="table-column">{formatDate2(import2.sirDate)}</td>
                      <td className="table-column">{import2.sirNo}</td>
                      <td className="table-column">{import2.flightNo}</td>
                      <td className="table-column"> {partyNames[import2.importerId]}</td>
                      <td className="table-column">{import2.nop}</td>
                      <td className="table-column">{import2.mawb}</td>
                      <td className="table-column">{import2.hawb}</td>
                      <td className="table-column">{import2.beRequestId}</td>
                      <td className="table-column">{import2.nsdl_Status}</td>
                      <td className="table-column">{import2.dgdc_Status}</td>

                      <td className="table-column">
                       
                        <button
                          type="button"
                          className="btn btn-danger dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ><FontAwesomeIcon icon={faCog} style={{ marginRight: '5px' }} />
                          Action
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item link"
                              onClick={() => handleOptionButtonClick("view-all")}
                              to={`/parent/import/add-new/${import2.impTransId}/${import2.mawb}/${import2.hawb}/${import2.sirNo}/view`}
                            >
                              View All Details
                            </Link>
                          </li>

                          <li className="mt-1">
                            <button
                              className="dropdown-item"
                            // onClick={() => handleOptionButtonClick("hold")}
                            >
                              Hold Parcel
                            </button>
                          </li>

                          <li className="mt-1">
                            <Link
                              // to={`/parent/import/add-new/${import2.mawb}/${import2.hawb}`}
                              className="dropdown-item link"

                            >
                              Print SIR
                            </Link>
                          </li  >

                          <li className="mt-1">
                            <button
                              onClick={(e) => handleShow(companyid, branchId, import2.sirNo)}
                              className="dropdown-item link"

                            >
                              View transtion History
                            </button >
                          </li>

                          <li className="mt-1">
                            <Link
                              className="dropdown-item link"
                              to={`/parent/import/add-new/${import2.impTransId}/${import2.mawb}/${import2.hawb}/${import2.sirNo}/modify`}
                            >
                              Modify Import Details
                            </Link>
                          </li>
                          <li className="mt-1">
                            <button
                              className="dropdown-item link"
                              onClick={() => handleOptionButtonClick("cancel")}
                            >
                              Cancel Parcel
                            </button>
                          </li>

                        </ul>
               
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
            </div>)}
        </CardBody>
      </Card>



      <Modal show={showModal} onHide={handleClose} size="lg">

        <Card>
          <CardBody>
            <h4 className="text-center">Import History</h4>
            <hr />
            <div className="table-responsive">
              <Table className="table table-bordered custom-table">
                <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                  <tr className="text-center">
                    <th scope="col">Sr No.</th>
                    <th scope="col">Transaction Date</th>
                    <th scope="col">DGDC Old Status</th>
                    <th scope="col">DGDC New Status</th>
                    <th scope="col">Updated By</th>
                    <th scope="col">Remarks</th>

                  </tr>
                </thead>
                <tbody>

                  {ImportsHistory.map((history, index) =>

                    <tr className="text-center">
                      <td className="table-column">{index + 1}</td>
                      <td className="table-column">{formatDateTime(history.transport_Date)}</td>
                      <td className="table-column">{history.oldStatus}</td>
                      <td className="table-column">{history.newStatus}</td>
                      <td className="table-column">{history.updatedBy}</td>
                      <td className="table-column">{history.remark}</td>
                    </tr>
                  )
                  }
                </tbody>
              </Table>
            </div>
            <hr />
            <div className="text-center">
              <button
                type="button"
                className="btn me-md-2 widthbtn btn-outline-danger"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                Ok
              </button>
            </div>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
}

export default Import;