import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import { Button, Card, CardBody, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";

export default function Package_Content_Type() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1); // Index of the item being edited
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleAddNew = () => {
    setModalOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setName(data[index].name);
    setEditModalOpen(true);
  };

  const handleSubmit = () => {
    if (name.trim() !== "") {
      if (editingIndex !== -1) {
        // If editing, update the data at the editingIndex
        const newData = [...data];
        newData[editingIndex].name = name;
        setData(newData);
        setEditingIndex(-1); // Reset the editing index
      } else {
        // If not editing, add new data
        setData([...data, { id: data.length + 1, name }]);
      }
      setName("");
      setModalOpen(false);
      setEditModalOpen(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Card>
        <CardBody>
          <div className="text-right">
            <Button outline color="danger" onClick={handleAddNew}>
              ADD NEW
            </Button>
          </div>
          <div>
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
                  <thead style={{ color: "#ff9900" }}>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col" className="fa fa-align-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          {/* <button
                            className="btn btn-outline-danger"
                            // onClick={() => handleDelete(item)}
                          >
                            Delete
                          </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>

      {/* Modal for adding new data */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Add New Data</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <Button outline color="danger" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      {/* Modal for editing data */}
      <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(!editModalOpen)}>
        <ModalHeader toggle={() => setEditModalOpen(!editModalOpen)}>Edit Data</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editName">Name</Label>
              <Input
                type="text"
                id="editName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <Button outline color="danger" onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}