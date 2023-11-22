import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import Swal from 'sweetalert2';
import serviceMaster from '../services/serviceMaster';
import { animateScroll as scroll } from "react-scroll";
import AuthContext from '../Components/AuthProvider';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import '../Components/Style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
export default function Service_Master() {
    const [company_Id, setcompanyId] = useState('');
    const [branch_Id, setbranch_Id] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [serviceShortDescription, setServiceShortDescription] = useState('');
    const [serviceLongDescription, setServiceLongDescription] = useState('');
    const [serviceUnit, setServiceUnit] = useState('');
    const [serviceUnit1, setServiceUnit1] = useState('');
    const [serviceType, setServiceType] = useState('Rec');
    const [taxApplicable, setTaxApplicable] = useState('N');
    const [taxPercentage, setTaxPercentage] = useState('');
    const [sacCode, setSacCode] = useState('');
    const [rateCalculation, setRateCalculation] = useState('');
    const [status, setStatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [service, setService] = useState([]);
    const [createdDate, setCreatedDate] = useState('');
    const [editedBy, setEditedBy] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [approvedDate, setApprovedDate] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [discountDays, setDiscountDays] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [serviceNewDescription, setServiceNewDescription] = useState('');
    const [serviceChangeDate, setServiceChangeDate] = useState('');
    const [serviceGroup, setServiceGroup] = useState('');
    const [typeOfCharges, setTypeOfCharges] = useState('N');
    const [errors, setErrors] = useState({});
    const [CreatedUser, setCreatedUser] = useState('');
    const [approvedUser, setApprovedUser] = useState('');


    const getCreatedUser = (id3,companyid,branchId) => {
        Rate_Chart_Service.getUserbyUserId(id3,companyid,branchId).then((res) => {
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
    };

    function scrollToSection() {
        scroll.scrollTo("target", {
            smooth: true,
            duration: 0,
            offset: -50,
        });
    };

    const handleTaxPercentageChange = (e) => {
        const selectedTaxPercentage = e.target.value;
        setTaxPercentage(selectedTaxPercentage);

        // Set taxApplicable based on selectedTaxPercentage
        if (selectedTaxPercentage !== '') {
            setTaxApplicable('Y');
        } else {
            setTaxApplicable('N');
        }
    };


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Calculate the index of the first and last item of the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Slice the array of services to display only the current page's items
    const currentServices = service.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination items
    const paginationItems = [];
    for (let number = 1; number <= Math.ceil(service.length / itemsPerPage); number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }









    const {

        userId,
        username,
        branchId,
        companyid,

    } = useContext(AuthContext);


    useEffect(() => {
        getAllServices(companyid, branchId);
        setcompanyId(companyid);
        setbranch_Id(branchId);
    }, [])



    //  take the values of approvedBy, editedBy ,Cid

    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validate serviceShortDescription
        if (!serviceShortDescription) {
            formIsValid = false;
            newErrors['serviceShortDescription'] = 'Short description is required.';
        }

        // Validate serviceUnit
        if (!serviceUnit) {
            formIsValid = false;
            newErrors['serviceUnit'] = 'Service unit is required.';
        }

        // Validate serviceType
        if (!serviceType) {
            formIsValid = false;
            newErrors['serviceType'] = 'Service type is required.';
        }

        // Validate sacCode
        if (!sacCode) {
            formIsValid = false;
            newErrors['sacCode'] = 'SAC code is required.';
        }

        // Validate rateCalculation
        if (!typeOfCharges) {
            formIsValid = false;
            newErrors['typeOfCharges'] = 'Please select Type of Charges';
        }

        // Validate rateCalculation
        if (!rateCalculation) {
            formIsValid = false;
            newErrors['rateCalculation'] = 'Please select Rate calculation';
        }



        setErrors(newErrors);
        return formIsValid;
    };




    const getAllServices = async (companyid, branchId) => {
        serviceMaster.getServices(companyid, branchId).then((res) => {
            // console.log(res.data);
            setService(res.data);
        })



    }

    const DeleteService = (compaId, branchId, sid) => {
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
                    serviceMaster.deleteService(compaId, branchId, sid).then((res) => {
                        // Swal.fire('Service Deleted Successfully', 'You clicked the button', 'success');

                        getAllServices(compaId, branchId);
                        // console.log(res.data)
                        makeFieldEmpty();
                       
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


    const makeFieldEmpty = () => {
        setServiceId('');
        setServiceShortDescription('')
        setServiceLongDescription('')
        setServiceUnit('')
        setServiceUnit1('')
        setServiceType('')
        setTaxApplicable('N')
        setTaxPercentage('')
        setSacCode('')
        setRateCalculation('')
        setStatus('')
        setCreatedBy('')
        setApprovedBy('')
        setCreatedDate('')
        setEditedDate('')
        setApprovedDate('')
        setServiceNewDescription('')
        setServiceChangeDate('')
        setServiceGroup('')
        setTypeOfCharges('N');
        setErrors('');
        setServiceType('Rec');
        setDiscountPercentage('');
        setDiscountDays('');
        setDiscountAmount('');
        setcompanyId('');
        setCreatedUser('');
        setApprovedUser('');
    }

    const updatdStatus = async () => {
        if (serviceId) {
            serviceMaster.updateServiceStatus(companyid, branchId, serviceId, userId, services).then((res) => {
                toast.success('Service Approved Successfully !', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 600,
                });
                // makeFieldEmpty();
                getServiceById(res.data.company_Id, res.data.branch_Id, res.data.service_Id);
                getAllServices(res.data.company_Id, res.data.branch_Id);

            })
        }
        else {
            toast.warning('First Save the Service !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
        }


    }
    const services = {

        serviceId, serviceShortDescription, serviceLongDescription, serviceUnit, serviceUnit1,
        serviceType, taxApplicable, taxPercentage, sacCode, status,
        createdBy, approvedBy, rateCalculation, createdDate, editedDate,
        serviceGroup, serviceChangeDate, serviceNewDescription, typeOfCharges,
        editedBy, editedDate, discountPercentage, setDiscountDays, discountAmount, company_Id, branch_Id
    };



    const getServiceById = (compId, branchId, serviceId) => {
        
        serviceMaster.getByServiceId(compId, branchId, serviceId).then((res) => {
            setServiceId(res.data.service_Id);
            setServiceShortDescription(res.data.serviceShortDescription)
            setServiceLongDescription(res.data.serviceLongDescription)
            setServiceUnit(res.data.serviceUnit)
            setServiceUnit1(res.data.serviceUnit1)
            setServiceType(res.data.serviceType)
            setTaxApplicable(res.data.taxApplicable)
            setTaxPercentage(res.data.taxPercentage)
            setSacCode(res.data.sacCode)
            setRateCalculation(res.data.rateCalculation)
            setStatus(res.data.status)
            setCreatedBy(res.data.createdBy)
            getCreatedUser(res.data.createdBy,companyid,branchId);
            setcompanyId(res.data.company_Id);
            setbranch_Id(res.data.branch_Id);
            setApprovedBy(res.data.approvedBy)
            getApprovedUser(res.data.approvedBy,companyid,branchId);
            setCreatedDate(res.data.createdDate)
            setEditedDate(res.data.editedDate)
            setApprovedDate(res.data.approvedDate)
            setServiceNewDescription(res.serviceNewDescription)
            setServiceChangeDate(res.serviceChangeDate)
            setServiceGroup(res.data.serviceGroup)
            setTypeOfCharges(res.data.typeOfCharges)
            setEditedBy(res.data.setEditedBy);
            setDiscountPercentage(res.data.discountPercentage);
            setDiscountDays(res.data.setDiscountDays);
            setDiscountAmount(res.data.discountAmount);

        })
    }



    const saveorUpdateService = async (e) => {

        const isFormValid = handleValidation();

        e.preventDefault();


        // if (sid) {
        //     scrollToSection();

        //     getServiceById(compId, branchId, sid);
        //     setErrors('');

        // }

        // else {

            if (isFormValid) {


                if (serviceId) {

                    serviceMaster.updateService(companyid, branchId, serviceId, userId, services).then((res) => {
                        toast.success('Service Updated Successfully !', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 700,
                        });

                        getServiceById(res.data.company_Id, res.data.branch_Id, res.data.service_Id);

                        getAllServices(res.data.company_Id, res.data.branch_Id);
                    })
                }
                else {
                    // console.log(services);


                    serviceMaster.addServices(companyid, branchId, userId, services).then((res) => {
                        toast.success('Service Saved Successfully !', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 700,
                        });
                        getServiceById(res.data.company_Id, res.data.branch_Id, res.data.service_Id);

                        getAllServices(res.data.company_Id, res.data.branch_Id);
                    }).catch(error => {
                        console.warn(error);
                    })
                }



            }
            else {


                toast.error('Oops something went wrong !', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 700,
                });



            }


        


    }

    return (
        <>

            <h4 className="pageHead" >Service Master</h4>
            <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>


                    {/* 1st */}

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId" id='target'>Service Id</Label>
                                <Input
                                    type="text" name="serviceId"
                                    id='service' readOnly
                                    value={serviceId}
                                    onChange={(e) => setServiceId(e.target.value)}
                                    className="form-control mb-3 read-only"
                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Service Short Desc</Label>
                                <Input
                                    type="text" name="serviceShortDescription"
                                    className="form-control"
                                    style={{
                                        borderColor: errors.serviceShortDescription ? '#f52b2b' : '',
                                    }}
                                    placeholder="Service Short Desc"
                                    onChange={(e) => setServiceShortDescription(e.target.value)}
                                    value={serviceShortDescription}
                                />
                            </FormGroup>
                        </Col>



                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Status</Label>
                                <Input
                                    type="text" name="status" id='service'
                                    className="form-control mb-2 read-only"
                                    readOnly
                                    value={status === "A" ? "Approved" : status === "U" ? "Edit" : status === "N" ? "New" : " "}
                                    onChange={(e) => setStatus(e.target.value)}
                                    placeholder="Status"
                                />
                            </FormGroup>
                        </Col>


                    </Row>


                    {/* 2nd */}
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Service Long Desc</Label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="2" name="serviceLongDescription"
                                    onChange={(e) => setServiceLongDescription(e.target.value)}
                                    value={serviceLongDescription}
                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Service Type</Label>
                                <select className="form-select" name="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)}
                                    style={{
                                        borderColor: errors.serviceType ? '#f52b2b' : '',
                                    }}
                                >
                                    <option value="">Select Service Type</option>
                                    <option value="Rec">Receivable</option>
                                    <option value="All">All</option>
                                </select>
                            </FormGroup>
                        </Col>



                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Created By</Label>
                                <Input
                                    type="text" name="createdBy" id='service'
                                    className="form-control mb-2 read-only"
                                    readOnly
                                    // onChange={(e) => setCreatedBy(e.target.value)}
                                    value={CreatedUser}
                                />
                            </FormGroup>
                        </Col>


                    </Row>

                    {/* 3rd */}

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Rate Calculation</Label>
                                <div className="row">
                                    <div className="col-4 d-flex align-items-center ">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input radios"
                                                type="radio" name="rateCalculation" value="Range"
                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                checked={rateCalculation === "Range"}
                                                style={{
                                                    borderColor: errors.rateCalculation ? '#f52b2b' : '',
                                                }}
                                            />

                                            <label className="form-check-label">Range</label>
                                        </div>
                                    </div>

                                    <div className="col-4 d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input radios"
                                                type="radio" name="rateCalculation" value="Slab"
                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                checked={rateCalculation === "Slab"}
                                                style={{
                                                    borderColor: errors.rateCalculation ? '#f52b2b' : '',
                                                }}
                                            />
                                            <label className="form-check-label">Slab</label>
                                        </div>
                                    </div>

                                    <div className="col-4 d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input radios"
                                                type="radio" name="rateCalculation" value="Plain"
                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                checked={rateCalculation === "Plain"}
                                                style={{
                                                    borderColor: errors.rateCalculation ? '#f52b2b' : '',
                                                }}
                                            />
                                            <label className="form-check-label">Plain</label>
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Type of Charges</Label>
                                <select className="form-select" name="TypeOfCharges" value={typeOfCharges} onChange={(e) => setTypeOfCharges(e.target.value)}>
                                    <option value="">Select Type of Charages</option>
                                    <option value="N">Not Applicable</option>
                                </select>
                            </FormGroup>
                        </Col>



                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Approved By</Label>
                                <Input
                                    type="text" name="approvedBy" id='service'
                                    className="form-control mb-3 read-only"
                                    readOnly
                                    // onChange={(e) => setApprovedBy(e.target.value)}
                                    value={approvedUser}
                                />
                            </FormGroup>
                        </Col>


                    </Row>

                    {/* 4th */}

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Service Unit</Label>
                                <select className="form-select" name="serviceUnit" value={serviceUnit} onChange={(e) => setServiceUnit(e.target.value)}
                                    style={{
                                        borderColor: errors.rateCalculation ? '#f52b2b' : '',
                                    }}
                                >
                                    <option value="">Select Service Unit</option>
                                    <option value="ACT">Actual</option>
                                    <option value="per BI">Per Bl</option>
                                    <option value="Per Cheque">Per Cheque</option>
                                    <option value="Parcel">Per Parcel</option>
                                    <option value="Quantity">Per Quantity</option>
                                    <option value="Per Container">Per Container</option>
                                    <option value="Per TEU">Per TEU</option>
                                    <option value="Per FEU">Per FEU</option>
                                    <option value="Per Shift">Per Shift</option>
                                    <option value="Per Man">Per Man</option>
                                    <option value="Per Day">Per Day</option>
                                    <option value="Per Month">Per Month</option>
                                    <option value="Per Week">Per Week</option>
                                    <option value="Per Kg">Per Kg</option>

                                </select>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Service Unit1</Label>
                                <select className="form-select" name="serviceUnit1" value={serviceUnit1} onChange={(e) => setServiceUnit1(e.target.value)}>
                                    <option value="">Select Service Unit1</option>
                                    <option value="ACT">Actual</option>
                                    <option value="Per BI">Per Bl</option>
                                    <option value="Per Cheque">Per Cheque</option>
                                    <option value="Per Parcel">Per Parcel</option>
                                    <option value="Per Quantity">Per Quantity</option>
                                    <option value="Per Container">Per Container</option>
                                    <option value="Per TEU">Per TEU</option>
                                    <option value="Per FEU">Per FEU</option>
                                    <option value="Per Shift">Per Shift</option>
                                    <option value="Per Man">Per Man</option>
                                    <option value="Per Day">Per Day</option>
                                    <option value="Per Month">Per Month</option>
                                    <option value="Per Week">Per Week</option>
                                    <option value="Per Kg">Per Kg</option>
                                </select>
                            </FormGroup>
                        </Col>



                        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Sac Code</Label>
                                <Input
                                    type="text" name="sacCode"
                                    id='Sac Code' className="form-control "
                                    onChange={(e) => setSacCode(e.target.value)}
                                    placeholder="Sac Code" value={sacCode}
                                    style={{
                                        borderColor: errors.sacCode ? '#f52b2b' : '',
                                    }}
                                />
                            </FormGroup>
                        </Col>


                    </Row>

                    {/* 5th */}

                    <Row>


                        <Col md={4}>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Applicable GST</Label>
                                <select className="form-select" name="taxPercentage" value={taxPercentage} onChange={handleTaxPercentageChange}>
                                    <option value="">Select GST</option>
                                    <option value="5">5%</option>
                                    <option value="12">12%</option>
                                    <option value="18">18%</option>
                                    <option value="20">20%</option>
                                </select>
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Tax Applicable</Label>
                                <Row>
                                    <Col md={3}>
                                        <input
                                            className="form-check-input radios"
                                            type="checkbox"
                                            disabled
                                            // id='service'
                                            name="taxApplicable"
                                            checked={taxApplicable === "Y"}
                                            onChange={(e) => setTaxApplicable(e.target.checked ? "Y" : "N")}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>


                    </Row>




                    <div className="text-center mt-4">

                        <Button
                            type="button"
                            className="widthbtn"
                            variant="outline-danger"
                            style={{ marginLeft: '10px' }}
                            onClick={(e) => saveorUpdateService(e)}
                        >
                            <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                            SAVE
                        </Button>

                        <Button
                            type="button"
                            className="widthbtn"
                            variant="outline-danger"
                            style={{ marginLeft: '10px' }}
                            onClick={(e) => updatdStatus(e)}
                        >
                            <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                            Submit
                        </Button>

                        <Button
                            type="button"
                            className=""
                            variant="outline-danger"
                            style={{ marginLeft: '10px' }}
                            onClick={(e) => makeFieldEmpty()}
                        >
                            <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                            ADD NEW
                        </Button>

                        {/* <Button variant="success" color="success" className='btnwidth' style={{ marginRight: 10 }} onClick={(e) => saveorUpdateService(e)}>Save</Button>
                        <Button variant="info" className='btnwidth' onClick={(e) => updatdStatus(e)}>Submit</Button>
                        <Button variant="warning" color="warning" style={{ marginLeft: 10 }} onClick={(e) => makeFieldEmpty()}>Add New</Button> */}
                    </div>
                    <hr />
                    <h3 className='text-center mt-3 mb-3'>Service Master</h3>
                    <Table className="table table-bordered custom-table">
                        <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                            <tr className="text-center">
                                <th scope="col">Service Id</th>
                                <th scope="col">Service Name</th>
                                <th scope="col">Rate Type</th>
                                <th scope="col">Service Type</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentServices.map((servicemaster, index) =>

                                    <tr key={index} className="text-center">
                                        <td className="table-column">{servicemaster.service_Id}</td>
                                        <td className="table-column">{servicemaster.serviceShortDescription}</td>
                                        <td className="table-column">{servicemaster.rateCalculation}</td>
                                        <td className="table-column">{servicemaster.serviceType === "Rec" ? "Receivable" : servicemaster.serviceType === "Imp" ? "Import" : servicemaster.serviceType === "Exp" ? "Export" : servicemaster.serviceType === "All" ? "All" : ""}</td>
                                        <td className="table-column">{servicemaster.createdBy}</td>
                                        <td className="table-column">{servicemaster.status === "A" ? "Approved" : servicemaster.status === "U" ? "Edit" : servicemaster.status === "N" ? "New" : servicemaster.status === "D" ? "Deleted" : ""}</td>
                                        <td className="table-column">
                                            <div className="text-center" style={{ display: 'flex', justifyContent: 'center' }}  >
                                                <button
                                                    onClick={() => getServiceById(servicemaster.company_Id, servicemaster.branch_Id, servicemaster.service_Id)}
                                                    style={{ flex: 1, maxWidth: '45%', marginRight: 5 }}
                                                    variant="warning"
                                                    className="btn btn-primary"
                                                >
                                                    Edit
                                                </button>
                                                <button variant="danger" className='btn btn-danger' style={{ flex: 1, maxWidth: '45%', marginLeft: 5 }} onClick={() => DeleteService(servicemaster.company_Id, servicemaster.branch_Id,servicemaster.service_Id)}>Delete</button>

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
                </CardBody>
            </Card>



        </>
    );

}