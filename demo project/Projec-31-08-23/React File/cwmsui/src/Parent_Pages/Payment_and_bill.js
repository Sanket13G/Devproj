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
export default function Payment_and_bill() {
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

  const [selectedTab, setSelectedTab] = useState('home'); // Initialize the state with the default selected tab

  const handleTabClick = (tab) => {
    setSelectedTab(tab); // Update the state with the selected tab
  };
  return (
    <div className='' style={{ marginTop: 20 }}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item tabspace" role="presentation">
          <button style={{color:'gray'}} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><h6>Billing Transaction</h6></button>
        </li>
        <li className="nav-item tabspace" role="presentation">
          <button style={{color:'gray'}} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h6>Bills</h6></button>
        </li>
        <li className="nav-item tabspace" role="presentation">
          <button style={{color:'gray'}} className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false"><h6>Payment Transaction</h6></button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <Card style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}>
            <Container>
              <Form>
                <Row>
                  <Col sm={6}>
                    <label htmlFor="company" className='inputhead'>Select Party</label>
                    <select
                      name="company"
                      id="dw2"
                      className=""
                    >
                      <option className=""  >
                        Select
                      </option>

                    </select>
                  </Col>
                  <Col sm={3}>
                    <Form.Group className="mb-3 inputSize" controlId="formBasicEmail">
                      <Form.Label className='inputhead'>Date From</Form.Label>
                      <Form.Control type="date" placeholder=" " />

                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group className="mb-3 inputSize" controlId="formBasicEmail">
                      <Form.Label className='inputhead'>Date To</Form.Label>
                      <Form.Control type="date" placeholder=" " />

                    </Form.Group>
                  </Col>
             
                </Row>
                
                <Button style={{float:'right',marginRight:20}} variant="danger">SEARCH</Button>
                
              </Form>
            </Container>
          </Card>
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <Card style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}>
            <Container>
              <Form>
                <Row>
                 
                    <Col sm={5}>
                    <label htmlFor="company" className='inputhead'>Select Party</label>
                 
                    <select
                      name="company"
                      id="dw2"
                      className=""
                    >
                      <option className=""  >
                        Select
                      </option>

                    </select>
                    </Col>
                    <Col sm={1}>
                    <Button style={{marginTop: 30,marginLeft:5}} variant="danger">SEARCH</Button>
                    
                    </Col>
           
            
                </Row>
                
                
                
              </Form>
            </Container>
          </Card>
        </div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <Card style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}>
            <Container>
              <Form>
                <Row>
                  <Col sm={6}>
                    <label htmlFor="company" className='inputhead'>Select Party</label>
                    <select
                      name="company"
                      id="dw2"
                      className=""
                    >
                      <option className=""  >
                        Select
                      </option>

                    </select>
                  </Col>
                  <Col sm={3}>
                    <Form.Group className="mb-3 inputSize" controlId="formBasicEmail">
                      <Form.Label className='inputhead'>Date From</Form.Label>
                      <Form.Control type="date" placeholder=" " />

                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group className="mb-3 inputSize" controlId="formBasicEmail">
                      <Form.Label className='inputhead'>Date To</Form.Label>
                      <Form.Control type="date" placeholder=" " />

                    </Form.Group>
                  </Col>
             
                </Row>
                
                <Button style={{float:'right',marginRight:20}} variant="danger">SEARCH</Button>
                
              </Form>
            </Container>
          </Card>
        </div>
      </div>
    </div>
  );
}
