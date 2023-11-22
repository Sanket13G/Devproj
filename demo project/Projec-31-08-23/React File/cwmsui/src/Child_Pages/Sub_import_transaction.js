import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function Sub_import_transaction() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
     
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
    <h4 style={{marginLeft:18,marginTop:25}}>Subcontract Import Transaction</h4>
  <Card style={{marginTop:25,marginRight:18,marginLeft:18,padding: 8}}>
  <Container>
    <Form>
      <Row>
        <Col sm={4}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='inputhead'>Select Date</Form.Label>
            <Form.Control type="date" placeholder=" " />

          </Form.Group>
        </Col>
        <Col sm={4}>
          <label htmlFor="company" className='inputhead'>DGDC Status</label>
          <select
            name="company"
            id="dw"
            className=""
          >
            <option className=""  >
              Select
            </option>

          </select>
        </Col>
        <Col sm={4}>
          <div style={{marginTop:30}}>
          <Button variant="danger" style={{marginRight:20}}>SHOW</Button>
          <Button variant="warning">RESET</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </Container>
  </Card>
</div>
  )
}
