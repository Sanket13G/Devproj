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
import Table from 'react-bootstrap/Table';

export default function Delivery_order() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className='' style={{ marginTop: 20 }}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item tabspace" role="presentation">
          <button style={{ color: 'gray' }} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><h6>Generate</h6></button>
        </li>

        <li className="nav-item tabspace" role="presentation">
          <button style={{ color: 'gray' }} className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false"><h6>Print</h6></button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <Table striped bordered hover>
            <thead>
              <tr>
               <th style={{ background: 'skyblue' }}>MAWB</th>
               <th style={{ background: 'skyblue' }}>HAWB</th>
               <th style={{ background: 'skyblue' }}>IGM No</th>
               <th style={{ background: 'skyblue' }}>SIR No</th>
               <th style={{ background: 'skyblue' }}>SIR No</th>
               <th style={{ background: 'skyblue' }}>SIR No</th>
               <th style={{ background: 'skyblue' }}>SIR Date</th>
               <th style={{ background: 'skyblue' }}>Parcel Type</th>
               <th style={{ background: 'skyblue' }}>Importer</th>
               <th style={{ background: 'skyblue' }}>No. Of Package</th>
               <th style={{ background: 'skyblue' }}>Contents</th>
              </tr>
            </thead>
            <tbody>
              <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
              </tr>
              
            </tbody>
          </Table>
        </div>

        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
          <Card style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}>
            <Container>
              <Form>
                <Row>
                  <Col sm={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className='inputhead'>Select delivery order date</Form.Label>
                      <Form.Control type="date" placeholder=" " />

                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <label htmlFor="company" className='inputhead'>Select Console</label>
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
                    <div style={{ marginTop: 30 }}>
                      <Button variant="danger" style={{ marginRight: 20 }}>SHOW</Button>

                    </div>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card>

        </div>
      </div>
    </div>
  )
}
