import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table, Card, CardBody, Button } from "reactstrap";
import { saveAs } from 'file-saver';
import axios from "axios";
import * as XLSX from "xlsx";
import PartyListTable from './PartyListTable';
import ipaddress from '../Components/IpAddress';

const ManageParty = ({ parties = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParties, setFilteredParties] = useState([]);
  const reactPageName = 'Manage Party';

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
     
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // Filter parties based on partyName
    const query = searchQuery.toLowerCase();
    const filteredData = parties.filter((party) =>
      party.partyName.toLowerCase().includes(query)
    );
    setFilteredParties(filteredData);
  };

  const handleResetClick = () => {
    setSearchQuery('');
    // Implement the logic for button 1 here
    console.log("Button 1 clicked");

  };

  const handleButton2Click = async () => {
    try {
      // Fetch all parties data from the server
      const response = await axios.get(`http://${ipaddress}:8080/parties/getAll`);
      const partiesData = response.data;

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Add a worksheet
      const worksheet = XLSX.utils.json_to_sheet(partiesData);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Parties");

      // Generate the XLS file
      const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });

      // Convert XLS file to a Blob
      const blob = new Blob([s2ab(xlsFile)], { type: "application/vnd.ms-excel" });

      // Save the file with a specific filename
      saveAs(blob, "parties.xls");
    } catch (error) {
      console.error("Error fetching parties data:", error);
      // Handle error and display an error message if necessary.
      alert("Failed to fetch parties data. Please try again.");
    }
  };

   // Helper function to convert s2ab
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };


  const handleAddNewClick = () => {
    // Implement the logic for the "Add New" button here
    console.log("Add New clicked");
  };
  


  return (
    <html>
      <body>
        <Card>
          <CardBody>
            <div>
              <h5>Manage Party User</h5>
            </div>
            <a href="/parent/party-form">
              <Button
                variant="secondary"
                onClick={handleAddNewClick}
                style={{
                  float:'right',
                }}
                className="btn btn-ligh"
               >
                Add Party
              </Button>
            </a>
            <Card className="c">
              Search By
              <Form>
                <Row className="align-items-center">
                  <Col sm={7}>
                    <Form.Group controlId="searchInput">
                      <Form.Control
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search Party"
                        className="bt"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={5}>
                    <Button
                      color="info"
                      className="w-33 bt"
                      outline
                      onClick={handleSearchClick}
                    >
                      Search
                    </Button>
                    <Button
                      color="danger"
                      type="reset"
                      outline
                      onClick={handleResetClick}
                      className="w-33 mx-2 bt"
                    >
                      Reset
                    </Button>
                    <Button
                      color="warning"
                      outline
                      onClick={handleButton2Click}
                      className="w-33 bt"
                    >
                      XLS
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </CardBody>
        </Card>
        {filteredParties.length > 0 && (
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Party ID</th>
                <th>Party Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>IEC No</th>
                <th>Entity ID</th>
                <th>Credit Limit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredParties.map((party) => (
                <tr key={party.partyId}>
                  <td>{party.partyId}</td>
                  <td>{party.partyName}</td>
                  <td>{party.email}</td>
                  <td>{party.mobileNo}</td>
                  <td>{party.iecNo}</td>
                  <td>{party.entityId}</td>
                  <td>{party.creditLimit}</td>
                  <td>{party.status==='N'?'New':party.status==='E'?"Edit":party.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </body>
      <PartyListTable/>
    </html>
  );
};

export default ManageParty;