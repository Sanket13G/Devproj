import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Row, Col, Form } from "reactstrap";
import "../Parent_Pages/parent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const EditModal = ({ isOpen, toggleModal, handleSubmit, handleChange, formData }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      style={{
        maxWidth: 900,
        maxHeight: 200,
      }}
    >
      <ModalHeader toggle={toggleModal} style={{ backgroundColor: "#ff9900" }}>Editing {formData.airlineName}</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <div className="form-group">
                    <label className="forlabel">Airline Name </label>
                    <input
                      type="text"
                      name="airlineName"
                      className="form-control"
                      value={formData.airlineName}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label className="forlabel">Airline Short Name</label>
                    <input
                      type="text"
                      name="airlineShortName"
                      className="form-control"
                      value={formData.airlineShortName}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label className="forlabel">Airline Code </label>
                    <input
                      type="text"
                      name="airlineCode"
                      className="form-control"
                      value={formData.airlineCode}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label className="forlabel">Flight No</label>
                    <input
                      type="text"
                      name="flightNo"
                      readOnly
                      className="form-control"
                      value={formData.flightNo}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label className="forlabel">Airline Description</label>
                    <input
                      type="text"
                      name="airlineDesc"
                      className="form-control"
                      value={formData.airlineDesc}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
      <button
          className="btn btn-outline-danger btn-margin"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faSave} style={{ marginRight: "15px" }} />
          SUBMIT CHANGES
        </button>
        <button
          className="btn btn-outline-danger btn-margin"
          onClick={toggleModal}>
        
          <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: "15px" }} />
          CLEAR
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;