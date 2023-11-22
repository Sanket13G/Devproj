import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import image from '../Images/RapportSoftlogo.png';
import './Style.css';
import ipaddress from './IpAddress';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';

export default function SideBar() {

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

  const [parentMenus,  setParentMenus ] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();
  const [allowedProcessIds, setAllowedProcessIds] = useState([]);
  const [menu, setMenu] = useState([]);
  const [parent, setParent] = useState([]);
  const reactPageName = 'Sidebar';
  const [processId, setProcessId] = useState(null);
  const [pprocessId, setPprocessId] = useState('');
  const [pid, setPid] = useState([]);
  const [pid2, setPid2] = useState('');
  const [menudata, setMenudata] = useState([]);
 const[urights,setUrights] = useState([]);

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


  const handleMenu = (e) => {
    setMenu(e.target.value);
  }

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
    axios
      .get(`http://${ipaddress}:8080/api/parent-menus/${companyid}/${branchId}`)
      .then((response) => {
        setParentMenus(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching parent menus:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://${ipaddress}:8080/user/getallmenu/${userId}/${companyid}/${branchId}`)
      .then(response => {
        setAllowedProcessIds(response.data.map(pm => pm.process_Id));
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching allowed process IDs:', error);
      });
  }, [userId]);


  useEffect(() => {
  
      axios
        .get(`http://${ipaddress}:8080/user/get-User/${userId}/${companyid}/${branchId}`)
        .then((response) => {

          setUrights(response.data);
        })
        .catch((error) => {
          console.error('Error fetching branch names:', error);
        });
    
  }, [userId]);

   console.log('rights '+urights);

  useEffect(() => {
    const fetchParentMenus = async () => {
      const parentMenus = [];

      // Loop through each processId in allowedProcessIds
      for (const processId of allowedProcessIds) {
        try {
          const response = await axios.get(`http://${ipaddress}:8080/api/parent/${processId}/${companyid}/${branchId}`);
          parentMenus.push(response.data);
          console.log(processId);
        } catch (error) {
          console.error(`Error fetching parent menus for processId ${processId}:`, error);
        }
      }

      setParent(parentMenus); // Now setting parentMenus array to the parent state
    };

    if (allowedProcessIds.length > 0) {
      fetchParentMenus();
    }
  }, [allowedProcessIds]);

  useEffect(() => {
    const fetchParentMenus = async () => {
      const parentMenus = [];

      // Loop through each processId in allowedProcessIds
      for (const processId of pprocessId) {
        try {
          const response = await axios.get(`http://${ipaddress}:8080/api/parent/${processId}/${companyid}/${branchId}`);
          parentMenus.push(response.data);
          console.log(processId);
        } catch (error) {
          console.error(`Error fetching parent menus for processId ${processId}:`, error);
        }
      }

      console.log(parentMenus);
      // Filter out empty data from childMenus array (assuming the data is an array)
      const nonEmptyChildMenus = parentMenus.filter(data => data);

      const id = nonEmptyChildMenus.map((p) => p.pmenu_Name);
      setPid2(id);
      console.log(nonEmptyChildMenus);
      setPid(nonEmptyChildMenus);         // Now setting parentMenus array to the parent state
    };

    if (pprocessId.length > 0) {
      fetchParentMenus();
    }
  }, [pprocessId]);

  function isProcessAllowed(processId) {
    const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
    return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
  }
  


  // useEffect(() => {
  //   const fetchChildMenus = async () => {
  //     const childMenus = [];

  //     // Loop through each processId in allowedProcessIds
  //     for (const processId of allowedProcessIds) {
  //       try {
  //         const response = await axios.get(`http://localhost:8080/api/child/${processId}`);
  //         childMenus.push(response.data);
  //         console.log(processId);
  //       } catch (error) {
  //         console.error(`Error fetching parent menus for processId ${processId}:`, error);
  //       }
  //     }

  //     console.log(childMenus);
  //     // Filter out empty data from childMenus array (assuming the data is an array)
  //     const nonEmptyChildMenus = childMenus.filter(data => data);
  //     if (nonEmptyChildMenus.length > 0) {
  //       setPprocessId(nonEmptyChildMenus.map((cm) => cm.pprocess_Id));
  //     }

  //     console.log(nonEmptyChildMenus);
  //     setChild(nonEmptyChildMenus);         // Now setting parentMenus array to the parent state
  //   };

  //   if (allowedProcessIds.length > 0) {
  //     fetchChildMenus();
  //   }
  // }, [allowedProcessIds]);




  // useEffect(() => {
  //   const fetchMenus = async () => {
  //     const menus = [];

  //     // Loop through each processId in allowedProcessIds
  //     for (const processId of allowedProcessIds) {
  //       try {
  //         const response = await axios.get(`http://${ipaddress}:8080/user/combined-data/${processId}/${companyid}/${branchId}}`);

  //         menus.push(response.data);
  //         console.log(processId);
  //       } catch (error) {
  //         console.error(`Error fetching parent menus for processId ${processId}:`, error);
  //       }
  //     }

  //     console.log(menus);
  //     // Filter out empty data from childMenus array (assuming the data is an array)
  //     const nonEmptyChildMenus = menus.filter(data => data);
  //     if (nonEmptyChildMenus.length > 0) {
  //       setPprocessId(nonEmptyChildMenus.map((cm) => cm.pprocess_Id));
  //     }

  //     console.log('Data', nonEmptyChildMenus);
  //     setMenudata(nonEmptyChildMenus);         // Now setting parentMenus array to the parent state
  //   };

  //   if (allowedProcessIds.length > 0) {
  //     fetchMenus();
  //   }
  // }, [allowedProcessIds]);





  return (
    <>
      {role === 'ROLE_ADMIN' && (

        <Sidebar
          className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
            }`}
          style={{ height: "100%", position: "absolute" }}
          collapsed={collapsed}
          toggled={toggled}
          backgroundColor='#fff5e6'
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        >
          <main className='bc2'>
            <Menu>
              {collapsed ? (
                <MenuItem
                  icon={<AiOutlineMenu />}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<AiOutlineMenu />}
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
                  <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}>
                    <MenuItem style={{ height: 40 }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' key={index}>

                      {pm.pmenu_Name}

                    </MenuItem>
                  </Link>
                )) || (
                  pm.child_Menu_Status === 'Y' && (
                    <div className="submenu">

                      <SubMenu style={{ height: 40 }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}>
                        <Dropdown parentMenuId={pm.processId} />
                      </SubMenu>
                    </div>

                  )
                )
              ))}
            </Menu>

          </main>

        </Sidebar>

      )}


      {role === 'ROLE_USER' && (
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
                  icon={<AiOutlineMenu />}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<AiOutlineMenu />}
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




              {parent.map((pm, index) =>
                (pm.child_Menu_Status === 'N' && isProcessAllowed(pm.processId)) && (
                  <Link className='removestyle ' to={`${pm.parent_page_links}?process_id=${pm.processId}`} key={index}>
                    <MenuItem style={{ height: 40 }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' key={index}>

                      {pm.pmenu_Name}

                    </MenuItem>
                  </Link>
                )
                ||
                (pm.child_Menu_Status === 'Y' && isProcessAllowed(pm.processId)) && (
                  <div className="submenu">
                    <Dropdown2 parentMenuId1={pm.processId}>
                      {(matchingChildMenus) => matchingChildMenus.length > 0 && (
                        <SubMenu style={{ height: 40 }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}>
                          {matchingChildMenus}
                        </SubMenu>
                      )}
                    </Dropdown2>
                  </div>
                )
                     ) }
            </Menu>
          </main>
        </Sidebar>
      )}


    </>
  );
}

function Dropdown({ parentMenuId }) {


  const [childMenus, setChildMenus] = useState([]);
  const reactPageName = 'Sidebar';
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
  
  useEffect(() => {
    axios
      .get(`http://${ipaddress}:8080/api/cm/${parentMenuId}/${companyid}/${branchId}`)
      .then((response) => {
        setChildMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching child menus:', error);
      });
  }, [parentMenuId,companyid,branchId]);

  return (
    <>
      {childMenus.map((childMenu, index) => (

        <Link
          className="removestyle"
          to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
        >
          <MenuItem style={{ height: 40 }} className="" key={index}>
            {childMenu.child_Menu_Name}
          </MenuItem>
        </Link>

      ))}
    </>
  );
}


function Dropdown2({ parentMenuId1, children }) {

  const [child, setChild] = useState([]);
  const reactPageName = 'Sidebar';
 
 
  const [allowedProcessIds, setAllowedProcessIds] = useState([]);
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
 const[urights,setUrights] = useState([]);



  useEffect(() => {
  
    axios
      .get(`http://${ipaddress}:8080/user/get-User/${userId}/${companyid}/${branchId}`)
      .then((response) => {

        setUrights(response.data);
      })
      .catch((error) => {
        console.error('Error fetching branch names:', error);
      });
  
}, [userId]);


function isProcessAllowed(processId) {
 

  const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
  return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
}

  
  useEffect(() => {
    axios
      .get(`http://${ipaddress}:8080/user/getallmenu/${userId}/${companyid}/${branchId}`)
      .then(response => {
        setAllowedProcessIds(response.data.map(pm => pm.process_Id));
      })
      .catch(error => {
        console.error('Error fetching allowed process IDs:', error);
      });
  }, [userId]);

  useEffect(() => {
    const fetchChildMenus = async () => {
      const childMenus = [];

      // Loop through each processId in allowedProcessIds
      for (const processId of allowedProcessIds) {
        try {
          const response = await axios.get(`http://${ipaddress}:8080/api/child/${processId}/${companyid}/${branchId}`);
          childMenus.push(response.data);
        } catch (error) {
          console.error(`Error fetching child menus for processId ${processId}:`, error);
        }
      }

      const matchingChildMenus = childMenus
      .flat() // Flatten the array of arrays
      .filter(cm => cm.pprocess_Id === parentMenuId1 && isProcessAllowed(cm.processId)) // Check if parent process is allowed
      .map((cm, index) => (
        <Link
          className='removestyle'
          value={cm.pprocess_Id}
          to={`${cm.child_page_links}?process_id=${cm.processId}`}
          key={index}
        >
          <MenuItem
            style={{ height: 40 }}
            icon={<i id='fs' style={{ color: 'orange' }} className={cm.picons}></i>}
            className=''
            key={index}
          >
            {cm.child_Menu_Name}
          </MenuItem>
        </Link>
      ));

    setChild(matchingChildMenus);
  };

  if (allowedProcessIds.length > 0) {
    fetchChildMenus();
  }
}, [allowedProcessIds, parentMenuId1]);

return (
  <>
    {children(child)}
  </>
);
}
