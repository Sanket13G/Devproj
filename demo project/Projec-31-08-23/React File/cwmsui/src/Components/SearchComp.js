import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import Dropzone from "react-dropzone";
import AuthContext from './AuthProvider';
import ipaddress from "./IpAddress";
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Table,
    Label,
    FormText,
} from "reactstrap";
import { toast } from "react-toastify";

export default function SearchComp() {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };
    const {
        jwtToken,
        userId,
        username,
        branchId,
        companyid,
        isAuthenticated,
        role,
        login,
        logout,
    } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);


    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);

    const [newEntry, setNewEntry] = useState({
        partyRepresentativeId: " ",
        companyId: " ",
        branchId: " ",
        partyId: " ",
        partyName: " ",
        contactName: " ",
        mobileNo: " ",
        imagePath: " ",
        contactStatus: "Active",
        createdBy: " ",
        createdDate: "",
        editedBy: "",
        editedDate: "",
        approvedBy: "",
        approvedDate: "",
        status: "",
    });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = (event) => {
        event.preventDefault();
        // Implement your search logic here
        console.log("Search clicked. Query:", searchQuery);
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Function to open edit modal and populate data
    const handleEditClick = (record) => {
        setSelectedRecord(record);
        setEditModalOpen(true);
    };

    const handleResetClick = (event) => {
        event.preventDefault();
        setSearchQuery("");
        // Implement your reset logic here
        console.log("Reset clicked");
    };

    const handleAddNewClick = (event) => {
        event.preventDefault();
        toggleModal();
    };
    const [SelectedParty, setSelectedParty] = useState(null); // Changed here
    const [party_Name, setparty_Name] = useState("");
    const [partyId, setpartyId] = useState("");
    const [partys, setPartys] = useState([]);

    const handleEditModalSave = async () => {
        const updatedEntry = {
            partyRepresentativeId: selectedRecord.partyRepresentativeId,
            companyId: selectedRecord.companyId,
            branchId: selectedRecord.branchId,
            partyId: selectedRecord.partyId,
            partyName: selectedRecord.partyName,
            contactName: selectedRecord.contactName,
            mobileNo: selectedRecord.mobileNo,
            imagePath: selectedRecord.imagePath,
            contactStatus: selectedRecord.contactStatus,
            createdBy: selectedRecord.createdBy,
            createdDate: selectedRecord.createdDate,
            editedBy: selectedRecord.editedBy,
            editedDate: selectedRecord.editedDate,
            approvedBy: selectedRecord.approvedBy,
            approvedDate: selectedRecord.approvedDate,
            status: selectedRecord.status,
        };

        try {
            const response = await axios.put(
                `http://${ipaddress}:8080/representive/update/${selectedRecord.partyRepresentativeId}`,
                updatedEntry
            );

            if (response.status === 200) {
                toast.success("Party representative Updated successfully", {
                    position: "top-center",
                });
                fetchData();
                setEditModalOpen(false);
            } else {
                console.error("Failed to update party representative");
            }
        } catch (error) {
            toast.error("Failed  to  Updated Party representative ", {
                position: "top-center",
            });
        }
    };

    const handleEditFieldChange = (field, value) => {
        setSelectedRecord((prevRecord) => ({
            ...prevRecord,
            [field]: value,
        }));
    };

    const fetchPartyNames = async () => {
        try {
            const response = await fetch(`http://${ipaddress}:8080/parties/getAll`);
            const data = await response.json();
            const processedPartys = data.map((party) => ({
                value: party.partyId,
                label: party.partyName,
            }));
            setPartys(processedPartys);
        } catch (error) {
            console.error("Error fetching party names:", error);
        }
    };
    const handleDeleteClick = async (partyRepresentativeId) => {
        try {
            const response = await axios.delete(
                `http://${ipaddress}:8080/representive/delete/${partyRepresentativeId}`
            );
            if (response.status === 200) {
                console.log("Party representative deleted");

                toast.success("Party representative Deleted successfully", {
                    position: "top-center",
                });
                // Refresh your data by fetching it again after deletion
                fetchData();
            } else {
                toast.success("Party representative Deleted successfully", {
                    position: "top-center",
                });
                // toast.error("Failed to  Deleted ", {
                //     position: "top-center",
                //   });
            }
        } catch (error) {
            console.error("Error deleting party representative:", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://${ipaddress}:8080/representive/getAllRepresentive`
            );
            const fetchedData = response.data; // Assuming your API response contains an array of data
            setData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchPartyNames();
    }, []);

    const handlePartyChange = (selectedOption) => {
        setSelectedParty(selectedOption);
        console.warn(selectedOption);
        setparty_Name(selectedOption ? selectedOption.label : "");
        setpartyId(selectedOption ? selectedOption.value : "");
    };



    const handleModalSave = async () => {
        const formData = new FormData();
        formData.append("partyRepresentativeId", newEntry.partyRepresentativeId);
        formData.append("companyId", newEntry.companyId);
        formData.append("branchId", newEntry.branchId);
        formData.append("partyId", partyId);
        formData.append("partyName", party_Name);
        formData.append("contactName", newEntry.contactName);
        formData.append("mobileNo", newEntry.mobileNo);
        formData.append("contactStatus", newEntry.contactStatus);
        formData.append("createdBy", newEntry.createdBy);
        formData.append("createdDate", newEntry.createdDate);
        formData.append("editedBy", newEntry.editedBy);
        formData.append("editedDate", newEntry.editedDate);
        formData.append("approvedBy", newEntry.approvedBy);
        formData.append("approvedDate", newEntry.approvedDate);
        formData.append("status", newEntry.status);

        if (file) {
            formData.append("imagePath",  selectedImage, selectedImage.name);
        }

        try {
            const response = await axios.post(
                `http://${ipaddress}:8080/representive/addRepresentive`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log('data'+formData);
            if (response.status === 201) {
                toast.success("Party representative added successfully", {
                    position: "top-center",
                });
                setData([...data, response.data]);
                // ... (reset form and close modal)
            } else {
                console.error("Failed to add party representative");
            }
        } catch (error) {
            console.error("Error adding party representative:", error);
            toast.error("Failed to add party representative", {
                position: "top-center",
            });
        }
    };



    const toggleModal = () => {
        setModalOpen(!modalOpen);

        if (!modalOpen) {
            // Check if the modal is opening
            setNewEntry({
                partyRepresentativeId: "",
                companyId: "",
                branchId: "",
                partyId: "",
                partyName: "",
                contactName: "",
                mobileNo: "",
                imagePath: "",
                contactStatus: "",
                createdBy: "",
                createdDate: "",
                editedBy: "",
                editedDate: "",
                approvedBy: "",
                approvedDate: "",
                status: "",
            });
            setSelectedParty(null);
            setSelectedImage(null); // Clear the selected image
        }
    };

    const [selectedImage, setSelectedImage] = useState(null); // Add this line


    const handleImageChange = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setNewEntry({
                ...newEntry,
                imagePath: file.name,
                showImage: URL.createObjectURL(file),
            });
            setSelectedImage(file);
        }
    };

    return (
        <div>
            <Form
            // method="POST"
            // action="/addRepresentive"
            // enctype="multipart/form-data"
            >
                <Card style={{ paddingRight: 18, backgroundColor: "#F8F8F8" }}>
                    <div>
                        <h5 style={{ float: "left", paddingLeft: 13 }}>
                            Manage Party Representative
                        </h5>
                    </div>

                    <Row>
                        <Col>
                            <Button
                                type="button"
                                color="danger"
                                outline
                                style={{ float: "right" }}
                                onClick={handleAddNewClick}
                            >
                                ADD NEW
                            </Button>
                        </Col>
                    </Row>
                    <CardBody>
                        <Row>
                            <Col md={5}>
                                <FormGroup>
                                    <Input
                                        type="search"
                                        name="search"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search Here"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup>
                                    <Button
                                        type="submit"
                                        color="info"
                                        outline
                                        onClick={handleSearchClick}
                                    >
                                        Search
                                    </Button>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup>
                                    <Button
                                        type="reset"
                                        color="warning"
                                        outline
                                        onClick={handleResetClick}
                                    >
                                        Reset
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Table style={{ marginTop: 18 }} striped bordered responsive>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#ff9900" }}>Sr.No</th>
                            <th style={{ backgroundColor: "#ff9900" }}>Party Name</th>
                            <th style={{ backgroundColor: "#ff9900" }}>Name</th>
                            <th style={{ backgroundColor: "#ff9900" }}>Image</th>
                            <th style={{ backgroundColor: "#ff9900" }}>Mobile No</th>
                            <th style={{ backgroundColor: "#ff9900" }}>Contact Status</th>
                            <th style={{ backgroundColor: "#ff9900" }}>Status</th>
                            <th
                                className="text-center"
                                style={{ backgroundColor: "#ff9900" }}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.partyName}</td>
                                <td>{item.contactName}</td>
                                <td>
                                    {item.imagePath && (
                                        <img
                                            src={`http://localhost:8080/representive/get/${item.imagePath}`}
                                            alt="Party Rep"
                                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                                        />
                                    )}
                                </td>
                                <td>{item.mobileNo}</td>
                                <td>{item.contactStatus}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Button
                                        type="button"
                                        color="warning"
                                        outline
                                        style={{ marginRight: 9 }}
                                        onClick={() => handleEditClick(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        color="danger"
                                        outline
                                        onClick={() =>
                                            handleDeleteClick(item.partyRepresentativeId)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal
                    isOpen={modalOpen}
                    toggle={toggleModal}
                    style={{ maxWidth: 900 }}
                >
                    <ModalHeader
                        toggle={toggleModal}
                        style={{ backgroundColor: "#ff9900" }}
                    >
                        Add New Party Representative
                    </ModalHeader>
                    <ModalBody style={{ backgroundColor: "#F8F8F8" }}>
                        <Row>
                            <Col md={6}>
                                <Label>Party Name:</Label>
                                <FormGroup>
                                    <Select
                                        options={partys}
                                        value={{ value: party_Name, label: party_Name }}
                                        onChange={handlePartyChange}
                                        isClearable
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                height: "45px",
                                                border: state.isFocused
                                                    ? "1px solid #ccc"
                                                    : "1px solid #ccc",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    border: "1px solid #ccc",
                                                },
                                            }),
                                            indicatorSeparator: () => ({
                                                display: "none",
                                            }),
                                            dropdownIndicator: () => ({
                                                display: "none",
                                            }),
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <Label>Contact Status:</Label>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        value={newEntry.contactStatus}
                                        onChange={(e) =>
                                            setNewEntry({
                                                ...newEntry,
                                                contactStatus: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row></Row>
                        <Row>
                            <Col md={6}>
                                <Label>Name:</Label>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={newEntry.contactName}
                                        onChange={(e) =>
                                            setNewEntry({ ...newEntry, contactName: e.target.value })
                                        }
                                        placeholder="Representative Name"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <Label>Mobile No:</Label>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={newEntry.mobileNo}
                                        onChange={(e) =>
                                            setNewEntry({ ...newEntry, mobileNo: e.target.value })
                                        }
                                        placeholder="Mobile No"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                

                                <FormGroup>
                                    <Label>Upload Image:</Label>
                                    <Input type="file" name="imagePath" id="exampleFile" onChange={handleFileChange} />
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <Label>Show Image:</Label>
                                <FormGroup>
                                    <img
                                        src={newEntry.showImage}
                                        alt="Uploaded"
                                        style={{ maxWidth: "100%", height: "auto" }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleModalSave}>
                            Save
                        </Button>{" "}
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Form>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalOpen}
                toggle={() => setEditModalOpen(!editModalOpen)}
                style={{ maxWidth: 900 }}
            >
                <ModalHeader
                    toggle={() => setEditModalOpen(!editModalOpen)}
                    style={{ backgroundColor: "#ff9900" }}
                >
                    Edit Party Representative
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#F8F8F8" }}>
                    {selectedRecord && (
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Party Representative ID:</Label>
                                        <Input
                                            type="text"
                                            value={selectedRecord.partyRepresentativeId}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Party Name:</Label>
                                        <Input
                                            type="text"
                                            value={selectedRecord.partyName}
                                            onChange={(e) =>
                                                handleEditFieldChange("partyName", e.target.value)
                                            }
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Mobile No:</Label>
                                        <Input
                                            type="text"
                                            value={selectedRecord.mobileNo}
                                            onChange={(e) =>
                                                handleEditFieldChange("mobileNo", e.target.value)
                                            }
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Image Path:</Label>
                                        <Input
                                            type="text"
                                            value={selectedRecord.imagePath}
                                            onChange={(e) =>
                                                handleEditFieldChange("imagePath", e.target.value)
                                            }
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                      

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Contact Name:</Label>
                                        <Input
                                            type="text"
                                            value={selectedRecord.contactName}
                                            onChange={(e) =>
                                                handleEditFieldChange("contactName", e.target.value)
                                            }
                                        />
                                    </FormGroup>
                                   =
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Contact Status:</Label>
                                        <Input
                                            type="select"
                                            value={selectedRecord.contactStatus}
                                            onChange={(e) =>
                                                handleEditFieldChange("contactStatus", e.target.value)
                                            }
                                        >
                                            <option value="">Select Contact Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    
                                </Col>
                                <Col md={6}>
                                   
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Label>Status:</Label>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            value={selectedRecord.status}
                                            onChange={(e) =>
                                                handleEditFieldChange("status", e.target.value)
                                            }
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                           
                        </Form>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditModalSave}>
                        Save
                    </Button>{" "}
                    <Button
                        color="secondary"
                        onClick={() => setEditModalOpen(!editModalOpen)}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}