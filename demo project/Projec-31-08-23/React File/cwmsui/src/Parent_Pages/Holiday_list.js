import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ipaddress from "../Components/IpAddress";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import {
  Row,
  Col,
  Input,
  Form,

  FormGroup,
  Label,
  Card,
  CardBody,
  Modal,
  Table,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";
import AuthContext from "../Components/AuthProvider";
export default function Holiday_list() {

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    isAuthenticated,
    role,
    login,
    logout,
  } = useContext(AuthContext);
  const [holidays, setHolidays] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editHoliday, setEditHoliday] = useState({});
  const [newHoliday, setNewHoliday] = useState({
    companyId: "",
    branchId: "",
    holidayId: "",
    holidayName: "",
    holidayDate: "",
    holidayDay: "",
    createdBy: userId,
    createdDate: "",
    editedBy: userId,
    editedDate: "",
    approvedBy: userId,
    approvedDate: "",
    status: "",
  });
const reactPageName = 'Holiday List';
  const resetForm = () => {
    setNewHoliday({
      companyId: "",
      branchId: "",
      holidayId: "",
      holidayName: "",
      holidayDate: "",
      holidayDay: "",
      createdBy: "",
      createdDate: "",
      editedBy: "",
      editedDate: "",
      approvedBy: "",
      approvedDate: "",
      status: "",
    });
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(
        `http://${ipaddress}:8080/holiday/allHoliday`,{
          headers: {
            'React-Page-Name': reactPageName
          }
        }
      );
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewHoliday({
      ...newHoliday,
      [name]: value,
    });
    if (name === "holidayDate") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setNewHoliday({
        ...newHoliday,
        [name]: formattedDate,
      });
    } else {
      setNewHoliday({
        ...newHoliday,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://${ipaddress}:8080/holiday/addHoliday`, newHoliday,{
        headers: {
          'React-Page-Name': reactPageName
        }
      });
      fetchHolidays();
      toggleModal();
      resetForm();
      toast.success("Data saved successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error Adding  data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  // const handleEdit = (holiday) => {

  //   };
  // const handleEdit = (holiday) => {
  //   setEditHoliday(holiday);
  //   toggleEditModal();
  // };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;

  };

  const handleEdit = (holiday) => {

    console.log("Received holiday date:", holiday.holidayDate);
  const formattedDate = formatDate(holiday.holidayDate);
  console.log("Formatted date:", formattedDate);

    setEditHoliday({
      companyId: holiday.companyId,
      branchId: holiday.branchId,
      holidayId: holiday.holidayId,
      holidayName: holiday.holidayName,
      holidayDate: formatDate(holiday.holidayDate),
      holidayDay: holiday.holidayDay,
      createdBy: holiday.createdBy,
      createdDate: holiday.createdDate,
      editedBy: holiday.editedBy,
      editedDate: holiday.editedDate,
      approvedBy: holiday.approvedBy,
      approvedDate: holiday.approvedDate,
      status: holiday.status,
    });
    toggleEditModal();
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditHoliday({
      ...editHoliday,
      [name]: value,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://${ipaddress}:8080/holiday/update/${editHoliday.holidayId}`,
        editHoliday,{
          headers: {
            'React-Page-Name': reactPageName
          }
        }
        
      );
      fetchHolidays();
      toggleEditModal();
      // Optionally, reset the editHoliday state here
      toast.success("Data Updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error updating data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDelete = async (holidayId) => {
    try {
      await axios.delete(`http://${ipaddress}:8080/holiday/delete/${holidayId}`,{
        headers: {
          'React-Page-Name': reactPageName
        }
      });
      fetchHolidays();
      toast.success("Data Deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error deleting  data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  
  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <Container style={{ backgroundColor: "#f7f7f7" }}>
        <div>
          <h5
            className="text-left"
            style={{ fontWeight: "bold", paddingBottom: 18 }}
          >
            {" "}
            Holiday List
          </h5>
        </div>
        <Card style={{ paddingTop: 18, paddingRight: 18,backgroundColor: "#F8F8F8" }}>
          <div>
            <Button
              style={{ float: "right",marginRight:20 }}
              type="button"
              variant="outline-danger"
              onClick={toggleModal}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
              Add Holiday
            </Button>
            
          </div>

          <CardBody>
            <Table striped bordered hover>
              <thead style={{ backgroundColor: "#ff9900" }}>
                <tr>
                  <th style={{backgroundColor:'skyblue'}}>Holiday Name</th>
                  <th style={{backgroundColor:'skyblue'}}>Holiday Date</th>
                  <th style={{backgroundColor:'skyblue'}}>Holiday Day</th>

                  <th style={{backgroundColor:'skyblue'}} className="text-center">Action</th>
                
                </tr>
              </thead>
              <tbody>
                {holidays.map((holiday) => (
                  <tr key={holiday.holidayId}>
                    <td>{holiday.holidayName}</td>
                    <td>{formatDate(holiday.holidayDate)}</td>
                    <td>{holiday.holidayDay}</td>
                    {/* Add more table data */}
                    <td className="text-center">
                      <Button
                        onClick={() => handleEdit(holiday)}
                    
                        variant="outline-primary"
                        style={{marginRight:18}}
                      >
                         <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(holiday.holidayId)}
                        variant="outline-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                        Delete
                      </Button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
      <Modal isOpen={modalOpen} toggle={toggleModal} style={{ maxWidth: 900 }}>
        <ModalHeader
          toggle={toggleModal}
          style={{ backgroundColor: "skyblue" }}
        >
          Add Holiday
        </ModalHeader>
        <ModalBody style={{ backgroundColor: " #F8F8F8" }}>
          <Form onSubmit={handleSubmit} style={{}} id="myfrom">
            <Card>
              {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          Holiday Name:
                        </Label>
                      </div>
                      <Input
                        type="text"
                        id="holidayName"
                        name="holidayName"
                        placeholder="Holiday Name"
                        value={newHoliday.holidayName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <div div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayDate"
                          style={{ fontWeight: "bold" }}
                        >
                          Holiday Date:
                        </Label>
                      </div>
                      <Input
                        type="date"
                        id="holidayDate"
                        name="holidayDate"
                        placeholder="Holiday date "
                        value={newHoliday.holidayDate}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayDay"
                          style={{ fontWeight: "bold" }}
                        >
                          Holiday Day:
                        </Label>
                      </div>
                      <Input
                        type="text"
                        id="holidayDay"
                        name="holidayDay"
                        placeholder="Holiday Day"
                        value={newHoliday.holidayDay}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-danger" onClick={handleSubmit} >
          <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
            Add
          </Button>
          <Button variant="outline-danger" onClick={toggleModal} >
          <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* #ffebcc // orange
      #f7f7f7 // grey
      #ebf2f9// light blue */}

      <Modal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        style={{ maxWidth: 900 }}
      >
        <ModalHeader
          toggle={toggleEditModal}
          style={{ backgroundColor: "#ff9900" }}
        >
          Edit Holiday
        </ModalHeader>
        <ModalBody style={{ backgroundColor: " #ffebcc" }}>
          <Form onSubmit={handleEditSubmit} id="myfrom">
            {/* <Row>
  <Col>
  <FormGroup>
        <Label htmlFor="holidayId">Holiday ID:</Label>
        <Input
          type="text"
          id="holidayId"
          name="holidayId"
          placeholder="Holiday ID"
          value={editHoliday.holidayId}
          onChange={handleEditInputChange}
          required
          disabled
        />
      </FormGroup>
    
      </Col>
      <Col>
      <FormGroup>
        <Label htmlFor="companyId">Company ID:</Label>
        <Input
          type="text"
          id="companyId"
          name="companyId"
          placeholder="Company ID"
          value={editHoliday.companyId}
          onChange={handleEditInputChange}
          required
        />
      </FormGroup>
      </Col>
      <Col>
      <FormGroup>
        <Label htmlFor="branchId">Branch ID:</Label>
        <Input
          type="text"
          id="branchId"
          name="branchId"
          placeholder="Branch ID"
          value={editHoliday.branchId}
          onChange={handleEditInputChange}
        
        />
      </FormGroup>
      </Col>
      </Row> */}
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="holidayName">Holiday Name:</Label>
                  <Input
                    type="text"
                    id="holidayName"
                    name="holidayName"
                    placeholder="Holiday Name"
                    value={editHoliday.holidayName}
                    onChange={handleEditInputChange} // Keep this line if you need to update input value
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="holidayDate">Holiday Date:</Label>
                  <Input
                    type="date"
                    id="holidayDate"
                    name="holidayDate"
                    placeholder="Holiday date "
                    value={formatDate(editHoliday.holidayDate)}
                    onChange={handleEditInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="holidayDay">Holiday Day:</Label>
                  <Input
                    type="text"
                    id="holidayDay"
                    name="holidayDay"
                    placeholder="Holiday Day"
                    value={editHoliday.holidayDay}
                    onChange={handleEditInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* Add more fields */}
            {/* <Row>
      <Col>
      <FormGroup>
        <Label htmlFor="createdBy">Created By:</Label>
        <Input
          type="text"
          id="createdBy"
          name="createdBy"
          placeholder="Created By"
          value={editHoliday.createdBy}
          onChange={handleEditInputChange}
        />
      </FormGroup>
      </Col> */}
            {/* <Col>
      <FormGroup>
        <Label htmlFor="createdDate">Created Date:</Label>
        <Input
          type="date"
          id="createdDate"
          name="createdDate"
          placeholder="Created Date"
          value={editHoliday.createdDate}
          onChange={handleEditInputChange}
        />
      </FormGroup>
      </Col> */}
            {/* Add more fields */}
            {/* <Col>
      <FormGroup>
        <Label htmlFor="editedBy">Created Date:</Label>
        <Input
          type="text"
          id="editedBy"
          name="editedBy"
          placeholder="edited By"
          value={editHoliday.editedBy}
          onChange={handleEditInputChange}
        />
      </FormGroup>
      </Col>
      </Row> */}
            {/* <Row>
      <Col>
      <FormGroup>
        <Label htmlFor="editedDate">Created Date:</Label>
        <Input
          type="date"
          id="editedDate"
          name="editedDate"
          placeholder="Edited Date"
          value={editHoliday.editedDate}
          onChange={handleEditInputChange}
        />
      </FormGroup>
      </Col> */}
            {/* <Col>
      <FormGroup>
        <Label htmlFor="approvedBy">Created Date:</Label>
        <Input
          type="text"
          id="approvedBy"
          name="approvedBy"
          placeholder="Approved By"
          value={editHoliday.approvedBy}
          onChange={handleEditInputChange}
        />
      </FormGroup>
      </Col>
      <Col>
      <FormGroup>
        <Label htmlFor="approvedDate">Created Date:</Label>
        <Input
          type="date"
          id="approvedDate"
          name="approvedDate"
          placeholder="Approved Date"
          value={editHoliday.approvedDate}
          onChange={handleEditInputChange}
        />
      </FormGroup>
      </Col>
      </Row>
      <Col>
      <FormGroup>
        <Label htmlFor="status">Created Date:</Label>
        <Input
          type="text"
          id="status"
          name="status"
          placeholder="Status"
          value={editHoliday.status}
          onChange={handleEditInputChange}
        />
      </FormGroup>
      </Col> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditSubmit}>
          <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
            Save
          </Button>
          <Button color="secondary" onClick={toggleEditModal}>
          <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};