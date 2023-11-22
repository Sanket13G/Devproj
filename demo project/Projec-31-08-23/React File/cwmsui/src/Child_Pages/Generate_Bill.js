import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from 'reactstrap';

export default function Generate_Bill() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const currentDate = new Date().toISOString().substr(0, 10); // Get current date in YYYY-MM-DD format
  const [BillGDate, setBillGDate] = useState(currentDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(BillGDate);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Manual Bill Generation</p>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="label" htmlFor="BillGDate">
                    Bill Generation Date *
                  </label>
                  <input
                    type="date"
                    id="BillGDate"
                    className="form-control"
                    value={BillGDate}
                    onChange={(e) => setBillGDate(e.target.value)}
                    placeholder={currentDate} // Set the current date as placeholder
                  />
                </FormGroup>
              </Col>
              <Col style={{ marginTop: 30, marginRight: 90, paddingRight: 90 }} md={2}>
                <Button outline color="danger" type="submit">
                  RUN
                </Button>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}