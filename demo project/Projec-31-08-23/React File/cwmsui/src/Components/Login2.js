import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import ipaddress from "./IpAddress";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Components/Style.css";
import air from "../Images/plane2.jpg";
import AuthContext from "./AuthProvider";
import { useNavigate } from "react-router-dom";
// import Dropdown from 'react-bootstrap/Dropdown';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Login2() {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const message = new URLSearchParams(location.search).get("message");
  const message2 = new URLSearchParams(location.search).get("message2");
  const [companyName, setCompanyName] = useState([]);
  const [branchNames, setBranchNames] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [branchid, setBranchId] = useState("");
  const [companyId, setCompanyId] = useState("");
  // const [jwtToken, setToken] = useState('');
  // const [userId, setUserId] = useState('');
  // const[role,setRole] = useState('');
  const navigate = useNavigate();
  const reactPageName = 'Login';

  

  useEffect(() => {
    axios
      .get(`http://${ipaddress}:8080/user/company`, {
        headers: {
          'React-Page-Name': reactPageName
        }
      })
      .then((response) => {
        setCompanyName(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching parent menus:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://${ipaddress}:8080/user/branch`, {
        headers: {
          'React-Page-Name': 'Login'
        }
      })
      .then((response) => {
        setBranchNames(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching branch names:", error);
      });
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

 

  const handleBranchChange = (e) => {
    setBranchId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://${ipaddress}:8080/auth/login`, {
        username,
        password,
        branchid,
      }, {
        headers: {
          'React-Page-Name': 'Login'
        }
      });

      if (response.status === 200) {
        const { jwtToken, userId, username, branchId, companyid, role, companyname, branchname } = response.data;

        // Store all fields in sessionStorage using the AuthProvider
        login(jwtToken, userId, username, branchId, companyid, role, companyname,branchname);

        // alert('Login successful');
        Swal.fire("Great!!!!!",'Login successful','success');
        // toast.success("Login successful ", {
        //   position: "top-center",
        // });
        console.log(companyid);
        // Navigate to the desired page
        navigate("dash");
      } else {
         alert("Login unsuccessful");
         console.log("Login failed");
        toast.error("Login Unsuccessful !!!!", {
          position: "top-center",
        });
      }
    } catch (error) {
    //  alert("Login unsuccessful");
      console.error("Login error:", error);
      console.log("Login failed");
      toast.error("Login Unsuccessful !!!!", {
        position: "top-center",
      });
    }
  };

  // const handleCompanyIdChange = (e) => {
  //   setCompanyId(e.target.value);
  // };

  // console.log('handleCompanyIdChange ',companyId);

  document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("company");
  
    if (selectElement) {
      selectElement.addEventListener("change", handleCompanyIdChange);
    }
    function handleCompanyIdChange(event) {
      const selectedCompanyId = event.target.value;
      // Do something with the selectedCompanyId
      console.log('selectedCompanyId ',selectedCompanyId);
    }
  });

  return (
    <div className="card">
      <div className="  card-body">
        <div className="row">
          <div className="col is img">
            <img className="is" src={air} alt="" />
          </div>

          <div className="col padright">
            <div className="container mt">
              {message && (
                <Alert className="alertwidth" key="danger" variant="danger">
                  {message}
                </Alert>
              )}

              {message2 && (
                <Alert className="alertwidth" key="success" variant="success">
                  {message2}
                </Alert>
              )}

              <div className="">
                <h3 className="mardown">Welcome To SEZ Warehouse System</h3>
              </div>

              {/* <div>
                <h6 className=' mardown' color='gray'>Enter your details below</h6>
              </div> */}

              <form onSubmit={handleSubmit}>
                <div className="dropdown1">
                  <label htmlFor="" className="fs">
                    Company Name:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    name="company"
                    id="company"
                    className="dw"
                    value={companyId} // Set the selected value from state
                   // onChange={handleCompanyIdChange} // Handle company selection change
                  >
                   
                    {companyName.map((cm, index) => (
                      <option className="" key={index} value={cm.company_Id}>
                        {cm.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />

                <div className="dropdown1">
                  <label htmlFor="branch" className="fs dropright">
                    Branch Name :{" "}
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    name="branch"
                    id="branch"
                    value={branchid} // Set the selected value from state
                    onChange={handleBranchChange} // Handle branch selection change
                    className="dw"
                  >
                    <option value="" className="">
                      Select Branch
                    </option>
                    {branchNames.map((branch, index) => (
                      <option
                        className=""
                        key={index}
                        value={branch.id.branchId}
                      >
                        {branch.branchName}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <br />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fs1">Username</Form.Label>
                  <Form.Control
                    type="text"
                    className="inputwidth"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    placeholder="Enter username"
                  />
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fs1">Password</Form.Label>
                  <Form.Control
                    className="inputwidth"
                    value={password}
                    type="password"
                    onChange={handlePasswordChange}
                    required
                    placeholder="Password"
                  />
                </Form.Group>
                <br />
                <div className="">
                  <Button
                    className="buttonwidth"
                    variant="danger"
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
