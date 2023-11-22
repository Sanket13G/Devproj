import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";

import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
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
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";

export default function User() {
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

    created_By: user_Id,
    mapped_User: null,
    user_Email: "",
    stop_Trans: "N",
    accountNonLocked: true,
    user_Id: "",
    branch_Id: branchId,
    user_Name: "",
    user_Type: "",
    status: "",
    comments: "",
    credentialsNonExpired: true,
    accountNonExpired: true,

    user_Password: "",
    authorities: null,

    approved_By: user_Id,
  };

  const [formData, setFormData] = useState(initialState);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = (user_Id) => {
    axios
      .delete(`http://${ipaddress}:8080/UserCreation/delete/${user_Id}`)
      .then((response) => {
        //console.log(`User with ID ${user_Id} deleted successfully!`);
        toast.error(`User with ID ${user_Id} deleted successfully!`, "success");

        // After successful deletion, update the userList state
        setUserList((prevList) =>
          prevList.filter((user) => user.user_Id !== user_Id)
        );
      })
      .catch((error) => {
        console.error("Error while deleting user:", error);
        toast.error("Error while deleting user!", "error");
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

    axios
      .post(`http://${ipaddress}:8080/UserCreation/Update`, formData)
      .then((response) => {
        console.log("Form data sent successfully!");
        console.log(response.data); // Print the response from the Spring controller if needed
        toast.success("Form data sent successfully!", "success");
        setFormData(response.data);
        fetchDataFromServer();

      })
      .catch((error) => {
        console.error("Error while sending form data:", error);
        toast.error("Error while sending form data!", "error");
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
    console.log(formData);
    if (!formData.user_Id || !formData.user_Password || !formData.user_Name) {
      toast.error("User ID, User Password, and User Name are required fields.", "error");
      return; // Prevent saving if required fields are empty
    }
    axios
      .post(`http://${ipaddress}:8080/UserCreation/add`, formData)
      .then((response) => {
        console.log("Form data sent successfully!");
        console.log(response.data);

        // Update formData state with the response data
        setFormData(response.data);

        toast.success("Form data sent successfully!", "success");
        fetchDataFromServer(); // Optional: Update the user list after saving
      })
      .catch((error) => {
        console.error("Error while sending form data:", error);
        toast.error("Error while sending form data!", "error");
      });
  };


  return (
    <div className="Container">
      <h5 className="pageHead" >User Creation</h5>
      <Card style={{ backgroundColor: "#F8F8F8" }}>
        <CardBody>


          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Branch Name</Label>
                  <Input
                    type="text"
                    name="branchname"
                    id="branchname"
                    value={branchname}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>

              <Col md={4}></Col>
              <Col>
                <FormGroup>
                  <Label className="forlabel" for="status">Status</Label>
                  <Input
                    type="text"
                    name="status"
                    id="status"
                    value=
                    {formData.status === 'N' ? 'New' : formData.status === 'E' ? 'Edit' : formData.status === 'A' ? 'Approved' : formData.status}


                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label className="forlabel" for="user_Id">User ID</Label>
                  <Input
                    type="text"
                    name="user_Id"
                    id="user_Id"
                    value={formData.user_Id}
                    onChange={handleChange}
                    pattern="^[a-zA-Z0-9]+$" // Alphanumeric characters without spaces
                    maxLength={30} // Maximum length of 20 characters
                    required // Field must not be left blank
                    title="User ID should consist of only letters and numbers and max length should be 30"
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="user_Password">User Password</Label>
                  <Input
                    type="password"
                    name="user_Password"
                    id="user_Password"
                    value={formData.user_Password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                {" "}
                <FormGroup>
                  <Label className="forlabel" for="user_Name">User Name</Label>
                  <Input
                    type="text"
                    name="user_Name"
                    id="user_Name"
                    value={formData.user_Name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label className="forlabel" for="user_Email">User Email</Label>
                  <Input
                    type="email"
                    name="user_Email"
                    id="user_Email"
                    value={formData.user_Email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="user_Type">User Types</Label>
                  <Input
                    type="select"
                    name="user_Type"
                    id="user_Type"
                    value={formData.user_Type}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Carting Agent">Carting Agent</option>
                    <option value="CHA">CHA</option>
                    <option value="Consolidator">Consolidator</option>
                    <option value="Internal User">Internal User</option>
                    {/* Add more options as needed */}
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label className="forlabel" for="stop_Trans">Stop Transactions</Label>
                  <Input
                    type="select"
                    name="stop_Trans"
                    id="stop_Trans"
                    value={formData.stop_Trans}
                    onChange={handleChange}
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="comments">Comments</Label>
                  <Input
                    type="text"
                    name="comments"
                    id="comments"
                    value={formData.comments}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col sm="4"></Col>

              <Col sm="4">
                <div
                  style={{
                    marginTop: 32,
                  }}
                  className="d-grid gap-2 d-md-flex justify-content-md-center"
                >
                  <Button
                    type="button"
                    className="allbutton"
                    onClick={saveHandle}
                    variant="outline-danger"
                  >
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                    SAVE
                  </Button>
                  <Button
                    type="button"
                    className="allbutton"
                    variant="outline-danger"
                    onClick={handleSubmit}
                  >
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                    SUBMIT
                  </Button>
                  <Button
                    type="button"
                    className="allbutton"
                    variant="outline-danger"
                    onClick={handleClear}
                  >
                    <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                    CLEAR
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>

          <Card>
            <CardBody>
              <Form>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label className="forlabel" for="search">Search in List Data.</Label>
                      <Input
                        type="text"
                        name="search"
                        id="search"
                        style={{width:'101%'}}
                        value={searchInput}
                        onChange={handleSearchChange}

                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Button
                        type="button"
                        style={{
                          marginTop: 30,
                          marginLeft: 30
                        }}
                        className="allbutton"
                        variant="outline-danger"
                        onClick={handleSearch}
                      >
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                        SEARCH
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <hr />

              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th style={{ background: "skyblue" }}>BranchName</th>
                    <th style={{ background: "skyblue" }}>User Id</th>
                    <th style={{ background: "skyblue" }}>User Name</th>
                    {/* <th>user_Email</th> */}
                    <th style={{ background: "skyblue" }}>User Type</th>
                    <th style={{ background: "skyblue" }}>Stop Transaction</th>
                    <th style={{ background: "skyblue" }}>Comments</th>
                    <th style={{ background: "skyblue" }}> Status</th>
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
                        <td>{user.stop_Trans}</td>
                        <td>{user.comments}</td>
                        <td>
                          {user.status === "N"
                            ? "New"
                            : user.status === "U"
                              ? "Edit"
                              : user.status === "A"
                                ? "Approved"
                                : user.status}
                        </td>
                        <td className=" text-center d-grid gap-2 d-md-block">
                          <Button
                            type="button"
                            variant="outline-primary"
                            onClick={() => handleEdit(user)}
                           
                            style={{ marginRight: '10px' }}
                          >
                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                            EDIT
                          </Button>
                          <Button
                            type="button"
                            variant="outline-danger"
                           
                            onClick={() => handleDelete(user.user_Id)}
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                            DELETE
                          </Button>
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
                          {user.stop_Trans === "N"
                            ? "No"
                            : user.stop_Trans === "Y"
                              ? "Yes"
                              : user.stop_Trans}
                        </td>
                        <td>{user.comments}</td>

                        <td>
                          {user.status === "N"
                            ? "New"
                            : user.status === "E"
                              ? "Edit"
                              : user.status === "A"
                                ? "Approved"
                                : user.status}</td>
                        <td className=" text-center d-grid gap-2 d-md-block">
                          <Button
                            type="button"
                            variant="outline-primary"
                            onClick={() => handleEdit(user)}
                            
                            style={{ marginRight: '10px' }}
                          >
                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                            EDIT
                          </Button>
                          <Button
                            type="button"
                            variant="outline-danger"
                            
                            onClick={() => handleDelete(user.user_Id)}
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                            DELETE
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>

          <Row>
            <>
              <></>
            </>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}