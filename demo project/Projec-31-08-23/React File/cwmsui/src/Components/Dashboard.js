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

import { Link, useNavigate } from 'react-router-dom';

import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem
} from "react-pro-sidebar";

export default function Home() {

  const {
//    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    isAuthenticated,
    // role,
    // login,
    logout,
  } = useContext(AuthContext);

  const [parentMenus, setParentMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();


  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);



  const handleLogout = () => {
    logout();
    navigate('/login?message2=You have successful logout.');
  };

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const myStyle = {
    height: '40px',
  };

  const logo = null;

  useEffect(() => {
    axios.get('http://localhost:8080/api/parent-menus')
      .then(response => {
        setParentMenus(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching parent menus:', error);
      });
  }, []);

  return (
    <>

      <>
      
        <Navbar height="9" className='vheight navColour' expand="lg"   >
          <Container fluid style={myStyle}>
            &nbsp; &nbsp; &nbsp;
            <img
              src={image}
              width="400px"
              height="310px"

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


            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="true">
                <i class="bi bi-person-circle profilewidth" ></i>&nbsp;&nbsp;&nbsp; <span className="profilewidth">{username}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#"><span className='fontwt'>#CompanyID</span> {companyid}</a></li>

                <li><a class="dropdown-item" href="#"><span className='fontwt'> #BranchID&nbsp;&nbsp;&nbsp;&nbsp;</span> {branchId}</a></li>

                <li><a class="dropdown-item" href="#"><span className='fontwt'>#UserID</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userId}</a></li>
                <li><a class="dropdown-item" href="#"> <button onClick={handleLogout}>Logout</button></a></li>
              </ul>
            </div>
          </Container>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Navbar>
        
          <Sidebar
            className={`app ${toggled ? "toggled" : ""}`}
            style={{ height: "100%", position: "absolute" }}
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
          >
            <main className='bc2'>
              <Menu>
                {collapsed ? (
                  <MenuItem
                    icon={<FiChevronsRight />}
                    onClick={handleCollapsedChange}
                  ></MenuItem>
                ) : (
                  <MenuItem
                    suffix={<FiChevronsLeft />}
                    onClick={handleCollapsedChange}
                  >
                    <div
                      style={{
                        padding: "5px",
                        fontWeight: "bold",
                        fontSize: 14,
                        letterSpacing: "1px"
                      }}
                    >
                    </div>
                  </MenuItem>
                )}
              </Menu>
              <Menu>

                {parentMenus.map((pm, index) => (
                  (pm.child_Menu_Status === 'N' && (
                    <MenuItem className='' key={index}>
                      <i id='fs' class={pm.picons}>&nbsp;
                        <Link className='removestyle ' to={`${pm.parent_page_links}?process_id=${pm.processId}`}>
                          {pm.pmenu_Name}

                        </Link></i>&nbsp;

                    </MenuItem>
                  )) || (
                    pm.child_Menu_Status === 'Y' && (
                      <div className="submenu">

                        <SubMenu className='' label={pm.pmenu_Name} key={index}>
                          <Dropdown parentMenuId={pm.processId} />
                        </SubMenu>
                      </div>

                    )
                  )
                ))}
              </Menu>
            </main>
          </Sidebar>
              </>

    </>
  )
}

function Dropdown({ parentMenuId }) 
{
  const [childMenus, setChildMenus] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cm/${parentMenuId}`)
      .then(response => {
        setChildMenus(response.data);
      })
      .catch(error => {
        console.error('Error fetching child menus:', error);
      });
  }, [parentMenuId]);

// <{gghjj}>
return (
    <>
      {childMenus.map((childMenu, index) => (
          <Link className='removestyle' to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`} >
            {childMenu.child_Menu_Name}
            <MenuItem className='' key={index} >
            </MenuItem>  
          </Link>
        
      ))}
    </>
  );
}
