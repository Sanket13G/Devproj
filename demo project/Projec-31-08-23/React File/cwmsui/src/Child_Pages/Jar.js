import AuthContext from "../Components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import '../Components/Style.css'
import ipaddress from "../Components/IpAddress";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export default function Jar() {

    const {
        jwtToken,
        userId,
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
      const [jarList, setJarList] = useState([]);
    
      const [formData, setFormData] = useState({
        companyId: companyid,
        jarId: "",
        jarDesc: "",
        soundexDesc: " ",
        jarType: " ",
        detailAutoFlag: "",
        importAppl: " ",
        reference1: " ",
        reference2: " ",
        workflowId: " ",
        processId: " ",
        comments: " ",
        createdDate: "",
        createdBy: " ",
        editedBy: " ",
        approvedBy: " ",
        editedDate: " ",
        approvedDate: " ",
        status: "N",
      });
    
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleEditButtonClick = (item) => {
        console.log(item);
    
        return <addJarDetail item={item} />;
      };
    
      const handleSubmit = () => {
        formData.approvedBy = userId;
        formData.editedBy = userId;
        formData.createdBy = userId;
        console.log("Form Data:", formData);
    
        axios
          .post(`http://${ipaddress}:8080/jar/addJar`, formData) // Replace with your API endpoint
          .then((response) => {
            console.log("POST response:", response.data);
          })
          .catch((error) => {
            console.error("POST error:", error);
          });
        window.location.reload(); // Reload the page
        toggleModal();
      };
      const getlist = () => {
        axios
          .get(`http://${ipaddress}:8080/jar/list`)
          .then((response) => {
            console.log("GET list response:", response.data);
            setJarList(response.data); // Store the list in the state
          })
          .catch((error) => {
            console.error("GET list error:", error);
          });
      };
    
      useEffect(() => {
        getlist();
      }, []); // Fetch the list when the component mounts
    
      useEffect(() => {
        if (!isAuthenticated) {
          navigate(
            "/login?message=You need to be authenticated to access this page."
          );
        }
      }, [isAuthenticated, navigate]);
    
      return (
        <>
          <Card>
            <CardBody>
              <p style={{ fontWeight: "bold" }}>Comman Master</p>
    
              <Card>
                <CardBody>
                  <Button color="danger" onClick={toggleModal}>
                    Add Jar Type
                  </Button>
                </CardBody>
              </Card>
    
              <Card>
                <CardBody>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Jar Id</th>
                        <th>Jar Type</th>
                        <th>Jar Desc</th>
                        <th>Jar Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jarList.map((item,index) => (
                        <tr key={index}>
                          <td >{item.jarId}</td>
                          <td >{item.jarType}</td>
                          <td >{item.jarDesc}</td>
                          <td>
                            {item.status === "N"
                              ? "New"
                              : item.status === "U"
                              ? "Edit"
                              : item.status === "A"
                              ? "Approved"
                              : item.status}
                          </td>
                          <td className="text-center">
                            <Link
                              to={`/Parent_Pages/AddJarDetails/${item.jarId}/${item.jarType}`}
                            >
                              <button
                                type="button"
                                className="btn btn-outline-primary "
                              >
                                {" "}
                                EDIT
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
    
              {/* Modal for adding data */}
              <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add New Type</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="jarType">Jar Type</Label>
                    <Input
                      type="text"
                      name="jarType"
                      id="jarType"
                      value={formData.jarType}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="jarDesc">Jar Description</Label>
                    <Input
                      type="text"
                      name="jarDesc"
                      id="jarDesc"
                      value={formData.jarDesc}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="comments">Jar Comment</Label>
                    <Input
                      type="text"
                      name="comments"
                      id="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <button
                    type="button"
                    className="btn btn-outline-primary me-md-2"
                    onClick={handleSubmit}
                  >
                    ADD
                  </button>
    
                  <button
                    type="button"
                    className="btn btn-outline-danger me-md-2"
                    onClick={toggleModal}
                  >
                    CANCEL
                  </button>
                </ModalFooter>
              </Modal>
            </CardBody>
          </Card>
        </>
      );
    }