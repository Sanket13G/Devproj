import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import image from '../Images/RapportSoftlogo.png';
import './Style.css';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import { Link, useNavigate } from 'react-router-dom';

export default function Head() {
    
  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    isAuthenticated,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);



  const [parentMenus, setParentMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [allowedProcessIds, setAllowedProcessIds] = useState([]);
  const navigate = useNavigate();


console.log(companyname);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login?message2=You have successfully logged out.');
  };


  const myStyle = {
    height: '40px',
  };
  return (
    <div>
      <Navbar height="9" className='vheight' expand="lg"  >
        <Container fluid style={myStyle}>
          &nbsp; &nbsp; &nbsp;
          <img
            src={image}
            width="150"
            height="150"

            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <Navbar.Toggle aria-controls="navbarScroll" />


          <Navbar.Collapse>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
            </Nav>
            <Form className="d-flex">
              <Nav><Nav.Link href="#action1"></Nav.Link></Nav>

            </Form>

          </Navbar.Collapse>

          <i class="bi bi-person-circle profilewidth" >  </i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <SplitButton
              key='start'
              id={`dropdown-button-drop-start`}
              drop='start'
              variant=""
              title={userId}
              className=''
            >
              <Dropdown.Item eventKey="1"><a class="dropdown-item" href="#"><span className='fontwt'>#CompanyName</span> {companyname}</a></Dropdown.Item>
              <Dropdown.Item eventKey="2"><a class="dropdown-item" href="#"><span className='fontwt'> #BranchName&nbsp;&nbsp;&nbsp;&nbsp;</span> {branchname}</a></Dropdown.Item>
              <Dropdown.Item eventKey="3"><a class="dropdown-item" href="#"><span className='fontwt'>#UserName</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{username}</a></Dropdown.Item>
             
              <Dropdown.Item eventKey="4"><a class="dropdown-item" href="#"> <button className='btn btn-danger' onClick={handleLogout}>Logout</button></a></Dropdown.Item>
            </SplitButton>
          
        </Container>
      
       
      </Navbar>
    </div>
  )
}