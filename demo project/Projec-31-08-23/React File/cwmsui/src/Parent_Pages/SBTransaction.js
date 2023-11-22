import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./parent.css";

import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Toast,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSave,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
export default function SBTransaction() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const location = useLocation();
  const selectedItem = location.state.selectedItem;

  console.log(selectedItem);

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

  const initialFormData = {
    companyId: companyid,
    branchId: branchId,
    sbNo: "",
    sbRequestId: "",
    sbDate: " ",
    iecCode: " ",
    entityId: " ",
    nameOfExporter: "",
    serNo: "",
    grossWeight: "",
    uomGrossWeight: "",
    countryOfDestination: "",
    portOfDestination: "",
    airwayBillNo: "",
    descriptionOfGoods: "",
    nsdlStatus: "",
    dgdcStatus: "",
    chaNo: "",
    chaName: "",
    consoleAgent: "",
    fobValueInINR: "",
    noOfPackages: "",
    uomOfPackages: "",
    status: "",
    createdBy: "",
    editedBy: "",
    approvedBy: "",
  };

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        ...selectedItem,
      });
    }
  }, [selectedItem]);

  const [formErrors, setFormErrors] = useState({
    sbRequestId: "",
    sbNo: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    const updatedFormData = {
      ...formData,
      editedBy: username, // You can replace this with the actual value from context
      createdBy: username, // You can replace this with the actual value from context
    };

    if (!updatedFormData.sbRequestId) {
      setFormErrors({
        ...formErrors,
        sbRequestId: "SB Request Id is required.",
      });
      return;
    }

    if (!updatedFormData.sbNo) {
      setFormErrors({ ...formErrors, sbNo: "SB No is required." });
      return;
    }

    // Clear error messages
    setFormErrors({ sbRequestId: "", sbNo: "" });

    axios
      .post("http://localhost:8080/export/save", updatedFormData)
      .then((response) => {
        // console.log(response.data); // Print the form data to the console
        toast.success("Shipping Bill Details Added Successfully", "success");
        setFormData(response.data);
      });

    // console.log(updatedFormData); // Print the form data to the console
  };

  const handleSave = (e) => {
    const updatedFormData = {
      ...formData,
      approvedBy: username, // You can replace this with the actual value from context
      editedBy: username, // You can replace this with the actual value from context
      createdBy: username, // You can replace this with the actual value from context
    };

    axios
      .post("http://localhost:8080/export/submit", updatedFormData)
      .then((response) => {
        // console.log(response.data); // Print the form data to the console

        setFormData(response.data);
        toast.success("Shipping Bill Details Added Successfully", "success");
      });

    setFormData(updatedFormData);

    // console.log(updatedFormData); // Print the form data to the console
  };
  const [selectedDate, setSelectedDate] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelectedDate(new Date()); // Set the selected date to the current date
    }
  };
  const [errors, setErrors] = useState({});

  const resetFormData = () => {
    setIsReadOnly(false); // Enable editing when "Clear" is clicked

    setFormData(initialFormData);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [isReadOnly, setIsReadOnly] = useState(true);
  const today = new Date(); // Today's date

  const [JarListDtlDGDC, setJarListDtlDGDC] = useState([]);

  useEffect(() => {
    getlist();
  }, []);

  const getlist = () => {
    axios
      .get(`http://localhost:8080/jardetail/jarIdList/${"J00009"}`)
      .then((response) => {
        // console.log("GET list response:", response.data);
        setJarListDtlDGDC(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const [JarListDtlConsole, setJarListDtlConsole] = useState([]);

  useEffect(() => {
    getlistConsole();
  }, []);

  const getlistConsole = () => {
    axios
      .get(`http://localhost:8080/jardetail/jarIdList/${"J00007"}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtlConsole(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <p style={{ fontWeight: "bold" }}>SBTransaction Entry</p>
        </div>
      </div>

      <Card>
        <CardBody>
          <Form onSubmit={handleSave}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    SB Request Id
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sbRequestId"
                    name="sbRequestId"
                    value={formData.sbRequestId}
                    onChange={(e) =>
                      setFormData({ ...formData, sbRequestId: e.target.value })
                    }
                    readOnly={!isReadOnly}
                    
                  />

                  <div className="error-message">{formErrors.sbRequestId}</div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbNo">
                    SB No
                  </label>
                  <input
                    type="text"
                    id="sbNo"
                    className="form-control"
                    name="sbNo"
                    value={formData.sbNo}
                    onChange={(e) =>
                      setFormData({ ...formData, sbNo: e.target.value })
                    }
                    readOnly={isReadOnly}
                    required
                  />
                  <div className="error-message">{formErrors.sbNo}</div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <label className="forlabel bold-label" htmlFor="sbDate">
                  SB Date
                </label>
                <div>
                  <div className="input-group">
                    {/* <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      id="sbDate"
                      value={selectedDate}
                      name="sbDate"
                      onKeyDown={handleKeyDown} // Add this event handler
                    
                    
                    /> */}
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      minDate={today}
                      dateFormat="dd/MM/yyyy"
                      value={formData.sbDate} // Set the value from the database
                      className="form-control"
                      customInput={
                        <input
                          style={{
                            height: "45px",
                            width: "18vw",
                            borderColor: errors.cfsValidateDate
                              ? "#f52b2b"
                              : "",
                          }}
                        />
                      }
                      onKeyDown={handleKeyDown} // Add this event handler
                    />
                  </div>{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="iecCode">
                    IEC Code
                  </label>
                  <input
                    type="text"
                    id="iecCode"
                    className="form-control"
                    name="iecCode"
                    value={formData.iecCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        iecCode: e.target.value,
                      })
                    }
                    readOnly={isReadOnly}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="entityId">
                    Entity Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="entityId"
                    name="entityId"
                    value={formData.entityId}
                    onChange={(e) =>
                      setFormData({ ...formData, entityId: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="nameOfExporter"
                  >
                    Name Of Exporter
                  </label>
                  <input
                    type="text"
                    id="nameOfExporter"
                    className="form-control"
                    name="nameOfExporter"
                    value={formData.nameOfExporter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nameOfExporter: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="serNo">
                    SER No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serNo"
                    name="serNo"
                    value={formData.serNo}
                    onChange={(e) =>
                      setFormData({ ...formData, serNo: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="grossWeight">
                    Gross Weight
                  </label>
                  <input
                    type="text"
                    id="grossWeight"
                    name="grossWeight"
                    className="form-control"
                    value={formData.grossWeight}
                    onChange={(e) =>
                      setFormData({ ...formData, grossWeight: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="uomGrossWeight"
                  >
                    UOM Gross Weight
                  </label>
                  <input
                    type="text"
                    id="uomGrossWeight"
                    className="form-control"
                    name="uomGrossWeight"
                    value={formData.uomGrossWeight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        uomGrossWeight: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="countryOfDestination"
                  >
                    Country Of Destination
                  </label>
                  <input
                    type="text"
                    id="countryOfDestination"
                    name="countryOfDestination"
                    className="form-control"
                    value={formData.countryOfDestination}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        countryOfDestination: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="portOfDestination"
                  >
                    Port Of Destination
                  </label>
                  <input
                    type="text"
                    id="portOfDestination"
                    name="portOfDestination"
                    className="form-control"
                    value={formData.portOfDestination}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portOfDestination: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="airwayBillNo">
                    Airway Bill No
                  </label>
                  <input
                    type="text"
                    id="airwayBillNo"
                    name="airwayBillNo"
                    className="form-control"
                    value={formData.airwayBillNo}
                    onChange={(e) =>
                      setFormData({ ...formData, airwayBillNo: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="descriptionOfGoods"
                  >
                    Description Of Goods
                  </label>
                  <input
                    type="text"
                    id="descriptionOfGoods"
                    className="form-control"
                    name="descriptionOfGoods"
                    value={formData.descriptionOfGoods}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionOfGoods: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="nsdlStatus">
                    NSDL Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nsdlStatus"
                    name="nsdlStatus"
                    value={formData.nsdlStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, nsdlStatus: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="dgdcStatus">
                    DGDC Status
                  </label>
                  <select
                    id="dgdcStatus"
                    className="form-control"
                    name="dgdcStatus"
                    value={formData.dgdcStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, dgdcStatus: e.target.value })
                    }
                  >
                    <option value="">Select DGDC Status</option>
                    {JarListDtlDGDC.map((item) => (
                      <option key={item.id} value={item.jarDtlDesc}>
                        {item.jarDtlDesc}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
            </Row>{" "}
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="chaNo">
                    CHA No
                  </label>
                  <input
                    type="text"
                    id="chaNo"
                    className="form-control"
                    name="chaNo"
                    value={formData.chaNo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        chaNo: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="chaName">
                    CHA Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="chaName"
                    name="chaName"
                    value={formData.chaName}
                    onChange={(e) =>
                      setFormData({ ...formData, chaName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="consoleAgent">
                    Console Agent
                  </label>
                  <select
                    id="consoleAgent"
                    className="form-control"
                    name="consoleAgent"
                    value={formData.consoleAgent}
                    onChange={(e) =>
                      setFormData({ ...formData, consoleAgent: e.target.value })
                    }
                  >
                    
                    <option value="BVC">BVC</option>
                    {JarListDtlConsole.map((item) => (
                      <option key={item.id} value={item.jarDtlDesc}>
                        {item.jarDtlDesc}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="fobValueInINR"
                  >
                    FOB Value In INR
                  </label>
                  <input
                    type="text"
                    id="fobValueInINR"
                    className="form-control"
                    name="fobValueInINR"
                    value={formData.fobValueInINR}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fobValueInINR: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="noOfPackages">
                    No Of Packages
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noOfPackages"
                    name="noOfPackages"
                    value={formData.noOfPackages}
                    onChange={(e) =>
                      setFormData({ ...formData, noOfPackages: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    htmlFor="uomOfPackages"
                    className="forlabel bold-label"
                  >
                    UOM Of Packages
                  </label>
                  <input
                    type="text"
                    id="uomOfPackages"
                    className="form-control"
                    name="uomOfPackages"
                    value={formData.uomOfPackages}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        uomOfPackages: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="status">
                    Status
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="status"
                    className="form-control"
                    style={{
                      backgroundColor: "#d9e6bf",
                    }}
                    name="status"
                    value={
                      formData.status === "N"
                        ? "New"
                        : formData.status === "E"
                        ? "Edit"
                        : formData.status === "A"
                        ? "Approved"
                        : ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="editedBy">
                    Edited By
                  </label>
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    id="editedBy"
                    name="editedBy"
                    value={formData.editedBy}
                    style={{
                      backgroundColor: "#d9e6bf",
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, editedBy: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label htmlFor="createdBy" className="forlabel bold-label">
                    Create By
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="editedBy"
                    className="form-control"
                    style={{
                      backgroundColor: "#d9e6bf",
                    }}
                    name="editedBy"
                    value={formData.editedBy}
                    onChange={(e) =>
                      setFormData({ ...formData, editedBy: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>

        <CardFooter>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger btn-margin"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "15px" }} />
              SUBMIT
            </button>
            <button
              className="btn btn-outline-danger btn-margin"
              onClick={resetFormData}
            >
              <FontAwesomeIcon
                icon={faSyncAlt}
                style={{ marginRight: "15px" }}
              />
              CLEAR
            </button>
            <button
              className="btn btn-outline-danger btn-margin"
              onClick={() => navigate("/parent/export")}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ marginRight: "15px" }}
              />
              BACK
            </button>
          </div>
        </CardFooter>
      </Card>

      {/* <h2>Form Data Preview:</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
}