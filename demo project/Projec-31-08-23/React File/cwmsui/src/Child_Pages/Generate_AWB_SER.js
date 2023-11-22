import { redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Dashboard from "../Components/Dashboard";
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from "reactstrap";

export default function Generate_AWB_SER() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and page refreshing
    console.log(search);
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
    <div>
      <p style={{ fontWeight: "bold" }}>Generate AWB & SER</p>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="label" htmlFor="search">
                    Scan URL
                  </label>
                  <input
                    placeholder="Scan QR URl"
                    type="text"
                    id="search"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col style={{ marginTop: 30, marginRight: 90, paddingRight: 90 }} md={2}>
                
              <Button outline color="danger" type="submit">
                  SUBMIT
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}