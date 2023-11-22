import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Input,
  Form,
  Button,
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
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

export default function Detection_List() {
 
  const [detinations, setDetinations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const [newDetention, setNewDetention] = useState({
    fileNumber: "",
    dateOfDeposite: "",
    parcleDetainedBy: "",
    officerName: "",
    officerDesignation: "",
    dgdcOfficerName: "",
    dgdcOfficerDesignation: "",
    noOfBox: "",
    typeOfParcle: "",
    partyName: "",
    remark: "",
    status:"A"
    // Add more fields as needed
  });

  const resetForm = () => {
    setNewDetention({
      fileNumber: "",
      dateOfDeposite: "",
      parcleDetainedBy: "",
      officerName: "",
      officerDesignation: "",
      dgdcOfficerName: "",
      dgdcOfficerDesignation: "",
      noOfBox: "",
      typeOfParcle: "",
      partyName: "",
      remark: "",
    });
  };
  const [editDetention, setEditDetention] = useState({

    fileNumber: newDetention.fileNumber,
    dateOfDeposite:newDetention.dateOfDeposite,
    parcleDetainedBy:newDetention.parcleDetainedBy,
    officerName: newDetention.officerName,
    officerDesignation: newDetention.officerDesignation,
    dgdcOfficerName: newDetention.dgdcOfficerName,
    dgdcOfficerDesignation: newDetention.dgdcOfficerDesignation,
    noOfBox:newDetention.noOfBox,
    typeOfParcle: newDetention.typeOfParcle,
    partyName: newDetention.partyName,
    remark: newDetention.remark,
    status:"A"
  });
  //   useEffect(() => {
  //     fetchHolidays();
  //   }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDetention({
      ...newDetention,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("New Detination Data:", newDetention);
    
    setDetinations([...detinations, newDetention]);

    // Reset the form fields
    resetForm();
    toggleModal();



  };

  const handleEdit = (detination) => {
    setEditDetention(detination);
    toggleEditModal();
  };

  

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetention((prevDetention) => ({
      ...prevDetention,
      [name]: value,
    }));
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    // Update the edited detination data in the detinations array
    const updatedDetinations = detinations.map((detination) =>
      detination === editDetention ? editDetention : detination
    );
    setDetinations(updatedDetinations);
    toggleEditModal();
  };

  const handleDelete = async (fileNumber) => {
    // Filter out the data with the provided fileNumber
    const updatedDetinations = detinations.filter(
      (detination) => detination.fileNumber !== fileNumber
    );
    setDetinations(updatedDetinations);
  };

  const generateXLS = () => {
    const ws = XLSX.utils.json_to_sheet(detinations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Detention Data");
    const xlsFileName = "detention_data.xlsx";
    XLSX.writeFile(wb, xlsFileName);
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
          </h5>
        </div>
        <Card style={{ paddingTop: 18, paddingRight: 18 }}>
          <h5 style={{ paddingLeft: 18 }}>Detination List</h5>
          <div>
            <Container>
              <Row style={{ float: "right" }}>
                <Button
                  style={{ float: "right" }}
                  color="danger"
                  onClick={toggleModal}
                >
                  ADD NEW
                </Button>{" "}
              </Row>
              <br />
              <br />

              <Row style={{ float: "right" }}>
                <Button
                  style={{ float: "right", marginRight: "10px" }}
                  color="success"
                  onClick={generateXLS}
                >
                  XLS
                </Button>{" "}
              </Row>
            </Container>
          </div>

          <CardBody>
            <Table striped responsive>
              <thead>
                <tr>
                  <th>File No.</th>
                  <th>Deposite Date</th>
                  <th>Party Name</th>
                  <th>Other Party Nam</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Number Of Parcels</th>
                  <th>Type Of Parcels</th>
                  <th style={{ textAlign: "center" }}>Action </th>
                </tr>
              </thead>
              <tbody>
                {detinations.map((detination) => (
                  <tr key={detination.fileNumber}>
                    <td>{detination.fileNumber}</td>
                    <td>{detination.dateOfDeposite}</td>
                    <td>{detination.partyName}</td>
                    <td>{detination.partyName}</td>
                    <td>{detination.remark}</td>
                    <td>{detination.status}</td>
                    <td>{detination.noOfBox}</td>
                    <td>{detination.typeOfParcle}</td>
                    {/* Add more table data */}
                    <td>
                      <Button
                        onClick={() => handleEdit(detination)}
                        color="warning"
                        outline
                      >
                        Edit
                      </Button>
                      <Button 
                        style={{ paddingLeft: 9 ,marginLeft:9}}
                        onClick={() => handleDelete(detination.fileNumber)}
                        color="danger"
                        outline
                       
                      >
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
          style={{ backgroundColor: "#ff9900" }}
        >
          Add New Detention Record
        </ModalHeader>
        <ModalBody style={{ backgroundColor: " #ffebcc" }}>
          <Form onSubmit={handleSubmit} style={{}} id="myfrom">
            <Card style={{ paddingBottom: 9 }}>
              {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}
              <CardBody>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <div style={{ float: "left" }}>
                            <Label
                              htmlFor="holidayName"
                              style={{ fontWeight: "bold" }}
                            >
                              File Number:
                            </Label>
                          </div>
                          <Input
                            type="text"
                            // id="holidayName"
                            name="fileNumber"
                            // placeholder="Holiday Name"
                            value={newDetention.fileNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <div div style={{ float: "left" }}>
                            <Label
                              htmlFor="holidayDate"
                              style={{ fontWeight: "bold" }}
                            >
                              Date Of Deposite:
                            </Label>
                          </div>
                          <Input
                            type="date"
                            // id="holidayDate"
                            name="dateOfDeposite"
                            // placeholder="Holiday date "
                            value={newDetention.dateOfDeposite}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <div style={{ float: "left" }}>
                            <Label
                              htmlFor="holidayDay"
                              style={{ fontWeight: "bold" }}
                            >
                              Parcle Detained By:
                            </Label>
                          </div>
                          <Input
                            type="select"
                            // id="holidayDay"
                            name="parcleDetainedBy"
                            // placeholder="Holiday Day"
                            value={newDetention.parcleDetainedBy}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select an option</option>
                            <option value="Person A">Person A</option>
                            <option value="Person B">Person B</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <div style={{ paddingTop: 18 }}>
                  <Card>
                    <ModalHeader
                      toggle={toggleModal}
                      style={{ backgroundColor: "#ff9900" }}
                    >
                      Depostited By
                    </ModalHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                Officer Name:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDate"
                              name="officerName"
                              // placeholder="Holiday date "
                              value={newDetention.officerName}
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
                                Officer Designation:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDay"
                              name="officerDesignation"
                              // placeholder="Holiday Day"
                              value={newDetention.officerDesignation}
                              onChange={handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>

                <div style={{ paddingTop: 18 }}>
                  <Card>
                    <ModalHeader
                      toggle={toggleModal}
                      style={{ backgroundColor: "#ff9900" }}
                    >
                      Recevied By
                    </ModalHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                DGDC Officer Name:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDate"
                              name="dgdcOfficerName"
                              // placeholder="Holiday date "
                              value={newDetention.dgdcOfficerName}
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
                                DGDC Officer Designation:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDay"
                              name="dgdcOfficerDesignation"
                              // placeholder="Holiday Day"
                              value={newDetention.dgdcOfficerDesignation}
                              onChange={handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
                <div style={{ paddingTop: 18 }}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                No. Of Box:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDate"
                              name="noOfBox"
                              // placeholder="Holiday date "
                              value={newDetention.noOfBox}
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
                                Type Of Parcel:
                              </Label>
                            </div>
                            <Input
                              type="select"
                              // id="holidayDay"
                              name="typeOfParcle"
                              // placeholder="Holiday Day"
                              value={newDetention.typeOfParcle}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select an option</option>
                              <option value="Person A">Person A</option>
                              <option value="Person B">Person B</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                Party Name:
                              </Label>
                            </div>
                            <Input
                              type="select"
                              // id="holidayDate"
                              name="partyName"
                              // placeholder="Holiday date "
                              value={newDetention.partyName}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select an option</option>
                              <option value="Person A">Party A</option>
                              <option value="Person B">Party B</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDay"
                                style={{ fontWeight: "bold" }}
                              >
                                a
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDay"
                              // name="holidayDay"
                              // placeholder="Holiday Day"
                              // value={newDetention.holidayDay}
                              onChange={handleInputChange}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDay"
                                style={{ fontWeight: "bold" }}
                              >
                                Remarks:
                              </Label>
                            </div>
                            <Input
                              type="textarea"
                              id="holidayDay"
                              rows={5}
                              name="remark"
                              // placeholder="Holiday Day"
                              value={newDetention.remark}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} outline>
            Submit
          </Button>
          <Button color="secondary" onClick={toggleModal} outline>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* #ffebcc // orange
      #f7f7f7 // grey
      #ebf2f9// light blue */}


<Modal isOpen={editModalOpen} toggle={toggleEditModal} style={{ maxWidth: 900 }}>
  <ModalHeader toggle={toggleEditModal} style={{ backgroundColor: "#ff9900" }}>
    Edit Detention Record
  </ModalHeader>
  <ModalBody style={{ backgroundColor: " #ffebcc" }}>
    <Form onSubmit={handleEditSubmit} style={{}} id="editForm">
    <Card style={{ paddingBottom: 9 }}>
              {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}
              <CardBody>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <div style={{ float: "left" }}>
                            <Label
                              htmlFor="holidayName"
                              style={{ fontWeight: "bold" }}
                            >
                              File Number:
                            </Label>
                          </div>
                          <Input
                            type="text"
                            // id="holidayName"
                            name="fileNumber"
                            // placeholder="Holiday Name"
                            value={editDetention.fileNumber}
                            onChange={handleEditInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <div div style={{ float: "left" }}>
                            <Label
                              htmlFor="holidayDate"
                              style={{ fontWeight: "bold" }}
                            >
                              Date Of Deposite:
                            </Label>
                          </div>
                          <Input
                            type="date"
                            // id="holidayDate"
                            name="dateOfDeposite"
                            // placeholder="Holiday date "
                            value={editDetention.dateOfDeposite}
                            onChange={handleEditInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <div style={{ float: "left" }}>
                            <Label
                              htmlFor="holidayDay"
                              style={{ fontWeight: "bold" }}
                            >
                              Parcle Detained By:
                            </Label>
                          </div>
                          <Input
                            type="select"
                            // id="holidayDay"
                            name="parcleDetainedBy"
                            // placeholder="Holiday Day"
                            value={editDetention.parcleDetainedBy}
                            onChange={handleEditInputChange}
                            required
                          >
                            <option value="">Select an option</option>
                            <option value="Person A">Person A</option>
                            <option value="Person B">Person B</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <div style={{ paddingTop: 18 }}>
                  <Card>
                    <ModalHeader
                      toggle={toggleModal}
                      style={{ backgroundColor: "#ff9900" }}
                    >
                      Depostited By
                    </ModalHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                Officer Name:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDate"
                              name="officerName"
                              // placeholder="Holiday date "
                              value={editDetention.officerName}
                              onChange={handleEditInputChange}
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
                                Officer Designation:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDay"
                              name="officerDesignation"
                              // placeholder="Holiday Day"
                              value={editDetention.officerDesignation}
                              onChange={handleEditInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>

                <div style={{ paddingTop: 18 }}>
                  <Card>
                    <ModalHeader
                      toggle={toggleModal}
                      style={{ backgroundColor: "#ff9900" }}
                    >
                      Recevied By
                    </ModalHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                DGDC Officer Name:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDate"
                              name="dgdcOfficerName"
                              // placeholder="Holiday date "
                              value={editDetention.dgdcOfficerName}
                              onChange={handleEditInputChange}
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
                                DGDC Officer Designation:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDay"
                              name="dgdcOfficerDesignation"
                              // placeholder="Holiday Day"
                              value={editDetention.dgdcOfficerDesignation}
                              onChange={handleEditInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
                <div style={{ paddingTop: 18 }}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                No. Of Box:
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDate"
                              name="noOfBox"
                              // placeholder="Holiday date "
                              value={editDetention.noOfBox}
                              onChange={handleEditInputChange}
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
                                Type Of Parcel:
                              </Label>
                            </div>
                            <Input
                              type="select"
                              // id="holidayDay"
                              name="typeOfParcle"
                              // placeholder="Holiday Day"
                              value={editDetention.typeOfParcle}
                              onChange={handleEditInputChange}
                              required
                            >
                              <option value="">Select an option</option>
                              <option value="Person A">Person A</option>
                              <option value="Person B">Person B</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup>
                            <div div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDate"
                                style={{ fontWeight: "bold" }}
                              >
                                Party Name:
                              </Label>
                            </div>
                            <Input
                              type="select"
                              // id="holidayDate"
                              name="partyName"
                              // placeholder="Holiday date "
                              value={editDetention.partyName}
                              onChange={handleEditInputChange}
                              required
                            >
                              <option value="">Select an option</option>
                              <option value="Person A">Party A</option>
                              <option value="Person B">Party B</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDay"
                                style={{ fontWeight: "bold" }}
                              >
                                a
                              </Label>
                            </div>
                            <Input
                              type="text"
                              // id="holidayDay"
                              // name="holidayDay"
                              // placeholder="Holiday Day"
                              // value={newDetention.holidayDay}
                              onChange={handleEditInputChange}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <div style={{ float: "left" }}>
                              <Label
                                htmlFor="holidayDay"
                                style={{ fontWeight: "bold" }}
                              >
                                Remarks:
                              </Label>
                            </div>
                            <Input
                              type="textarea"
                              id="holidayDay"
                              rows={5}
                              name="remark"
                              // placeholder="Holiday Day"
                              value={editDetention.remark}
                              onChange={handleEditInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" form="editForm" type="submit" outline>
      Save Changes
    </Button>
    <Button color="secondary" onClick={toggleEditModal} outline>
      Cancel
    </Button>
  </ModalFooter>
</Modal>
    </div>
  );
};
