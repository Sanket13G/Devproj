import React, { useState,useContext, useEffect } from 'react';
import { Form, Row, Col, Button ,Card,Table} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../Components/AuthProvider';
import ipaddress from '../Components/IpAddress';

const PartyForm = () => {
  const reactPageName = 'Party form';
  const {
    jwtToken,
    user_Id,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);
  const [formData, setFormData] = useState({
 companyId:companyid,
 branchId:branchId,
 partyId:'',
 partyName:'',
 address1:'',
 address2:'',
 address3:'',
 city:'',
 pin:'',
 state:'',
     country:'',
     unitAdminName:'',
     unitType:'',
     email:'',
     phoneNo:'',
     mobileNo:'',
     partyCode:'',
     erpCode:'',
     creditLimit:'',
     iecNo:'',
     entityId:'',
     panNo:'',
     gstNo:'',
     loaNumber:'',
     loaIssueDate:'',
     loaExpiryDate:'',
     createdBy:'',
     createdDate:'',
     editedBy:'',
     editedDate:'',
     approvedBy:'',
     approvedDate:'',
     status:'',
    
   
  });

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
  const stateMapping = {
    India: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
    USA: ['California', 'New York', 'Texas', 'Florida'],
    // Add more countries and their respective states as needed...
  };

  const cityMapping = {
    Delhi: ['New Delhi', 'Old Delhi'],
    Maharashtra: ['Mumbai', 'Pune'],
    Karnataka: ['Bangalore', 'Mysore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore'],
    California: ['Los Angeles', 'San Francisco'],
    'New York': ['New York City', 'Buffalo'],
    Texas: ['Houston', 'Austin'],
    Florida: ['Miami', 'Orlando'],
    // Add more states and their respective cities as needed...
  };

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const countryStates = stateMapping[selectedCountry] || [];
    setFormData((prevData) => ({ ...prevData, state: '', city: '' }));
    setStates(countryStates);
    setCities([]);
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const stateCities = cityMapping[selectedState] || [];
    setFormData((prevData) => ({ ...prevData, city: '' }));
    setCities(stateCities);
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Helper function to validate phone and mobile numbers using regex
  const validateNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validatePAN = (panNumber) => {
    const panPattern = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
    return panPattern.test(panNumber);
  };

  // Helper function to validate mobile number (10 digits only)
  const validateMobile = (mobileNumber) => {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(mobileNumber);
  };

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);


    if (!validateEmail(formData.email)) {
      toast.error('Invalid email address!', {
        position: 'top-center',
      });
      return;
    }

    // Validate mobile number
    if (!validateMobile(formData.mobileNo)) {
      toast.error('Mobile number should be exactly 10 digits!', {
        position: 'top-center',
      });
      return;
    }

    // Validate PAN card
    if (!validatePAN(formData.panNo)) {
      toast.error('Invalid PAN Card number! Please enter a valid PAN number.', {
        position: 'top-center',
      });
      return;
    }
    setLoading(true);
    
    try {
      formData.createdBy=username;
      formData.approvedBy=username;
      const response = await axios.post(`http://${ipaddress}:8080/parties/add`, formData);
      console.log('Response:', response.data);
  
      // Assuming the response structure includes a 'message' field indicating success
      if (response.data==response.data) {
        toast.success('Party Added Successfully !!!', {
          position: 'top-center',
        });
        window.location.reload();
      } else {
        toast.error('Failed to add party. Please try again.', {
          position: 'top-center',
        });
       
      }
    } catch (error) {
      console.error('Error Adding party:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
      });
      window.location.reload();
    } finally {
      // Reset loading state after the process is completed
      setLoading(false);
    }
    
  };


  const handleRest=()=>{

    setFormData('');
  }

  return (
    <div className='container'>
        <Card className='MyCard' style={{backgroundColor:" #fff5e6"}}>
            <p>Add New Party</p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Party Name:</Form.Label>*
              <Form.Control type="text" name="partyName" value={formData.partyName} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Address 1:</Form.Label>
              <Form.Control type="text" name="address1" value={formData.address1} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Address 2:</Form.Label>
              <Form.Control type="text" name="address2" value={formData.address2} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
            <Form.Group>
              <Form.Label>Address 3:</Form.Label>
              <Form.Control type="text" name="address3" value={formData.address3} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>


<Form.Group>
                <Form.Label>Country:</Form.Label>*
                <Form.Control
                  as="select"
                  name="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleChange(e);
                    handleCountryChange(e);
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
          </Col>

<Col>
        <Form.Group>
                <Form.Label>State:</Form.Label>*
                <Form.Control
                  as="select"
                  name="state"
                  value={formData.state}
                  onChange={(e) => {
                    handleChange(e);
                    handleStateChange(e);
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
          </Col>
         
        </Row>
        <Row>

        <Col>
          <Form.Group>
                <Form.Label>City:</Form.Label>*
                <Form.Control
                  as="select"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
          </Col>
         <Col>
            <Form.Group>
              <Form.Label>PIN:</Form.Label>
              <Form.Control type="text" name="pin" value={formData.pin} onChange={handleChange} />
            </Form.Group>
          </Col>
          
          <Col>
            <Form.Group>
              <Form.Label>Unit Admin Name:</Form.Label>*
              <Form.Control type="text" name="unitAdminName" value={formData.unitAdminName} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
            <Form.Group>
              <Form.Label>Unit Type:</Form.Label>*
              <Form.Control as='select' name='unitType' value={formData.unitType} onChange={handleChange}>
                  <option value=''>Select Unit Type</option>
                  <option value='Type 1'>Type 1</option>
                  <option value='Type 2'>Type 2</option>
                  <option value='Type 3'>Type 3</option>
                  {/* Add more options as needed */}
                </Form.Control>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group>
            <Form.Label>Email:</Form.Label>*
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => validateEmail(formData.email)}
            />
            {/* Display error message if email is invalid */}
            {!validateEmail(formData.email) && (
              <Form.Text className="text-danger">Invalid email address</Form.Text>
            )}
          </Form.Group>

          </Col>
          <Col>
          <Form.Group>
            <Form.Label>Phone No:</Form.Label>
            <Form.Control
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              onBlur={() => validateNumber(formData.phoneNo)}
            />
            {/* Display error message if phone number is invalid */}
            {!validateNumber(formData.phoneNo) && (
              <Form.Text className="text-danger">Phone number should be 10 digits</Form.Text>
            )}
          </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
            
          <Form.Group>
            <Form.Label>Mobile No:</Form.Label>*
            <Form.Control
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              onBlur={() => validateNumber(formData.mobileNo)}
            />
            {/* Display error message if mobile number is invalid */}
            {!validateNumber(formData.mobileNo) && (
              <Form.Text className="text-danger">Mobile number should be 10 digits</Form.Text>
            )}
          </Form.Group>

          </Col>
        <Col>
            <Form.Group>
              <Form.Label>Party Code:</Form.Label>*
              <Form.Control type="text" name="partyCode" value={formData.partyCode} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>ERP Code:</Form.Label>*
              <Form.Control type="text" name="erpCode" value={formData.erpCode} onChange={handleChange} />
            </Form.Group>
          </Col>
         
        </Row>
        <Row> 
        <Col>
            <Form.Group>
              <Form.Label>Credit Limit:</Form.Label>*
              <Form.Control type="number" name="creditLimit" value={formData.creditLimit} onChange={handleChange} />
            </Form.Group>
          </Col>
        <Col>
            <Form.Group>
              <Form.Label>IEC No:</Form.Label>*
              <Form.Control type="text" name="iecNo" value={formData.iecNo} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Entity ID:</Form.Label>*
              <Form.Control type="text" name="entityId" value={formData.entityId} onChange={handleChange} />
            </Form.Group>
          </Col>
         
        </Row>
        <Row>
        <Col>
            <Form.Group>
              <Form.Label>PAN No:</Form.Label>*
              <Form.Control type="text" name="panNo" value={formData.panNo} onChange={handleChange} />
            </Form.Group>
          </Col>
        <Col>
            <Form.Group>
              <Form.Label>GST No:</Form.Label>*
              <Form.Control type="text" name="gstNo" value={formData.gstNo} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>LOA Number:</Form.Label>*
              <Form.Control type="text" name="loaNumber" value={formData.loaNumber} onChange={handleChange} />
            </Form.Group>
          </Col>
         
        </Row>
        <Row>
        {/* <Col>
            <Form.Group>
              <Form.Label>LOA Issue Date:</Form.Label>*
              <Form.Control type="date" name="loaIssueDate" value={formData.loaIssueDate} onChange={handleChange} />
            </Form.Group>
          </Col> */}
        {/* <Col>
            <Form.Group>
              <Form.Label>LOA Expiry Date:</Form.Label>
              <Form.Control type="date" name="loaExpiryDate" value={formData.loaExpiryDate} onChange={handleChange} />
            </Form.Group>
          </Col> */}
           <Col>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Control type="text" name="status" value={formData.status} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Created By:</Form.Label>
              <Form.Control type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} />
            </Form.Group>
          </Col>
           <Col>
            <Form.Group>
              <Form.Label>Approved By:</Form.Label>
              <Form.Control type="text" name="approvedBy" value={formData.approvedBy} onChange={handleChange} />
            </Form.Group>
          </Col> 
          
        </Row>
        <Row>
        {/* <Col>
            <Form.Group>
              <Form.Label>Created Date:</Form.Label>
              <Form.Control type="date" name="createdDate" value={formData.createdDate} onChange={handleChange} />
            </Form.Group>
          </Col> */}
     
          {/* <Col>
            <Form.Group>
              <Form.Label>Edited Date:</Form.Label>
              <Form.Control type="date" name="editedDate" value={formData.editedDate} onChange={handleChange} />
            </Form.Group>
          </Col>
          */}
             
        </Row>
        <Row>
        {/* <Col>
            <Form.Group>
              <Form.Label>Approved By:</Form.Label>
              <Form.Control type="text" name="approvedBy" value={formData.approvedBy} onChange={handleChange} />
            </Form.Group>
          </Col> */}
        {/* <Col>
            <Form.Group>
              <Form.Label>Approved Date:</Form.Label>
              <Form.Control type="date" name="approvedDate" value={formData.approvedDate} onChange={handleChange} />
            </Form.Group>
          </Col> */}
       
        </Row>
        <Button type="submit" className='b1' disabled={loading}>
  {loading ? 'Submitting...' : 'Submit'}
</Button>
<Button type="reset" className='b1' disabled={loading} onClick={handleRest}>
  Reset
</Button>
      </Form>
      </Card>
    </div>
  );
};
export default PartyForm;