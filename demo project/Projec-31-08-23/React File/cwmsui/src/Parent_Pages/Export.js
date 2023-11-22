import AuthContext from "../Components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./parent.css";
import SBTransaction from "./SBTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faCheck,
  faSave,
  faTimes,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../Components/Style.css";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row,
  Toast,
} from "reactstrap";
import { toast } from "react-toastify";

export default function Export() {
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
  const [hold, setHold] = useState("");

  const [personalCarriage, setPersonalCarriage] = useState("");
  const [Heavy, setHeavy] = useState("");
  const [specialCarting, setSpecialCarting] = useState("");

  const [provisional, setProvisional] = useState("");
  const [dgdcStatus, setDgdcStatus] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const reactPageName = "Export";

  const [items, setItems] = useState([]);

  const fetchItemList = () => {
    axios
      .get("http://localhost:8080/export/listSBTransaction")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  // Fetch the list of items when the component mounts
  useEffect(() => {
    fetchItemList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRegistration = {
      id,
      search,
      personalCarriage,
      hold,

      dgdcStatus,
      startDate,
      Heavy,

      endDate,
      specialCarting,
      provisional,
    };

    axios
      .post("http://localhost:8080/export/newExport", newRegistration, {
        headers: {
          "React-Page-Name": reactPageName,
        },
      })
      .then((response) => {
        console.log(newRegistration);
        toast.success("record added successfully", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const handleClear = () => {
    // Clear the form fields
    setID("");
    setPersonalCarriage("");
    setSpecialCarting("");
    setHold("");

    setDgdcStatus("");
    setProvisional("");
    setSearch("");

    setHeavy("");
    setStartDate("");
    setEndDate("");
  };

  const handleEdit = (item) => {
    navigate("/parent/SBTransaction", { state: { selectedItem: item } });
  };

  const handleDelete = (item) => {
    axios
      .post(`http://localhost:8080/export/delete`, item, {
        headers: {
          "React-Page-Name": reactPageName,
        },
      })
      .then((response) => {
        toast.success("Item deleted successfully", { position: "top-center" });
        console.log("Item deleted successfully");
        fetchItemList();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);

        toast.error("error", { position: "top-center" });
        // Handle any errors that occurred during the request
      });
  };

  const handleOptionButtonClick = (option) => {
    if (option === "add") {
      navigate("/parent/SBTransaction", { state: { selectedItem: null } });

      // navigate("/parent/SBTransaction"); // Navigates to the SBTransaction component
    } else if (option === "create") {
      console.log("Create option clicked");
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <p style={{ fontWeight: "bold", marginLeft: "20px" }}>Export List</p>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle custom-btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Action
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleOptionButtonClick("add")}
                >
                  Add New
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleOptionButtonClick("create")}
                >
                  Create
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <>
        <form onSubmit={handleSubmit} action="/form">
          <div className="container ">
            <Container>
              <Card>
                <CardBody>
                  <form>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <label className="forlabel" htmlFor="search">
                            Search By:
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
                          <label className="forlabel" htmlFor="startDate">
                            SER Date:
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
                        <FormGroup>
                          <label className="forlabel" htmlFor="hold">
                            Hold
                          </label>
                          <select
                            id="hold"
                            className="form-control form-select"
                            value={hold}
                            onChange={(e) => setHold(e.target.value)}
                            required
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <label
                            className="forlabel"
                            htmlFor="personalCarriage"
                          >
                            Personal Carriage:
                          </label>
                          <select
                            id="personalCarriage"
                            className="form-control  form-select"
                            value={personalCarriage}
                            onChange={(e) =>
                              setPersonalCarriage(e.target.value)
                            }
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <label className="forlabel" htmlFor="Heavy">
                            Heavy:
                          </label>
                          <select
                            id="Heavy"
                            className="form-control  form-select"
                            value={Heavy}
                            onChange={(e) => setHeavy(e.target.value)}
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <label className="forlabel" htmlFor="specialCarting">
                            Special Carting:
                          </label>
                          <select
                            id="specialCarting"
                            className="form-control  form-select"
                            value={specialCarting}
                            onChange={(e) => setSpecialCarting(e.target.value)}
                            required
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <label className="forlabel" htmlFor="provisional">
                            Provisional
                          </label>
                          <select
                            id="provisional"
                            className="form-control  form-select"
                            value={provisional}
                            placeholder="-any-"
                            onChange={(e) => setProvisional(e.target.value)}
                            required
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <label className="forlabel" htmlFor="dgdcStatus">
                          DGDC Status
                        </label>
                        <select
                          id="dgdcStatus"
                          className="form-control  form-select"
                          value={dgdcStatus}
                          onChange={(e) => setDgdcStatus(e.target.value)}
                          required
                        >
                          <option value="">-Any-</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </Col>
                      <Col>
                        <Button
                          outline
                          type="submit"
                          color="danger"
                          style={{ marginLeft: "10px", marginTop: "27px" }}
                        >
                          <FontAwesomeIcon
                            icon={faSave}
                            style={{ marginRight: "5px" }}
                          />
                          SAVE
                        </Button>

                        <Button
                          outline
                          type="button"
                          color="danger"
                          style={{ marginLeft: "10px", marginTop: "27px" }}
                          onClick={handleClear}
                        >
                          <FontAwesomeIcon
                            icon={faSyncAlt}
                            style={{ marginRight: "5px" }}
                          />
                          CLEAR
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Container>
            <div
              style={{
                marginTop: 30,
                marginRight: 12,
                marginLeft: 12,
              }}
            >
              <>
                <table rules="all" className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ background: "skyblue" }} scope="col">
                        Sr.No
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        Request Id
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        SB.No
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        SER No
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        SER Date
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        Exporter
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        Pkgs
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        Gross Wt
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        NSDL Status
                      </th>
                      <th style={{ background: "skyblue" }} scope="col">
                        DGDC Status
                      </th>
                      <th
                        style={{ background: "skyblue" }}
                        className="text-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.sbNo}>
                        <td>{index + 1}</td>
                        <td>{item.sbRequestId}</td>
                        <td>{item.sbNo}</td>
                        <td>{item.serNo}</td>
                        <td>{item.sbDate}</td>
                        <td>{item.nameOfExporter}</td>
                        <td>{item.noOfPackages}</td>
                        <td>{item.grossWeight}</td>
                        <td>{item.nsdlStatus}</td>
                        <td>{item.dgdcStatus}</td>
                        <td className=" text-center d-grid gap-2 d-md-block">
                          <button
                            type="button"
                            className="btn me-md-2  btn-outline-primary"
                            onClick={() => handleEdit(item)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ marginRight: "5px" }}
                            />
                          </button>
                          <button
                            type="button"
                            className="btn gap-2 btn-outline-danger"
                            onClick={() => handleDelete(item)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ marginRight: "5px" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            </div>

            <div></div>
          </div>
        </form>
      </>
    </>
  );
}