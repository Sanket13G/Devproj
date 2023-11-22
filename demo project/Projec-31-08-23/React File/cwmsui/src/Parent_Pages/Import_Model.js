import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Components/AuthProvider";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import Select from 'react-select';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function Import_Model() {
    const [errors, setErrors] = useState({});
    const [companyId, setcompanyId] = useState('');

    const [branchId1, setBranchId] = useState('');
    const [impTransId, setImpTransId] = useState('');
    const [impTransDate, setImpTransDate] = useState(new Date()); // Use appropriate initial value
    const [mawb, setMawb] = useState('');
    const [hawb, setHawb] = useState('');
    const [igmNo, setIgmNo] = useState('');
    const [igmDate, setIgmDate] = useState(new Date()); // Use appropriate initial value
    const [sirNo, setSirNo] = useState('');
    const [sirDate, setSirDate] = useState(new Date()); // Use appropriate initial value
    const [pctmNo, setPctmNo] = useState('');
    const [tpNo, setTpNo] = useState('');
    const [tpDate, setTpDate] = useState(null); // Use appropriate initial value
    const [airlineName, setAirlineName] = useState('');
    const [flightNo, setFlightNo] = useState('');
    const [flightDate, setFlightDate] = useState(new Date()); // Use appropriate initial value
    const [countryOrigin, setCountryOrigin] = useState('');
    const [portOrigin, setPortOrigin] = useState('');
    const [importerId, setImporterId] = useState('');
    const [iec, setIec] = useState('');
    const [sezEntityId, setSezEntityId] = useState('');
    const [consoleName, setconsoleName] = useState('BVC');
    const [packageContentType, setPackageContentType] = useState('LAB GROWN DIAMONDS(LGD)');
    const [parcelType, setParcelType] = useState('');
    const [uomPackages, setUomPackages] = useState('KGS');
    const [nop, setNop] = useState(1); // Use appropriate initial value
    const [importRemarks, setImportRemarks] = useState('');
    const [descriptionOfGoods, setDescriptionOfGoods] = useState('');
    const [chaCde, setChaCde] = useState('');
    const [assessableValue, setAssessableValue] = useState('');
    const [grossWeight, setGrossWeight] = useState(''); // Use appropriate initial value
    const [beRequestId, setBeRequestId] = useState('');
    const [beNo, setBeNo] = useState('');
    const [beDate, setBeDate] = useState(new Date()); // Use appropriate initial value
    const [importAddress, setImportAddress] = useState('');
    const [status, setStatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [createdDate, setCreatedDate] = useState(new Date()); // Use appropriate initial value
    const [editedBy, setEditedBy] = useState('');
    const [editedDate, setEditedDate] = useState(null); // Use appropriate initial value
    const [approvedBy, setApprovedBy] = useState('');
    const [approvedDate, setApprovedDate] = useState(null); // Use appropriate initial value
    const [FlightS, setFlightS] = useState([]);
    const [uomWeight, setuomWeight] = useState('');
    const [parties, setParties] = useState([]);
    const [selectedParty, setSelectedParty] = useState(null);
    const [partyName, setparty_Name] = useState('');
    const [consoles, setConsoles] = useState([]);
    const [pcktype, setPcktype] = useState([]);
    const [ImportsofMAWB, setImportsofMAWB] = useState([]);
    const [nsdl_Status, setNSDL_Status] = useState('');
    const [dgdc_Status, seTDGDC_Status] = useState('');
    const [CreatedUser, setCreatedUser] = useState('');
    const [approvedUser, setApprovedUser] = useState('');

    const {
        userId,
        username,
        branchId,
        companyid,

    } = useContext(AuthContext);



    const { transId2, mawb2, hawb2, sir2 } = useParams();

    const { transId3, mawb3, hawb3, sir3 } = useParams();
    useEffect(() => {
        if (mawb2 && hawb2) {
            getByMAWBnoAndHAwb(companyid, branchId, transId2, mawb2, hawb2, sir2);
        };
        if (mawb3 && hawb3) {
            getByMAWBnoAndHAwb(companyid, branchId, transId3, mawb3, hawb3, sir3);
        };
    }, [])

    const getImportsOfMAWB = (compId, branchId, MAWBNo) => {
        Rate_Chart_Service.getByMAWBNo(compId, branchId, MAWBNo).then((res) => {
            setImportsofMAWB(res.data);
        })
    }


    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validate serviceShortDescription
        if (!mawb) {
            formIsValid = false;
            newErrors['mawb'] = 'mawb is required.';

        }

        // Validate serviceUnit
        if (!hawb) {
            formIsValid = false;
            newErrors['hawb'] = 'hawb is required.';

        }

        // Validate serviceType
        if (!airlineName) {
            formIsValid = false;
            newErrors['airlineName'] = 'airlineName is required.';

        }

        if (!igmNo) {
            formIsValid = false;
            newErrors['igmNo'] = 'igmNo is required.';

        }
        if (!consoleName) {
            formIsValid = false;
            newErrors['consoleName'] = 'consoleName is required.';

        }
        if (!importerId) {
            formIsValid = false;
            newErrors['importerId'] = 'importerId is required.';

        }
        if (!hawb) {
            formIsValid = false;
            newErrors['hawb'] = 'hawb is required.';

        }
        if (!packageContentType) {
            formIsValid = false;
            newErrors['packageContentType'] = 'packageContentType is required.';

        }

        if (!beRequestId) {
            formIsValid = false;
            newErrors['beRequestId'] = 'beRequestId is required.';

        }

        setErrors(newErrors);
        return formIsValid;
    };

    const navigate = useNavigate();
    const Handleback = () => {
        navigate("/parent/import")
    }



    const getByMAWBnoAndHAwb = async (compId, branchID, transId, mawb, hawb, sirNo) => {

        Rate_Chart_Service.GetByMAWBandHAWB(compId, branchID, transId, mawb, hawb, sirNo).then((res) => {
            setMawb(res.data.mawb);
            setHawb(res.data.hawb);
            setIgmNo(res.data.igmNo);
            setSirNo(res.data.sirNo);
            setSirDate(res.data.sirDate);
            setIgmDate(res.data.igmDate);
            setAirlineName(res.data.airlineName);
            setFlightNo(res.data.flightNo);
            setFlightDate(res.data.flightDate);
            setCountryOrigin(res.data.countryOrigin);
            setPortOrigin(res.data.portOrigin);
            setImporterId(res.data.importerId);

            console.log("Party" + res.data.importerId);
            getPartyByID(companyid, branchId, res.data.importerId);

            setIec(res.data.iec);
            setSezEntityId(res.data.sezEntityId);
            setconsoleName(res.data.consoleName);
            setPackageContentType(res.data.packageContentType);
            setNop(res.data.nop);
            setParcelType(res.data.parcelType);
            setImportRemarks(res.data.importRemarks);
            setDescriptionOfGoods(res.data.descriptionOfGoods);
            setChaCde(res.data.chaCde);
            setAssessableValue(res.data.assessableValue);
            setGrossWeight(res.data.grossWeight);
            setBeRequestId(res.data.beRequestId);
            setBeNo(res.data.beNo);
            setBeDate(res.data.beDate);
            setStatus(res.data.status);
            setTpNo(res.data.tpNo);
            setPctmNo(res.data.pctmNo);
            getApprovedUser(res.data.approvedBy,companyid,branchId);
            setApprovedBy(res.data.approvedBy);
            getCreatedUser(res.data.createdBy,companyid,branchId);
            setTpDate(res.data.tpDate);
            setEditedBy(res.data.editedBy);
            setEditedDate(res.data.editedDate);
            setCreatedDate(res.data.createdDate);
            setApprovedDate(res.data.approvedDate);
            setCreatedBy(res.data.createdBy);
            setuomWeight(res.data.uomWeight);
            setImportAddress(res.data.importAddress);
            setUomPackages(res.data.uomPackages);
            setcompanyId(res.data.companyId);
            setBranchId(res.data.DatebranchId);
            setImpTransId(res.data.impTransId);
            setImpTransDate(res.data.impTransDate);
            setNSDL_Status(res.data.nsdl_Status);
            seTDGDC_Status(res.data.dgdc_Status);

        })
    }

    const makefieldEmpty = () => {

        setHawb('');
        setSirNo('');
        // setImporterId('');
        // setIec('');
        // setSezEntityId('');
        setPackageContentType('LAB GROWN DIAMONDS(LGD)');
        setNop(1);
        setParcelType('');
        setImportRemarks('');
        setDescriptionOfGoods('');
        setChaCde('');
        setAssessableValue('');
        setGrossWeight('');
        setBeRequestId('');
        setBeNo('');
        setBeDate('');
        setTpDate('');
        setStatus('');
        setApprovedBy('');
        setCreatedBy('');
        setuomWeight('');
        setImportAddress('');
        setUomPackages('KGS');
        setTpNo('');
        setPctmNo('');
        setErrors('');
        setAssessableValue('');
        setGrossWeight('');
        setBeRequestId('');
        setImpTransId('');
        setImpTransDate('');
        setApprovedBy('');
        setEditedBy('');
        setEditedDate('');
        setCreatedDate('');
        setApprovedDate('');
        setCreatedBy('');
        setuomWeight('');
        setImportAddress('');
        setNSDL_Status('');
        seTDGDC_Status('');
        setcompanyId('');
        setCreatedUser('');
        setApprovedUser('');

    }


    useEffect(() => {
        // findAirlines();
        findParties();
        findPCKTYPE();
        findConsoles();
        findAirlines();
    }, []);


    const findConsoles = async () => {
        const consoleResponse = await Rate_Chart_Service.getjarsByJarId('J00007',companyid);
        const partyOptions = consoleResponse.data.map(jar => ({
            value: jar.jarId,
            label: jar.jarDtlDesc
        }));
        setConsoles(partyOptions);

    }

    const findPCKTYPE = async () => {
        const PCKTYPEResponse = await Rate_Chart_Service.getjarsByJarId('J00008',companyid);
        const partyOptions = PCKTYPEResponse.data.map(jar => ({
            value: jar.jarId,
            label: jar.jarDtlDesc
        }));
        setPcktype(partyOptions);
    }


    const handleConsoleChange = selectedOption => {

        setconsoleName(selectedOption ? selectedOption.label : '');

    };

    const handlepckgtype = selectedOption => {

        setPackageContentType(selectedOption ? selectedOption.label : '');

    };



    const findParties = async () => {
        const partyResponse = await Rate_Chart_Service.getAllParties();
        const partyOptions = partyResponse.data.map(party => ({
            value: party.partyId,
            label: party.partyName
        }));
        setParties(partyOptions);

    };

    const findAirlines = async () => {
        const AirResponse = await Rate_Chart_Service.getAllairline(companyid,branchId);
        const AirOptions = AirResponse.data.map(party => ({
            value: party.airlineName,
            label: party.flightNo
        }));
        setFlightS(AirOptions);


    };



    const handlePartyChange = selectedOption => {
        setSelectedParty(selectedOption);

        // setparty_Name(selectedOption ? selectedOption.label : '');
        setImporterId(selectedOption ? selectedOption.value : '');
        getPartyByID(companyid, branchId, selectedOption ? selectedOption.value : '')
    };

    const handleFlightChange = selectedOption => {
        setFlightNo(selectedOption ? selectedOption.label : '');
        setAirlineName(selectedOption ? selectedOption.value : '')
    }


    const addImport = () => {
       
        Rate_Chart_Service.addImport(companyid, branchId, userId, importData).then((res) => {

            getImportsOfMAWB(res.data.companyId, res.data.branchId, res.data.mawb);
            getByMAWBnoAndHAwb(res.data.companyId, res.data.branchId, res.data.impTransId, res.data.mawb, res.data.hawb, res.data.sirNo);

            toast.success('Data Added Successfully !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 600,
            });
        })
    };

    const updateImport = () => {

        console.log(importData);
        Rate_Chart_Service.updateImport(companyid, branchId, userId, importData).then((res) => {
            // alert("update")
            // console.log(res.data);
            getImportsOfMAWB(res.data.companyId, res.data.branchId, res.data.mawb);
            getByMAWBnoAndHAwb(res.data.companyId, res.data.branchId, res.data.impTransId, res.data.mawb, res.data.hawb, res.data.sirNo);

            toast.success('Data Approved Successfully !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 600,
            });
        })
    };

    const updateModify = () => {

        // console.log(importData);
        Rate_Chart_Service.ModifyupdateImport(companyid, branchId, userId, importData).then((res) => {
            // alert("update")
            // console.warn(res.data);
            getImportsOfMAWB(res.data.companyId, res.data.branchId, res.data.mawb);
            getByMAWBnoAndHAwb(res.data.companyId, res.data.branchId, res.data.impTransId, res.data.mawb, res.data.hawb, res.data.sirNo);
            toast.success('Data Approved Successfully !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 600,
            });
        })
    };


    const getPartyByID = async (companyId, branchId, id3) => {
        try {
            const res = await Rate_Chart_Service.getPartyById(companyId, branchId, id3);
            if (res.data) {
                setparty_Name(res.data.partyName);
                setIec(res.data.iecNo);
                setSezEntityId(res.data.entityId);
            } else {
                console.log("No data received from getPartyById API");
            }
        } catch (error) {
            console.error("Error fetching party data:", error);
        }
    };
    const getCreatedUser = (id,companyid,branchId) => {
        Rate_Chart_Service.getUserbyUserId(id,companyid,branchId).then((res) => {
            setCreatedUser(res.data.user_Name);
            // alert(CreatedUser);
        })
    };

    const getApprovedUser = (id2,companyid,branchId) => {
        if (id2) {
            Rate_Chart_Service.getUserbyUserId(id2,companyid,branchId).then((res) => {
                setApprovedUser(res.data.user_Name);
            })
        };
    }




    const DeleteImport = (compaId, branchId,transId ,mawbno,hawbno,sir) => {
        {


            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Rate_Chart_Service.deleteimportofmawb(compaId, branchId,transId ,mawbno,hawbno,sir).then((res) => {
                        // Swal.fire('Service Deleted Successfully', 'You clicked the button', 'success');

                        getImportsOfMAWB(compaId,branchId,mawbno);

                        // console.log(res.data)
                        makefieldEmpty();
                       
                    }
                    )

                    toast.error('Service Deleted Successfully !', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 700,
                    });
                }
            })




        }
    }


    const SaveorSubmit = () => {
        // alert("On the Way")
        const isFormValid = handleValidation();
        if (isFormValid) {
            // alert("in")

            if (status) {
                if (mawb2 && hawb2) {
                    updateModify();
                }

            }
            if (mawb && status) {
                updateModify();
            }
            else {
                              
                    addImport();
                            }
        }
        else {

            toast.error('Oops something went wrong !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
        }
    }

    const importData = {
        companyId, branchId,
        uomWeight, impTransId, impTransDate, mawb, hawb, igmNo, igmDate, sirNo, sirDate, pctmNo, tpNo, tpDate, airlineName,
        flightNo, flightDate, countryOrigin, portOrigin, importerId, iec, sezEntityId, consoleName, packageContentType, parcelType,
        uomPackages, nop, importRemarks, descriptionOfGoods, chaCde, assessableValue, grossWeight, beRequestId, beNo, beDate,
        importAddress, status, createdBy, createdDate, editedBy, editedDate, approvedBy, approvedDate, dgdc_Status, nsdl_Status
    };

    const handleDateChange = (date) => {
        setIgmDate(date);
        setFlightDate(date);
        setBeDate(date);
    };

    const handleDateChangeFlight = (date) => {
        setFlightDate(date);
    }
    const handleDateChangeBE = (date) => {
        setBeDate(date);
    }

    return (
        <>

            <h4 style={{ backgroundColor: '' }} className="pageHead" >Add New Import</h4>
            <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>


                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">MAWB No.</Label>
                                <Input
                                    type="text"
                                    name="mawb"
                                    className="form-control inputField"
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    value={mawb}
                                    maxLength={11} // Add this line to set the maximum length
                                    style={{ height: '40px', borderColor: errors.mawb ? '#f52b2b' : '' }}
                                    onChange={(e) => setMawb(e.target.value)}

                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">IGM No.</Label>
                                <Input
                                    type="text" name="igmNo"
                                    className="form-control"
                                    value={igmNo}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    maxLength={10}
                                    style={{ borderColor: errors.igmNo ? '#f52b2b' : '' }}
                                    onChange={(e) => setIgmNo(e.target.value)}
                                />
                            </FormGroup>
                        </Col>



                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">IGM Date</Label>
                                <div className="input-group"> {/* Wrap in an input group */}
                                    <DatePicker
                                        selected={igmDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                        readOnly={mawb3 && hawb3}
                                        value={igmDate}
                                        className="form-control border-right-0 inputField"
                                        customInput={<input style={{ width: '17.8vw' }} />}
                                    />

                                </div>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Status</Label>
                                <Input
                                    type="text" name="status"
                                    className="form-control inputField"
                                    id='service' readOnly
                                    value={status === "A" ? "Approved" : status === "U" ? "Edit" : status === "N" ? "New" : " "}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </FormGroup>
                        </Col>

                    </Row>

                    {/* 2nd */}

                    <Row>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Airline Name</Label>
                                <Input
                                    type="text" name="airlineName"
                                    className="form-control inputField"
                                    value={airlineName}
                                    id='service' readOnly
                                    style={{ borderColor: errors.airlineName ? '#f52b2b' : '' }}
                                    onChange={(e) => setAirlineName(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Flight No.</Label>
                                <Select
                                    options={FlightS}
                                    value={{ value: flightNo, label: flightNo }}
                                    onChange={handleFlightChange}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    isClearable
                                    maxLength={8}
                                    isDisabled={mawb3 && hawb3}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                            borderColor: errors.consoleName ? '#f52b2b' : '',
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
                                <Label className="forlabel" for="branchId">Flight Date</Label>
                                <div className="input-group"> {/* Wrap in an input group */}
                                    <DatePicker
                                        selected={flightDate}
                                        onChange={handleDateChangeFlight}
                                        id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                        readOnly={mawb3 && hawb3}
                                        // minDate={today}
                                        dateFormat="dd/MM/yyyy"
                                        value={flightDate} // Set the value from the database
                                        className="form-control InputField"
                                        customInput={<input style={{ width: '17.8vw' }} />}
                                    />

                                </div>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Created By</Label>
                                <Input
                                    type="text" name="createdBy"
                                    className="form-control inputField"
                                    value={CreatedUser}
                                    id='service' readOnly
                                // onChange={(e) => setCreatedBy(e.target.value)}
                                />
                            </FormGroup>
                        </Col>

                    </Row>



                    {/* 3rd */}

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Country of Oringin</Label>
                                <Input
                                    type="text" name="countryOrigin"
                                    className="form-control"
                                    value={countryOrigin}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    maxLength={10}
                                    readOnly={mawb3 && hawb3}
                                    onChange={(e) => setCountryOrigin(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Port of Origin</Label>
                                <Input
                                    type="text" name="portOrigin"
                                    className="form-control"
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    maxLength={10}
                                    value={portOrigin}
                                    onChange={(e) => setPortOrigin(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Select Console</Label>

                                <Select
                                    options={consoles}
                                    value={{ value: consoleName, label: consoleName }}
                                    onChange={handleConsoleChange}
                                    isClearable
                                    isDisabled={mawb3 && hawb3}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                            borderColor: errors.consoleName ? '#f52b2b' : '',
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
                                <Label className="forlabel" for="branchId">Approved By</Label>
                                <Input
                                    type="text"
                                    name="approvedBy"
                                    id="service"
                                    readOnly
                                    value={approvedUser}
                                    className="inputField"
                                />
                            </FormGroup>

                        </Col>

                    </Row>


                    {/* 4th */}


                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Importer</Label>
                                <Select
                                    options={parties}
                                    value={{ value: partyName, label: partyName }}
                                    onChange={handlePartyChange}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    isClearable
                                    isDisabled={mawb3 && hawb3}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            borderColor: errors.importerId ? '#f52b2b' : '',
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
                                <Label className="forlabel" for="branchId">IEC No.</Label>
                                <Input
                                    type="text" name="iec"
                                    className="form-control"
                                    value={iec}
                                    onChange={(e) => setIec(e.target.value)}
                                    id="service"
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">SEZ Entity Id</Label>

                                <Input type="text" name="sezEntityId"
                                    className="form-control"
                                    value={sezEntityId}
                                    onChange={(e) => setSezEntityId(e.target.value)}
                                    id="service"
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Import Remarks</Label>
                                <Input
                                    type="text" name="importRemarks"
                                    className="form-control"
                                    value={importRemarks}
                                    maxLength={20}
                                    onChange={(e) => setImportRemarks(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                    </Row>


                    {/* 5Th */}


                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">HAWB No.</Label>
                                <Input
                                    type="text" name="hawb"
                                    className="form-control"
                                    value={hawb}
                                    maxLength={10}
                                    style={{ borderColor: errors.hawb ? '#f52b2b' : '', }}
                                    onChange={(e) => setHawb(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Package Content Type</Label>
                                <Select
                                    options={pcktype}
                                    value={{ value: packageContentType, label: packageContentType }}
                                    onChange={handlepckgtype}
                                    isClearable
                                    // id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    // readOnly={mawb3 && hawb3}
                                    isDisabled={mawb3 && hawb3}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            borderColor: errors.packageContentType ? '#f52b2b' : '',
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
                                <Label className="forlabel" for="branchId">No. of Packages </Label>

                                <Input type="text" name="nop"
                                    className="form-control"
                                    value={nop}
                                    maxLength={3}
                                    onChange={(e) => setNop(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">UOM Package Type</Label>
                                <Input
                                    type="text" name="uomPackages"
                                    className="form-control"
                                    onChange={(e) => setUomPackages(e.target.value)}
                                    value={uomPackages}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>

                    </Row>





                    {/* 6th */}
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">CHA_CDE</Label>
                                <Input
                                    type="text" name="chaCde"
                                    className="form-control"
                                    onChange={(e) => setChaCde(e.target.value)}
                                    value={chaCde}
                                    maxLength={10}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Assesable In INR</Label>
                                <Input
                                    type="text" name="assessableValue"
                                    className="form-control"
                                    value={assessableValue}
                                    maxLength={15}
                                    onChange={(e) => setAssessableValue(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>


                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Desc of Goods </Label>

                                <Input type="text" name="descriptionOfGoods"
                                    className="form-control"
                                    value={descriptionOfGoods}
                                    maxLength={50}
                                    onChange={(e) => setDescriptionOfGoods(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>


                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Gross Weight </Label>

                                <Input type="text" name="grossWeight"
                                    className="form-control"
                                    value={grossWeight}
                                    maxLength={10}
                                    onChange={(e) => setGrossWeight(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>

                    </Row>

                    {/* 7th */}

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">UOM Weight</Label>
                                <Input
                                    type="text" name="uomWeight"
                                    className="form-control"
                                    onChange={(e) => setuomWeight(e.target.value)}
                                    value={uomWeight}
                                    maxLength={10}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">BE Request Id</Label>
                                <Input
                                    type="text" name="beRequestId"
                                    className="form-control"
                                    value={beRequestId}
                                    maxLength={12}
                                    style={{ borderColor: errors.beRequestId ? '#f52b2b' : '', }}
                                    onChange={(e) => setBeRequestId(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">BE Number </Label>

                                <Input type="text" name="beNo"
                                    className="form-control"
                                    value={beNo}
                                    maxLength={10}
                                    onChange={(e) => setBeNo(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">BE Date</Label>
                                <div className="input-group"> {/* Wrap in an input group */}
                                    <DatePicker
                                        selected={beDate}
                                        onChange={handleDateChangeBE}
                                        // minDate={today}
                                        dateFormat="dd/MM/yyyy"
                                        value={beDate} // Set the value from the database
                                        className="form-control"
                                        customInput={<input style={{ width: '17.8vw' }} />}
                                        id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                        readOnly={mawb3 && hawb3}
                                    />

                                </div>
                            </FormGroup>
                        </Col>
                    </Row>


                    {/* 8th */}

                    <Row>

                        <Col xs={12} md={8}> {/* Adjust the column widths based on your layout */}
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Importer Address</Label>
                                <textarea
                                    name="importAddress"
                                    rows="2"
                                    className="form-control"
                                    style={{ width: '100%' }}
                                    maxLength={50}
                                    value={importAddress}
                                    onChange={(e) => setImportAddress(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                ></textarea>
                            </FormGroup>
                        </Col>


                    </Row>


                    <div className="text-center mb-3 mt-2">


                        {!mawb3 && !hawb3 && !mawb2 && !hawb2 && (  // Show the "ADD NEW" button if mawb3 and hawb3 are NOT present
                            <Button
                                type="button"
                                className=""
                                variant="outline-danger"
                                style={{ marginLeft: '10px' }}
                                onClick={makefieldEmpty}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                ADD NEW
                            </Button>
                        )}

                        {!mawb3 && !hawb3 && (  // Show the "SUBMIT" button if mawb3 and hawb3 are NOT present
                            <Button
                                type="button"
                                className="widthbtn"
                                variant="outline-danger"
                                style={{ marginLeft: '10px' }}
                                onClick={SaveorSubmit}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                SUBMIT
                            </Button>
                        )}

                        <Button
                            type="button"
                            className="widthbtn"
                            variant="outline-danger"
                            style={{ marginLeft: '10px' }}
                            onClick={Handleback}
                        >
                            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                            BACK
                        </Button>

                    </div>





                    {!(mawb2 && hawb2) && ImportsofMAWB.length > 0 && (
                        <div className="table-responsive">
                            <Table className="table table-bordered custom-table">
                                <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                    <tr className="text-center">
                                        <th scope="col">HAWB No.</th>
                                        <th scope="col">Content Type</th>
                                        <th scope="col">UOM type</th>
                                        <th scope="col">No of Packages</th>
                                        <th scope="col">Assesable</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {ImportsofMAWB.map((import2, index) =>

                                        <tr className="text-center">
                                            <td className="table-column">{import2.hawb}</td>
                                            <td className="table-column">{import2.packageContentType}</td>
                                            <td className="table-column">{import2.uomPackages}</td>
                                            <td className="table-column">{import2.nop}</td>
                                            <td className="table-column">{import2.assessableValue}</td>
                                            <td className="table-column">
                                                {import2.status === "A"
                                                    ? "Approved"
                                                    : import2.status === "U"
                                                        ? "Edit"
                                                        : import2.status === "N"
                                                            ? "New"
                                                            : import2.status === "D"
                                                                ? "Deleted"
                                                                : ""}
                                            </td>
                                            <td className="table-column">
                                                <button
                                                    type="button"
                                                    className="btn me-md-2  btn-outline-primary"
                                                    onClick={(e) => getByMAWBnoAndHAwb(import2.companyId, import2.branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                ><FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                                                    EDIT
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn gap-2  btn-outline-danger"
                                                onClick={() => DeleteImport(import2.companyId, import2.branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                                    DELETE
                                                </button>



                                            </td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    )}
                </CardBody>
            </Card >
         

        </>
    );
}

export default Import_Model;