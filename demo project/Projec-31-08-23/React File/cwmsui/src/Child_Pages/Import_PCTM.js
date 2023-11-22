import { Link, redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Select from "react-select"; // Import Select component for dropdown
import { Table } from "reactstrap";
import PDFReport from "./PDFReport";

export default function Import_PCTM() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  

  const [airlines, setAirlines] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState("");

  const [selectedAirlineFlightdate,setSelectedAirlineFilghtDate]=useState("");

  const [importData, setImportData] = useState([]);
  const [importAllData, setImportAllData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [pdfReportData, setPDFReportData] = useState([]);

  const [showPDFReport, setShowPDFReport] = useState(false); // State for PDF report visibility

  const companyId = "C00001";
  const branchId = "B00001";

  const formattedStartDate = `${startDate} 00:00`;
  const formattedEndDate = `${endDate} 23:59`;

  const importFields = [
    "MAWB",
    "HAWB",
    "SIR_No",
    "Imp_Trans_Date",
    "IGM_No",
    "IGM_Date",
    "PCTM_No",
    "TP_No",
    "TP_Date",
    "Airline_Name",
    "Flight_No",
    "Flight_Date",
    "Country_Origin",
    "Port_Origin",
    "Importer_Id",
    "IEC",
    "SEZ_Entity_Id",
    "Console",
    "Package_Content_Type",
    "Parcel_Type",
    "UOM_Packages",
    "Nop",
    "Import_Remarks",
    "Description_Of_Goods",
    "CHA_CDE",
    "Assessable_Value",
    "Gross_Weight",
    "BE_Request_ID",
    "BE_No",
    "BE_Date",
    "Import_Address",
    "Status",
    "Sir_Date",
    "Created_By",
    "Created_Date",
    "Edited_By",
    "Edited_Date",
    "Approved_By",
    "Approved_Date",
  ];

  // Create a form state object with initial values for each field
  const initialFormState = {};
  importFields.forEach((field) => {
    initialFormState[field] = "";
  });

  const [formData, setFormData] = useState(initialFormState);
  // Function to handle the "SEARCH" button click
  const handleSearch = () => {
    // Make an API request here to fetch the list of airline names based on the provided criteria
    fetch(
      `http://localhost:8080/import/airline-names?companyId=C00001&branchId=B00001&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Ensure that 'data' is an array before updating the 'airlines' state
        if (Array.isArray(data)) {
          // Update the 'airlines' state with the fetched data
          setAirlines(data);
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching airline names:", error);
      });
  };

  useEffect(() => {
    // Fetch airline names and preselect the first one when the component mounts
    handleSearch();
  }, []);

  const handleShow = () => {
    // You can use this function to display the fetched data in a table or perform other actions
    axios
      .get(
        `http://localhost:8080/import/importData?companyId=C00001&branchId=B00001&startDate=${formattedStartDate}&endDate=${formattedEndDate}&airlineName=${selectedAirline}`
      )
      .then((response) => {
        const importData = response.data; // Data for the selected airline
        setImportData(importData); // Update the state with the fetched data
        setShowTable(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // const generatePDFReport = () => {
  //   // Make an API request to fetch data for the selected airline
  //   axios
  //     .get(
  //       `http://localhost:8080/import/importData?companyId=C00001&branchId=B00001&startDate=${formattedStartDate}&endDate=${formattedEndDate}&airlineName=${selectedAirline}`
  //     )
  //     .then((response) => {
  //       const reportData = response.data; // Data for the selected airline
  //       setShowPDFReport(true);

  //       // Pass the data to the PDFReport component

  //       setPDFReportData(reportData);
  //       handleShow();
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };


  const generateAllPDFReport = () => {
    // Make an API request to fetch data for the selected airline
    axios
      .get(
        `http://localhost:8080/import/allimportData?companyId=C00001&branchId=B00001&startDate=${formattedStartDate}&endDate=${formattedEndDate}&airlineName=${selectedAirline}`
      )
      .then((response) => {
        const reportData = response.data; // Data for the selected airline
        setShowPDFReport(true);

        // Pass the data to the PDFReport component

        setImportAllData(reportData);
        handleShow();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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





  const [importAllDatalist, setImportAllDatalist] = useState([]);

useEffect(() => {
  // Fetch data from your backend API
  axios.get("http://localhost:8080/import/all").then((response) => {
    // Assuming your API response is an array of Import objects
    setImportAllDatalist(response.data);
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}, []);

console.log(formattedStartDate,' Date');
console.log(selectedAirline, 'Airline');
  
  return (
    <div className="" style={{ marginTop: 20 }}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item tabspace" role="presentation">
          <button
            style={{ color: "gray" }}
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            <h6>Generate</h6>
          </button>
        </li>

        <li className="nav-item tabspace" role="presentation">
          <button
            style={{ color: "gray" }}
            className="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            <h6>Print</h6>
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Card
            style={{
              marginTop: 25,
              marginRight: 18,
              marginLeft: 18,
              padding: 8,
            }}
          >
            <Container>
              <Form>
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="inputhead">
                        SIR Date From
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        placeholder=" "
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="inputhead">SIR Date To</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        placeholder=" "
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="success"
                      outline
                      style={{ marginTop: 32 }}
                      onClick={handleSearch}
                    >
                      SEARCH
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="inputhead">
                        Select Air Lines
                      </Form.Label>
                      {/* Use the Select component for the dropdown */}

                      <Select
                        name="airlines"
                        options={[
                          { label: "Select an Airline", value: "" }, // Placeholder/default value
                          ...airlines.map((airline) => ({
                            label: airline,
                            value: airline,
                          })),
                        ]}
                        value={{
                          label: selectedAirline,
                          value: selectedAirline,
                        }}
                        onChange={(option) => setSelectedAirline(option.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="danger"
                      outline
                      style={{ marginTop: 32 }}
                      onClick={handleShow}
                    >
                      Show
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card>
        </div>

        {showTable && (
          <div>
            <h5>Imported Data</h5>
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Airline Name</th>
                  <th>MAWB</th>
                  <th>Sir No</th>
                  <th>Sir Date</th>
                  <th>Parcle Type</th>
                  <th>HAWB</th>
                  <th>NOP</th>
                  {/* Add more column headers as needed */}
                </tr>
              </thead>
              <tbody>
                {importData.map((item, index) => (
                  <tr key={index}>
                     <td>{index + 1}</td>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    <td>{item[5]}</td>
                    <td>{item[6]}</td>
                    {/* Add more table cells as needed */}
                  </tr>
                ))}
              </tbody>
            </Table>

            <Link
              to={{
                path: "/pdfReport",
                state: {
                  importData: pdfReportData, // Pass the imported data to the PDFReport component
                  startDate: formattedStartDate,
                  endDate: formattedEndDate,
                  selectedAirline: selectedAirline,
                //  selectedAirlineFlightdate:selectedAirlineFlightdate,
                },
              }}
              style={{ float: "right", textDecorationColor: "red" }}
              onClick={generateAllPDFReport}
            >
              Generate PCTM
            </Link>

            {/* {showTable && <PDFReport data={importData} />} */}

            {showPDFReport && (
              <PDFReport
                data={importData}
                startDate={startDate}
                endDate={endDate}
                selectedAirline={selectedAirline}
                //selectedAirlineFlightdate={selectedAirlineFlightdate}
              />
            )}
          </div>
        )}

        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <Card
            style={{
              marginTop: 25,
              marginRight: 18,
              marginLeft: 18,
              padding: 8,
            }}
          >
            <Container>
              <Form>
                <Row>
                  <Col sm={2} style={{ marginRight: 30 }}>
                    <Form.Group
                      className="mb-3 inputSize"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="inputhead">
                        SIR Date From
                      </Form.Label>
                      <Form.Control type="date" placeholder=" " />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                 
                    <label
                      style={{ marginTop: 2, marginBottom: 9 }}
                      className="inputhead"
                      htmlFor=""
                    >
                      SIR Date To{" "}
                    </label>
                    <br />
                    <input className="dw3 marginfordrop" type="date" />

                    <Button variant="danger">SEARCH</Button>
                  </Col>
                  <Col sm={5}>
                    <label
                      htmlFor="company"
                      style={{ marginTop: 4, marginRight: 75 }}
                      className="inputhead"
                    >
                      Select Airlines
                    </label>
                    <label
                      htmlFor="company"
                      style={{ marginTop: 4 }}
                      className="inputhead"
                    >
                      Select Airlines
                    </label>
                    <br />
                    <select
                      name="company"
                      id="dw4"
                      className="marginfordrop"
                      style={{ marginRight: 20 }}
                    >
                      <option className="">Select</option>
                    </select>

                    <select name="company" id="dw4" className="marginfordrop">
                      <option className="">Select</option>
                    </select>

                    <Button style={{ marginBottom: 5 }} variant="danger">
                      SEARCH
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card>
        </div>
      </div>
    </div>
  );
}