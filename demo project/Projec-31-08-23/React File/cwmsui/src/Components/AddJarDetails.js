import AuthContext from "../Components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Components/Style.css";
import ipaddress from "./IpAddress";

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

const AddJarDetails = ({ item }) => {
  const { jarid, jartype } = useParams();
 
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editedJarDetail, setEditedJarDetail] = useState({
    jarDtlDesc: "",
    comments: "",
  });
  const toggleEditModal = (item) => {
    setEditingItem(item);
    setEditedJarDetail({
      jarDtlId: item.jarDtlId,
      jarDtlDesc: item.jarDtlDesc,
      comments: item.comments,
    });
    setIsEditModalOpen(!isEditModalOpen);
  };
  const [JarListDtl, setJarListDtl] = useState([]);

  const [jarDetail, setJarDetail] = useState({
    companyId: companyid,
    jarId: jarid,
    jarDtlDesc: "",
    percentage: "",
    refAttribute: "",
    workflowId: "",
    processId: "",
    comments: "",
    createdBy: username,
    createdDate: "",
    editedBy: username,
    editedDate: "",
    approvedBy: username,
    approvedDate: "",
    status: "",
  });

  const getJar = () => {
    axios
      .get(`http://${ipaddress}:8080/jar/getJar/${jarid}`)
      .then((response) => {
        console.log("GET jar response:", response.data);
        setJar(response.data); // Store the jar element in the state
      })
      .catch((error) => {
        console.error("GET jar error:", error);
      });
  };
  const [jar, setJar] = useState(null);
  console.log(jar);
  useEffect(() => {
    getJar();
  }, []); // Run the effect only once when the component mounts

  const getlist = () => {
    axios
      .get(`http://${ipaddress}:8080/jardetail/jarIdList/${jarid}/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  console.log(JarListDtl);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJarDetail((prevJarDetail) => ({
      ...prevJarDetail,
      [name]: value,
    }));
  };

  useEffect(() => {
    getlist();
  }, []);

  const handleSubmit = () => {
    console.log("Submitted Jar Detail:", jarDetail);
    jarDetail.status = "N";
    axios
      .post(`http://${ipaddress}:8080/jardetail/add`, jarDetail)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.location.reload(); // Reload the page    getlist();
    setIsModalOpen(false);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedJarDetail((prevEditedDetail) => ({
      ...prevEditedDetail,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    const editedData = {
      ...editingItem,
      jarDtlId: editedJarDetail.jarDtlId,
      jarDtlDesc: editedJarDetail.jarDtlDesc, // Updated field
      comments: editedJarDetail.comments, // Updated field

      // Add other fields from editingItem or editedJarDetail as needed
    };
    axios
      .post(`http://${ipaddress}:8080/jardetail/addUpdateStatus`, editedData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.location.reload(); // Reload the page
    toggleModal();
    getlist();
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://${ipaddress}:8080/jardetail/delete/${item.jarDtlId}`)
        .then((response) => {
          // console.log("Delete response:", response.data);
          getlist(); // Update the list after deletion
        })
        .catch((error) => {
          console.error("Delete error:", error);
        });
    }
  };
  const buttonStyle = {
    marginRight: "8px", // Adjust the margin as needed for your desired spacing
  };
  const handleApproveAll = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}:8080/jardetail/jarIdListUStatus/${jarid}`);
      // console.log(response.data);
      setJarListDtl(response.data);

      const JarAppoved = await axios.get(`http://${ipaddress}:8080/jar/getJarForUpdate/${jarid}`);
// 
      console.log("Jar Approved request successful!");
      setJar(JarAppoved.data);
      // console.log(JarAppoved.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  return (
    <>
      <Card>
        <p style={{ fontWeight: "bold" }}>Common Master For {jartype}</p>
        <Card>
          <CardBody>
            {jar ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th> Jar ID </th>
                    <th> Jar Type </th>
                    <th> Jar Desc </th>
                    <th> Jar Status </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{jar.jarId}</td>
                    <td>{jar.jarType}</td>
                    <td>{jar.jarDesc}</td>
                    <td>
                      {jar.status === "N"
                        ? "New"
                        : jar.status === "U"
                        ? "Edit"
                        : jar.status === "A"
                        ? "Approved"
                        : jar.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Loading jar element...</p>
            )}
            <div>
              <Button color="danger" onClick={toggleModal} style={buttonStyle}>
                ADD NEW {jartype}
              </Button>
              <button
                className="btn btn-success"
                style={buttonStyle}
                onClick={handleApproveAll}
              >
                SUBMIT
              </button>
              <Link to="/child/Jar">
                <Button color="danger">BACK</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Jar Dtl Id</th>
                  <th>Jar Dtl Desc </th>
                  <th>Jar Dtl Comment</th>
                  <th>Jar Dtl Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {JarListDtl.map((item) => (
                  <tr key={item.id}>
                    <td>{item.jarDtlId}</td>
                    <td>{item.jarDtlDesc}</td>
                    <td>{item.comments}</td>
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
                      <button
                        type="button"
                        className="btn btn-outline-info me-md-2"
                        onClick={() => toggleEditModal(item)}
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(item)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}> Add New {jartype} </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label style={{ fontWeight: "bold" }} for="jarDtlId">
              Jar Dtl ID
            </Label>
            <Input
              type="text"
              name="jarDtlId"
              id="jarDtlId"
              value={jarDetail.jarDtlId}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="jarDtlDesc" style={{ fontWeight: "bold" }}>
              Jar Dtl Desc
            </Label>
            <Input
              type="text"
              name="jarDtlDesc"
              id="jarDtlDesc"
              value={jarDetail.jarDtlDesc}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="comments" style={{ fontWeight: "bold" }}>
              Jar Comments
            </Label>
            <Input
              type="text"
              name="comments"
              id="comments"
              value={jarDetail.comments}
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-info "
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
          <button
            type="button"
            className="btn btn-outline-danger "
            onClick={toggleModal}
          >
            CANCEL
          </button>
        </ModalFooter>
      </Modal>
      <></>
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>
          Edit {jartype} for {editedJarDetail.jarDtlId}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="jarDtlId" style={{ fontWeight: "bold" }}>
              Jar Dtl ID
            </Label>
            <Input
              readOnly
              type="text"
              name="jarDtlId"
              id="jarDtlId"
              value={editedJarDetail.jarDtlId}
              onChange={handleEditInputChange}
              style={{ backgroundColor: "#f0e7e6" }} // Apply gray background color
            />
          </FormGroup>

          <FormGroup>
            <Label for="jarDtlDesc" style={{ fontWeight: "bold" }}>
              Jar Dtl Desc
            </Label>
            <Input
              type="text"
              name="jarDtlDesc"
              id="jarDtlDesc"
              value={editedJarDetail.jarDtlDesc}
              onChange={handleEditInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="comments" style={{ fontWeight: "bold" }}>
              Jar Comments
            </Label>
            <Input
              type="text"
              name="comments"
              id="comments"
              value={editedJarDetail.comments}
              onChange={handleEditInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={handleEditSave}>
            UPDATE
          </Button>
          <Button outline color="danger" onClick={toggleEditModal}>
            CANCEL
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AddJarDetails;