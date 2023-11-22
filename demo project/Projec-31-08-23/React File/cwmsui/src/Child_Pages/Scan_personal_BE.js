import { redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { Button, CardBody, FormGroup, Toast } from "reactstrap";
import { toast } from "react-toastify";
import "../Components/Style.css";
import axios from "axios";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Scan_personal_BE() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const reactPageName = "Scan Personal BE";
  const [link, setLink] = useState("");
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

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

  const getScan={
    companyId: companyid,
    branchId: branchId,
    createdBy: username,
    editedBy: username,
    approvedBy: username,
    link: link,
    status: "A",
    

  }
  const handleSubmit = () => {

    getScan.companyId=companyid;
    getScan.branchId= branchId;
    getScan.createdBy= username;
    getScan.editedBy=username;
    getScan.approvedBy= username;
    
    axios.post('http://localhost:8080/export/readurlSBD', getScan)
      .then(response => {

       
        console.log('Post request successful:', response.data);


        navigate("/parent/SBTransaction", { state: { selectedItem: response.data } });
  
      })
      .catch(error => {
        // Handle error
        console.error('Error sending post request:', error);
      });
  };

  const handleClear = () => {
    setLink("");
    setResponseData(null);
  };

  const handleSave = () => {
    setLink("");
    setResponseData(null);
  };

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="app-container">
        <>
          <>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="label" htmlFor="link">
                    {/* Scan Personal BE-QR */}
                    <p style={{ fontWeight: "bold" }}> Scan Personal BE-QR</p>
                  </label>
                  <input
                    type="text"
                    id="link"
                    className="form-control"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Scan BE-QR"
                    style={{ marginLeft: "10px" }} // Apply inline style
                  />
                </FormGroup>
              </Col>
              <Col
                style={{ marginTop: 27, marginRight: 90, paddingRight: 90 }}
                md={2}
              >
                <Button
                  outline
                  color="danger"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ marginRight: "5px" }}
                  />
                  SCAN
                </Button>
              </Col>
            </Row>

            <div></div>
            <Container>
              {responseData && (
                <div>
                  <Card className="c searchCard">
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            DC Office:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.dcoffice}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            SEZ Name:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.sezname}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            SEZ Unit / Developer / Co-Developer:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.sezunitdevelopercodeveloper}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Import-Export Code:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.importexportcode}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Entity ID:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.entityid}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Port of Loading:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.portofloading}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Port of Destination:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.portofdestination}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Country of Destination:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.countryofdestination}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            SB No & Date:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.sbnodate}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className="LabelHeader">
                            Request Details:
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            value={responseData.requestdetails}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Request ID:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.requestid}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="LabelHeader">
                            Consignment Details:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.consignmentdetails}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className="LabelHeader">
                            Custom House Agent Name & Code:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.customhouseagentnamecode}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Assessment Date:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.assessmentdate}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Request Status:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.requeststatus}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className="LabelHeader">
                            Rotation Number & Date:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.rotationnumberdate}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Cargo Details:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.cargodetails}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="label label-default">
                            Net Realisable Value in Rs. :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={responseData.netrealisablevalueinrs}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <hr />
                    <br />
                    <Row className="justify-content-center">
                      <Col xs="auto">
                        <Button onClick={handleSave}>SAVE</Button>
                      </Col>

                      <Col xs="auto">
                        <Button
                          className="btn btn-danger"
                          onClick={handleClear}
                        >
                          Clear
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </div>
              )}
            </Container>
          </>
        </>
      </div>
    </>
  );
}