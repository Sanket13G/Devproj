import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import "../Components/Style.css";
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
import axios from "axios";
import { toast } from "react-toastify";
import ipaddress from "./IpAddress";

export default function PartyEntry() {
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

    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [userList, setUserList] = useState([]);
    const initialState = {
        role: "ROLE_USER",
        enabled: true,
        company_Id: companyid,
        createdBy: username,
        mapped_User: null,
        user_Email: "",
        stopTrans: "N",
        accountNonLocked: true,
        user_Id: "",
        branch_Id: branchId,
        user_Name: "",
        user_Type: "Internal User",
        status: "",
        comments: "",
        credentialsNonExpired: true,
        accountNonExpired: true,

        user_Password: "",
        authorities: null,

        approvedBy: username,
    };

    const [formData, setFormData] = useState(initialState);
    const [searchInput, setSearchInput] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [depositeAllowed, setDepositeAllowed] = useState(false);
    const [cartingInvoiceRequired, setCartingInvoiceRequired] = useState(false);
    const [inBondInvoiceNotRequired, setInBondInvoiceNotRequired] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleDelete = (user_Id) => {
        axios
            .delete(`http://${ipaddress}:8080/UserCreation/delete/${user_Id}`)
            .then((response) => {
                //console.log(`User with ID ${user_Id} deleted successfully!`);
                toast.error(`User with ID ${user_Id} deleted successfully!`, "success", {
                    autoClose: 1000,
                });

                // After successful deletion, update the userList state
                setUserList((prevList) =>
                    prevList.filter((user) => user.user_Id !== user_Id)
                );
            })
            .catch((error) => {
                console.error("Error while deleting user:", error);
                toast.error("Error while deleting user!", "error", {
                    autoClose: 1000,
                });
            });
    };

    const fetchDataFromServer = () => {
        axios
            .get(`http://${ipaddress}:8080/UserCreation/list`)
            .then((response) => {
                setUserList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error while fetching data:", error);
            });
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    const handleClear = () => {
        setFormData(initialState);
    };

    const handleSubmit = () => {
        console.log(formData);
        formData.status = 'A';

        axios
            .post(`http://${ipaddress}:8080/UserCreation/Update`, formData)
            .then((response) => {
                console.log("Form data sent successfully!");
                console.log(response.data); // Print the response from the Spring controller if needed
                toast.success("User data Saving successfully!", "success", {
                    autoClose: 1000,
                });
                setFormData(response.data);
                fetchDataFromServer();

            })
            .catch((error) => {
                console.error("Error while sending form data:", error);
                toast.error("Error while Saving User data!", "error", {
                    autoClose: 1000,
                });
            });
    };

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);

    const handleEdit = (user) => {
        setFormData(user);
        formData.status = 'E';
        user.editedBy = username;

    };

    const handleSearch = () => {


        // Filter the userList based on the searchInput
        const filteredUserList = userList.filter(
            (user) =>
                user.user_Name.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.user_Id.toLowerCase().includes(searchInput.toLowerCase())
            // Add more fields to search as needed
        );
        setSearchResults(filteredUserList);
        setShowSearchResults(true);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };
    const saveHandle = () => {
        console.log(formData + "here==========================================================================");
        if (formData.status === 'N' || formData.status === 'E') {
            formData.status = 'E'; // Set status to 'E' for 'N' or 'E'
        } else if (formData.status === 'A') {
            formData.status = 'A'; // Keep status as 'A' if it's 'A'
        } else {
            formData.status = 'N'; // Set status to 'N' for any other value
        }
        axios
            .post(`http://${ipaddress}:8080/UserCreation/add`, formData)
            .then((response) => {
                console.log("Form data sent successfully!");
                console.log(response.data);

                // Update formData state with the response data
                setFormData(response.data);
                toast.success("User data Saved successfully!", {
                    autoClose: 1000,
                });
                fetchDataFromServer(); // Optional: Update the user list after saving
            })
            .catch((error) => {
                console.error("Error while sending form data:", error);

                toast.error("Error while sending form data!", "error", {
                    autoClose: 1000,
                });
            });
    };


    const [checkboxValues, setCheckboxValues] = useState({
        cha: false,
        agent: false,
        exportersForwarders: false,
        importer: false,
        liner: false,
    });


    const handleCheckboxChange = (checkboxName) => {
        setCheckboxValues((prevValues) => ({
            ...prevValues,
            [checkboxName]: !prevValues[checkboxName],
        }));
    };


    return (
        <div className="Container">

            <h5  className="pageHead" >Export List</h5>
            <Card style={{backgroundColor: "#F8F8F8"}}>
                <CardBody>

                    <Form>
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
                                    <Label for="status" className="forlabel">SER Date</Label>
                                    <Input
                                        type="date"
                                        name=""
                                        id="status"

                                        className="inputField"

                                    />

                                </FormGroup>
                            </Col>
                            <Col >
                                <FormGroup>
                                    <Label for="status" className="forlabel">Hold</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"
                                        required
                                    >
                                        <option value="">-Any-</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>

                            <Col >

                                <FormGroup>
                                    <Label for="search" className="forlabel">Personal Carriage</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"
                                        required
                                    >
                                        <option value="">-Any-</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col >

                                <FormGroup>
                                    <Label for="search" className="forlabel">Heavy</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"
                                        required
                                    >
                                        <option value="">-Any-</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col >

                                <FormGroup>
                                    <Label for="search" className="forlabel">Special Carting</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"
                                        required
                                    >
                                        <option value="">-Any-</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </FormGroup>
                            </Col>


                        </Row>
                        <Row>

                            <Col >

                                <FormGroup>
                                    <Label for="search" className="forlabel">Provisional</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"
                                        required
                                    >
                                        <option value="">-Any-</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col >

                                <FormGroup>
                                    <Label for="search" className="forlabel">Dgdc Status</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"
                                        required
                                    >
                                        <option value="">-Any-</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col >

                                <Button type="button" className="" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '27px' }}

                                >
                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                    SAVE
                                </Button>


                                <Button type="button"    style={{ marginLeft: '10px', marginTop: '27px' }} >
                                    <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                                    CLEAR
                                </Button>
                            </Col>


                        </Row>


                    </Form>
                </CardBody>
            </Card>



            <Table style={{ width: '100%' ,marginTop: '30px' }} className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th style={{ background: "skyblue" }}>BranchName</th>
                        <th style={{ background: "skyblue" }}>User Id</th>
                        <th style={{ background: "skyblue" }}>User Name</th>
                        {/* <th>user_Email</th> */}
                        <th style={{ background: "skyblue" }}>User Type</th>
                        <th style={{ background: "skyblue" }}>Stop Transaction</th>
                        <th style={{ background: "skyblue" }}>Comments</th>
                        <th style={{ background: "skyblue" }}>Status</th>
                        <th
                            style={{ background: "skyblue" }}
                            className="text-center"
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render either searchResults or all userList based on showSearchResults */}
                    {showSearchResults
                        ? searchResults.map((user) => (
                            <tr key={user.user_Id}>
                                <td>{branchname}</td>
                                <td>{user.user_Id}</td>
                                <td>{user.user_Name}</td>
                                {/* <td>{user.user_Email}</td> */}
                                <td>{user.user_Type}</td>
                                <td>{user.stopTrans}</td>
                                <td>{user.comments}</td>
                                <td>
                                    {user.status === "N"
                                        ? "New"
                                        : user.status === "U"
                                            ? "Edited"
                                            : user.status === "A"
                                                ? "Approved"
                                                : user.status}
                                </td>
                                <td className=" text-center d-grid gap-2 d-md-block">
                                    <button
                                        type="button"
                                        className="btn me-md-2  btn-outline-primary"
                                        onClick={() => handleEdit(user)}
                                    ><FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />

                                    </button>
                                    <button
                                        type="button"
                                        className="btn gap-2 btn-outline-danger"
                                        onClick={() => handleDelete(user.user_Id)}
                                    ><FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />

                                    </button>
                                </td>
                            </tr>
                        ))
                        : userList.map((user) => (
                            <tr key={user.user_Id}>
                                <td>{branchname}</td>
                                <td>{user.user_Id}</td>
                                <td>{user.user_Name}</td>
                                {/* <td>{user.user_Email}</td> */}
                                <td>{user.user_Type}</td>
                                <td>
                                    {user.stopTrans === "N"
                                        ? "No"
                                        : user.stopTrans === "Y"
                                            ? "Yes"
                                            : user.stopTrans}
                                </td>
                                <td>{user.comments}</td>

                                <td>
                                    {user.status === "N"
                                        ? "New"
                                        : user.status === "E"
                                            ? "Edited"
                                            : user.status === "A"
                                                ? "Approved"
                                                : user.status}</td>
                                <td className=" text-center d-grid gap-2 d-md-block">
                                    <button
                                        type="button"
                                        className="btn me-md-2  btn-outline-primary"
                                        onClick={() => handleEdit(user)}
                                    ><FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                                    EDIT
                                    </button>

                                    <button
                                        type="button"
                                        className="btn gap-2 btn-outline-danger"
                                        onClick={() => handleDelete(user.user_Id)}
                                    > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                      DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>



        </div>
    );
}