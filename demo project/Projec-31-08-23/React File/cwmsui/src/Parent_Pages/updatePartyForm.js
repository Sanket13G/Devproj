import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import ipaddress from '../Components/IpAddress';

const UpdatePartyForm = ({ party, isOpen, toggleModal, fetchParties }) => {
  const [editedParty, setEditedParty] = useState({
    partyId:party.partyId,
    unitAdminName: party.unitAdminName,
    branchId:party.branchId,
    partyName: party.partyName,
    address1: party.address1,
    address2: party.address2,
    address3: party.address3,
    unitType: party.unitType,
    city: party.city,
    state: party.state,
    country: party.country,
    email: party.email,
    phoneNo: party.phoneNo,
    mobileNo: party.mobileNo,
    partyCode: party.partyCode,
    erpCode: party.erpCode,
    creditLimit: party.creditLimit,
    iecNo: party.iecNo,
    entityId: party.entityId,
    panNo: party.panNo,
    gstNo: party.gstNo,
    loaNumber: party.loaNumber,
    loaIssueDate: party.loaIssueDate,
    loaExpiryDate: party.loaExpiryDate,
    createdBy: party.createdBy,
    createdDate: party.createdDate,
    editedBy: party.editedBy,
    editedDate: party.editedDate,
    approvedBy: party.approvedBy,
    approvedDate: party.approvedDate,
    status: party.status,
  });
  const reactPageName = 'Update Party Form';

  useEffect(() => {
    setEditedParty({ ...party });
  }, [party]);

  const formatDate = (dateString) => {
      const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;

  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for PAN card format (Alphanumeric with exactly 10 characters)
    if (name === 'panNo') {
      const panPattern = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
      if (!panPattern.test(value)) {
        toast.error('Invalid PAN Card number! Please enter a valid PAN number.', {
          position: 'top-center',
          autoClose: 2700,
        });
        return;
      }
    }

    // Validation for mobile number (10 digits only)
    if (name === 'mobileNo') 
    {
      const mobilePattern = /^\d{10}$/;
      if (!mobilePattern.test(value)) {
        toast.error('Invalid mobile number! Please enter a 10-digit mobile number.', {
          position: 'top-center',
          autoClose: 2700,
        });
        return;
      }
    }
    if (name === 'loaIssueDate' || name === 'loaExpiryDate' /* Add other date fields if needed */) {
      setEditedParty((prevState) => ({
        ...prevState,
        [name]: formatDate(value),
      }));
    } else {
      setEditedParty((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    

    setEditedParty((prevState) => (
      {
      ...prevState,
      [name]: value,
    }));
  };

  

  const handleUpdate = async () => {
    try {
      // Send a PUT request to update the party data with the formData
      await axios.put(`http://${ipaddress}:8080/parties/update/${party.partyId}`, editedParty);
      toast.success('Party Updated Successfully !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
      // Close the update modal
      toggleModal();
      // Fetch the updated party list after updating
      fetchParties();
    } catch (error) {
      console.error('Error updating party:', error);
      // Handle error and display an error message if necessary.
      toast.error('Failed to update party !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
    }
  };

   return (
    <Modal isOpen={isOpen} toggle={toggleModal} style={{maxHeight:800,maxWidth:1000,wioverflow:'-moz-hidden-unscrollable'}}>
    <ModalHeader toggle={toggleModal}>Edit Party Details</ModalHeader>
    <ModalBody>
      <Form>
        <Row>
          <Col cd={3}>
        <FormGroup>
          <Label for="partyId">Party ID</Label>
          <Input
            type="text"
            name="partyId"
            value={editedParty.partyId}
            onChange={handleChange}
            disabled
          />
        </FormGroup>
        </Col>
        
        <Col>
        <FormGroup>
          <Label for="partyName">Party Name</Label>
          <Input
            type="text"
            name="partyName"
            value={editedParty.partyName}
            onChange={handleChange}
          />
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
          <Label for="address1">Address 1</Label>
          <Input
            type="text"
            name="address1"
            value={editedParty.address1}
            onChange={handleChange}
          />
        </FormGroup>
        </Col>
        </Row>
       <Row>
<Col cd={3}>
<FormGroup>
          <Label for="address2">Address 2</Label>
          <Input
            type="text"
            name="address2"
            value={editedParty.address2}
            onChange={handleChange}
          />
        </FormGroup>
</Col>
       </Row>
       <Row>
        <Col cd={3}> <FormGroup>
          <Label for="address3">Address 3</Label>
          <Input
            type="text"
            name="address3"
            value={editedParty.address3}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col> <FormGroup>
          <Label for="city">City</Label>
          <Input
            type="text"
            name="city"
            value={editedParty.city}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col> <FormGroup>
          <Label for="state">State</Label>
          <Input
            type="text"
            name="state"
            value={editedParty.state}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
       <Col cd={3}><FormGroup>
          <Label for="country">Country</Label>
          <Input
            type="text"
            name="country"
            value={editedParty.country}
            onChange={handleChange}
          />
        </FormGroup></Col>
       <Col> <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            value={editedParty.email}
            onChange={handleChange}
          />
        </FormGroup></Col>
       <Col> <FormGroup>
          <Label for="phoneNo">Phone No</Label>
          <Input
            type="text"
            name="phoneNo"
            value={editedParty.phoneNo}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
       <Col cd={3}> 
       <FormGroup>
            <Label for="mobileNo">Mobile No</Label>
            <Input
              type="text"
              name="mobileNo"
              value={editedParty.mobileNo}
              onChange={handleChange}
            />
          </FormGroup></Col>
       <Col> <FormGroup>
          <Label for="partyCode">Party Code</Label>
          <Input
            type="text"
            name="partyCode"
            value={editedParty.partyCode}
            onChange={handleChange}
          />
        </FormGroup></Col>
       <Col><FormGroup>
          <Label for="erpCode">ERP Code</Label>
          <Input
            type="text"
            name="erpCode"
            value={editedParty.erpCode}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row >
       <Col cd={3} ><FormGroup>
          <Label for="creditLimit">Credit Limit</Label>
          <Input
            type="text"
            name="creditLimit"
            value={editedParty.creditLimit}
            onChange={handleChange}
          />
        </FormGroup></Col>
       <Col> <FormGroup>
          <Label for="iecNo">IEC No</Label>
          <Input
            type="text"
            name="iecNo"
            value={editedParty.iecNo}
            onChange={handleChange}
          />
        </FormGroup></Col>
       <Col> <FormGroup>
          <Label for="entityId">Entity ID</Label>
          <Input
            type="text"
            name="entityId"
            value={editedParty.entityId}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
        <Col>
       <FormGroup>
            <Label for="panNo">PAN No</Label>
            <Input
              type="text"
              name="panNo"
              value={editedParty.panNo}
              onChange={handleChange}
            />
          </FormGroup>
          </Col>
        <Col> <FormGroup>
          <Label for="gstNo">GST No</Label>
          <Input
            type="text"
            name="gstNo"
            value={editedParty.gstNo}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col> <FormGroup>
          <Label for="loaNumber">LOA Number</Label>
          <Input
            type="text"
            name="loaNumber"
            value={editedParty.loaNumber}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
        <Col cd={3}> <FormGroup>
          <Label for="loaIssueDate">LOA Issue Date</Label>
          <Input
            type="datetime"
            name="loaIssueDate"
            value={editedParty.loaIssueDate}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col> <FormGroup>
          <Label for="loaExpiryDate">LOA Expiry Date</Label>
          <Input
            type="datetime"
            name="loaExpiryDate"
            value={editedParty.loaExpiryDate}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col> <FormGroup>
          <Label for="loaExpiryDate">Created By</Label>
          <Input
            type="text"
            name="createdBy"
            value={editedParty.createdBy}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
        {/* <Col cd={3}>  <FormGroup>
          <Label for="loaExpiryDate"> Created Date</Label>
          <Input
            type="datetime"
            name="createdDate"
            value={editedParty.createdDate}
            onChange={handleChange}
          />
        </FormGroup></Col> */}
        {/* <Col> <FormGroup>
          <Label for="loaExpiryDate">Edited By</Label>
          <Input
            type="text"
            name="editedBy"
            value={editedParty.editedBy}
            onChange={handleChange}
          />
        </FormGroup></Col> */}
        {/* <Col><FormGroup>
          <Label for="loaExpiryDate">Edited Date</Label>
          <Input
            type="datetime"
            name="editedDate"
            value={editedParty.editedDate}
            onChange={handleChange}
          />
        </FormGroup></Col> */}
       </Row>
       <Row>
       <Col cd={3}> <FormGroup>
          <Label for="loaExpiryDate">Approved By</Label>
          <Input
            type="text"
            name="approvedBy"
            value={editedParty.approvedBy}
            onChange={handleChange}
          />
        </FormGroup></Col>
       {/* <Col> <FormGroup>
          <Label for="loaExpiryDate"> Approved Date</Label>
          <Input
            type="datetime"
            name="approvedDate"
            value={editedParty.approvedDate}
            onChange={handleChange}
          />
        </FormGroup></Col> */}
       <Col> <FormGroup>
          <Label for="loaExpiryDate">Status</Label>
          <Input
            type="text"
            name="status"
            value={editedParty.status==='A'?'Approved':editedParty.status==='N'?'New':editedParty.status==='E'?'Edit':editedParty.status}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
       <Col>
              <FormGroup>
                 <Label for="approvedDate">Unit Admin Name:</Label>
                <Input
                  type="text"
                  name="unitAdminName"
                  value={editedParty.unitAdminName}
                  onChange={handleChange}
                />
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                 <Label for="unitType">Unit Type:</Label>
                <Input
                  type="text"
                  name="unitType"
                  value={editedParty.unitType}
                  onChange={handleChange}
                />
              </FormGroup>
              </Col>
       </Row>
       </Form>
    </ModalBody>
    <ModalFooter>
  <Button color="primary" onClick={handleUpdate}>
    Save
  </Button>
  <Button color="secondary" onClick={toggleModal}>
    Cancel
  </Button>
</ModalFooter>
  </Modal>
  );
};

export default UpdatePartyForm;