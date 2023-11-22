import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./parent.css";

import "../Components/Style.css";
import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row,
  Toast,
} from "reactstrap";
import { toast } from "react-toastify";

export default function Subcontract_Export() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [id, setID] = useState("");

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dgdcStatus, setDgdcStatus] = useState("");
  
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () =>{

  }
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/export/list");
  //     setData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();


    const newRegistration = {
      id,
      search,
      startDate,
      endDate,
      dgdcStatus
    }
    console.log(newRegistration);


    // axios
    //   .post("http://localhost:8080/api/export/newExport", newRegistration)
    //   .then((response) => {
    //     console.log(newRegistration);
    //     toast.success("record added successfully", {
    //       position: "top-center",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle error
    //   });
  };

  const handleClear = () => {
    // Clear the form fields
    setID("");
    
    setDgdcStatus("");
    setSearch("");

    setStartDate("");
    setEndDate("");
  };

  const handleEdit = (item) => {
    setSelectedData(item);

    setID(item.id);

    setSearch(item.search);

    setDgdcStatus(item.dgdcStatus);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
console.log(item);

    // axios
    //   .post("http://localhost:8080/api/export/simple", item)
    //   .then((response) => {
    //     console.log(item);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle error
    //   });
  };

  const handleDelete = (item) => {
    console.log(item);
    // axios
    //   .delete(`http://localhost:8080/api/export/deleteItem/${item.id}`)
    //   .then((response) => {
    //     toast.success("Item deleted successfully", { position: "top-center" });
    //     console.log("Item deleted successfully");
    //     // Perform any additional actions or updates as needed
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting item:", error);

    //     toast.error("error", { position: "top-center" });
    //     // Handle any errors that occurred during the request
    //   });
  };

  return (
    <div className="">
      <p style={{ fontWeight: "bold" }}>Subcontract Export List</p>
      <Card>
        <form
          onSubmit={handleSubmit}
          action="/form"
          style={{
            paddingTop: 18,
          }}
        >
          <div className="container ">
            <Container>
              <Card>
                <CardBody>
                  <form>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <label className="label" htmlFor="search">
                            Search By
                          </label>
                          <input
                            type="text"
                            id="search"
                            className="form-control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <label className="label" htmlFor="startDate">
                            SB Date
                          </label>

                          <Row md={6}>
                            <Col md={6}>
                              <input
                                type="date"
                                id="startDate"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </Col>

                            <Col md={6}>
                              <input
                                type="date"
                                id="endDate"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                              />
                            </Col>
    
                          </Row>
    
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                      <label className="label" htmlFor="dgdcStatus">
                          Dgdc Status
                        </label>
                        <select
                          id="dgdcStatus"
                          className="form-control  form-select"
                          value={dgdcStatus}
                          onChange={(e) => setDgdcStatus(e.target.value)}
                          required
                        >
                          <option value="">-Any-</option>
                          <option value="Pending">Pending</option>
                          <option value="Handed over to Party/CHA">
                            Handed over to Party/CHA
                          </option>
                          <option value="Handed over to Dgdc Seepz">
                            Handed over to DGDC SEEPZ
                          </option>
                          <option value="Entry at DGDC SEEPZ Gate">
                            Entry at DGDC SEEPZ Gate
                          </option>
                          <option value="Exit From DGDC SEEPZ Gate">
                            Exit From DGDC SEEPZ Gate
                          </option></select>
                                          
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        </Col>
                      <Col md={4}>
                        </Col>
                      <Col md={4}>
                        </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                      </Col>
                      <Col md={4}>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <div
                            style={{
                              alignItems: "center",
                              marginTop: "25px",
                            }}
                          >
                            <button
                              type="submit"
                              className="btn btn-success btn-lg "
                              style={{ marginRight: 18 }}
                            >
                              SEARCH
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger btn-lg btn2"
                              onClick={handleClear}
                            >
                              RESET
                            </button>
                          </div>{" "}
                        </FormGroup>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Container>
            <Card
              style={{
                marginTop: 30,
                marginRight: 12,
                marginLeft: 12,
              }}
            >
              <CardBody>
                <table
                  rules="all"
                  className="table table-striped table-hover table-overflow-x:auto"
                >
                  <thead  style={{
                    color:"#ff9900",
                  }}>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Request ID</th>
                      <th scope="col">SER No</th>
                      <th scope="col">SER Date</th>
                      <th scope="col">Export Name</th>
                      <th scope="col">No. Of Packages</th>


                      <th scope="col">Passed-Out Net Weight</th>
                      <th scope="col">DGDC Status</th>
                      <th scope="col">NSDL Status</th>
                      

                      <th scope="col" className="fa fa-align-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>

            <div></div>
          </div>
        </form>
      </Card>
    </div>
  );
}