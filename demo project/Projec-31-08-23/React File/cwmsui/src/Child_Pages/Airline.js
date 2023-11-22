import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import AddModal from "./AddModal";
import EditModal from "./EditModel";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Airline(props) {
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

  const reactPageName = "Airline";
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setFormData({
      ...formData,
      companyId: props.companyId || "",
      branchId: props.branchId || "",
      airlineName: props.airlineName || "",
      flightNo: props.flightNo || "",
      airlineShortName: props.airlineShortName || "",
      airlineDesc: props.airlineDesc || "",
      airlineCode: props.airlineCode || "",
      status: props.status || "",
      createdBy: props.createdBy || "",
      createdDate: props.createdDate || "",
      editedBy: props.editedBy || "",
      editedDate: props.editedDate || "",
      approvedBy: props.approvedBy || "",
      approvedDate: props.approvedDate || "",
    });
  }, [props]);

  const [formData, setFormData] = useState({
    companyId: "",
    branchId: "",
    airlineName: "",
    flightNo: "",
    airlineShortName: "",
    airlineDesc: "",
    airlineCode: "",
    status: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    approvedDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Also update the editItemData state if in edit mode
    if (editItemData) {
      setEditItemData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.createdBy = userId;
    formData.approvedBy = userId;
    formData.editedBy = userId;
    formData.branchId = branchId;
    formData.companyId = companyid;
    formData.status = "N";

    console.log(formData);
    axios
      .post("http://localhost:8080/Airline/add", formData, {
        headers: {
          "React-Page-Name": reactPageName,
        },
      })
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        toast.success("Data saved successfully", "success");
        fetchData();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        toast.error("Error saving data", "error");
      });
  };

  const [dataList, setDataList] = useState([]);

  const fetchData = () => {
    axios
      .get(`http://localhost:8080/Airline/list/${branchId}/${companyid}`)
      .then((response) => {
        console.log("Response data received:", response.data);
        if (Array.isArray(response.data)) {
          setDataList(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteButtonClick = (itemData) => {
    console.log(itemData);

    // Make a DELETE request to delete the item
    axios
      .post(
        `http://localhost:8080/Airline/delete`,itemData
      )
      .then((response) => {
        // Check if the delete request was successful (HTTP status code 200)
        if (response.status === 200) {
          // Item deleted successfully
          console.log("Item deleted successfully!");
          // You can add additional actions here if needed, such as refreshing the data
          fetchData();
        } else {
          // Handle other status codes if needed
          console.error("Error deleting item. Status code:", response.status);
        }
      })
      .catch((error) => {
        // Handle error here
        console.error("Error deleting item:", error);
      });
  };

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  const handleAdd = () => {
    setFormData({
      airlineName: "",
      airlineShortName: "",
      airlineCode: "",
      flightNo: "",
      airlineDesc: "",
    });
    setEditItemData(null);
    setAddModalOpen(true);
  };

  const handleEditButtonClick = (itemData) => {
    setFormData(itemData);
    setEditModalOpen(true);
  };

  return (
    <div>
      <Container>
        <p className="text-left" style={{ fontWeight: "bold" }}>
          Airline
        </p>
        <Card>
          <CardBody className="text-end">
            <button
              className="btn btn-outline-danger"
              onClick={handleAdd}
              style={{
                marginRight: 40,
              }}
            >
              Add New
            </button>
            <AddModal
              isOpen={isAddModalOpen}
              toggleModal={() => setAddModalOpen(!isAddModalOpen)}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              formData={formData}
            />
            <EditModal
              isOpen={isEditModalOpen}
              toggleModal={() => setEditModalOpen(!isEditModalOpen)}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              formData={formData}
            />
          </CardBody>

          <CardBody>
            <table rules="all" className="table table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ background: "skyblue" }} scope="col">
                    Airline Name
                  </th>
                  <th style={{ background: "skyblue" }} scope="col">
                    Airline ShortName
                  </th>
                  <th style={{ background: "skyblue" }} scope="col">
                    Airline Desc
                  </th>
                  <th style={{ background: "skyblue" }} scope="col">
                    Airline Code
                  </th>
                  <th style={{ background: "skyblue" }} scope="col">
                    Flight No
                  </th>
                  <th
                    className="text-center"
                    style={{ background: "skyblue" }}
                    scope="col"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.airlineName}</td>
                    <td>{item.airlineShortName}</td>
                    <td>{item.airlineDesc}</td>
                    <td>{item.airlineCode}</td>
                    <td>{item.flightNo}</td>
                    <td className=" text-center d-grid gap-2 d-md-block">
                      <button
                        type="button"
                        className="btn me-md-2  btn-outline-primary"
                        onClick={() => handleEditButtonClick(item)}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ marginRight: "5px" }}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn gap-2 btn-outline-danger"
                        onClick={() => handleDeleteButtonClick(item)}
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
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}