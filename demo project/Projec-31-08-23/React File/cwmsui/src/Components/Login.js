import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../Components/Style.css";
import air from "../Images/airline.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [companyName, setCompanyName] = useState([]);

  const [branchNames, setBranchNames] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [branchid, setBranchId] = useState("");
  const history = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/company")
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
      .get(`http://localhost:8080/user/branch`)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your Spring Boot login endpoint
    const response = await fetch("/http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Get the JWT token from the response
      const { token } = await response.json();

      // Save the token in the session storage or local storage
      sessionStorage.setItem("token", token);

      // Navigate to the next page
      history.push("/export");
    } else {
      // Handle login error
      console.log("Login failed");
    }
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <img className="is" src={air} alt="" />
          </div>
          <div className="col">
            <div className="container mt">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="dropdown1">
                    <label for="company">Company Name : </label>
                    <span name="company" id="company">
                      {companyName.map((cm, index) => (
                        <input
                          type="text"
                          key={index}
                          value={cm.company_name}
                        />
                      ))}
                    </span>
                  </div>
                  <br />
                  <div className="dropdown1">
                    <label for="branch">Branch Name : </label>
                    <select name="branch" id="branch">
                      <option>Select Branch</option>
                      {branchNames.map((branch, index) => (
                        <option key={index}>{branch.branchName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <br />

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username </Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    placeholder="Enter username"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your username with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div class="container text-center">
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <div className="container">
              <div className="dropdown1">
                <label for="company">Company Name :    </label>
                <select name="company" id="company" onChange={(e) => setBranchId(e.target.value)}>
                  {companyName.map((cm, index) => (
                    <option key={index} value={cm.company_Id}>{cm.company_name}</option>
                  ))}
                </select>
              </div>

              <div className="dropdown1">
                <label for="branch">Branch Name :    </label>
                <select name="branch" id="branch">
                  {branchNames.map((branch, index) => (
                    <option key={index} value={branch.branchId}>{branch.branchName}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                Username :  <input name="username" type="text" />
                <br /><br />
                Password : <input name='password' type="text" />
                <br /><br />
                <input type="submit" value="submit" />
              </div>
            </div>
          </div>
        </div>
      </div>  */
}

//     <DropdownButton onChange={(e) => setBranchId(e.target.value)} title="Company Name" x>

//     {companyName.map((cm, index) => (
//       <Dropdown.Item key={index} value={cm.company_Id} eventKey={index}>{cm.company_name}</Dropdown.Item>
//     ))}

//   </DropdownButton>

// </div>

// <br />

// <div>

//   <DropdownButton title="Branch Name" onChange={(e) => setBranchNames(e.target.value)}>
//     {branchNames.map((branch, index) => (
//       <Dropdown.Item key={index} value={branch.branchId} eventKey={index}>{branch.branchName}</Dropdown.Item>
//     ))}
//   </DropdownButton>
