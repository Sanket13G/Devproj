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
import { Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

const itemsPerPage = 10; // Number of items to display per page

const tableData = [
  {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  },
  {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  }, {
    Date: '27/06/2023',
    ExportRegular: 10,
    ExportSubcontract: 11,
    ExportDetention: 88,
    ImportRegular: 87,
    ImportSubcontract: 51,
    ImportDetention: 0,
  },
  
];

export default function Stock_at_vault() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = tableData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  return (
    <div>
    
    <Container style={{marginTop:25}}>
      <Form>
      <Card style={{marginTop:25,marginRight:-9,marginLeft:-12,padding: 24,marginBottom: 19}}>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='inputhead'>Stock Date</Form.Label>
              <Form.Control type="date" placeholder=" " />

            </Form.Group>
          </Col>
      
          <Col sm={4}>
            <div style={{marginTop:30}}>
            <Button variant="danger" style={{marginRight:20}}>SHOW</Button>
            <Button variant="warning">RESET</Button>
            </div>
          </Col>
        </Row>
         </Card>
        <Row>
        <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ background: 'skyblue' }}>Date</th>
                  <th style={{ background: 'skyblue' }}>Export Regular</th>
                  <th style={{ background: 'skyblue' }}>Export Subcontract</th>
                  <th style={{ background: 'skyblue' }}>Export Detention</th>
                  <th style={{ background: 'skyblue' }}>Import Regular</th>
                  <th style={{ background: 'skyblue' }}>Import Subcontract</th>
                  <th style={{ background: 'skyblue' }}>Import Detention</th>
                  <th style={{ background: 'skyblue' }}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentPageItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Date}</td>
                    <td>{item.ExportRegular}</td>
                    <td>{item.ExportSubcontract}</td>
                    <td>{item.ExportDetention}</td>
                    <td>{item.ImportRegular}</td>
                    <td>{item.ImportSubcontract}</td>
                    <td>{item.ImportDetention}</td>
                    <td><a href="#">edit</a></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row className="justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
        </Row>
      </Form>
    </Container>
   
  </div>
  )
}
