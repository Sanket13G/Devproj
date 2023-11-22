import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faXmark, faFileLines } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";
import Subcontract_Import from "./Subcontract_Import";

export default function SubImportTable({openModalforreqidUpdate}) {
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
    const [getsubimportdata, setGetsubimportdata] = useState([]);
    const[getdatabyid,setGetdatabyid] = useState([]);
    const [forimpsubid,setForimpsubid] = useState('');
    const[forreqid,setForreqid]=useState('');
    const open = openModalforreqidUpdate;

  open=(impSubId,reqId)=>{
    setForimpsubid(impSubId)
    setForreqid(reqId)
  }
    console.log(forimpsubid," gfdhfgjhhgjkjhljk")
  const getDataById = () => {
    axios
      .get(`http://${ipaddress}:8080/importsub/byid/${companyid}/${branchId}/${forimpsubid}/${forreqid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setGetdatabyid(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getDataById();
  }, [companyid,branchId,forimpsubid,forreqid]);


      useEffect(() => {
        const getSubImplist = () => {
          axios
            .get(`http://${ipaddress}:8080/importsub/all/${companyid}/${branchId}`)
            .then((response) => {
              console.log("GET list response:", response.data);
              setGetsubimportdata(response.data);
            })
            .catch((error) => {
              console.error("GET list error:", error);
            });
        };
    
        // Call the getSubImplist function here
        getSubImplist();
      }, [companyid, branchId]);


      
  const formatDateTime = (value) => {
    if (!value) {
      return ""; // Return an empty string if value is empty or undefined
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} `;
  };

  return (
    <div>
   
            <Table striped bordered hover style={{ width: '100%', marginTop: '30px' }} className="table table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ background: "skyblue" }}>Sr.No.</th>
                  <th style={{ background: "skyblue" }}>SIR No</th>
                  <th style={{ background: "skyblue" }}>SIR Date</th>
                  <th style={{ background: "skyblue" }}>Request Id</th>
                  <th style={{ background: "skyblue" }}>Importer</th>
                  <th style={{ background: "skyblue" }}>NOP</th>
                  <th style={{ background: "skyblue" }}>Re-Entry Date</th>
                  <th style={{ background: "skyblue" }}>Passed-In Net Weight</th>
                  <th style={{ background: "skyblue" }}>NSDL Status</th>
                  <th style={{ background: "skyblue" }}>DGDC Status</th>
                  <th style={{ background: "skyblue" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {getsubimportdata.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.sirNo}</td>
                    <td>{formatDateTime(data.sirDate)}</td>
                    <td>{data.requestId}</td>
                    <td>{data.exporter}</td>
                    <td>{data.nop}</td>
                    <td>{formatDateTime(data.reentryDate)}</td>
                    <td>{data.netWeight}({data.netWeightUnit})</td>
                    <td>{data.nsdlStatus}</td>
                    <td>{data.dgdcStatus}</td>
                    <td className="text-center" >
                      <DropdownButton
                        title={<FontAwesomeIcon icon={faFileLines} style={{ marginRight: '5px',color:'gray',width:'20px',height:'20px' }} />}
                        style={{ float: 'right',background: 'none' }}
                        variant="none"
                      >
                        <Dropdown.Item >View History</Dropdown.Item>
                        <Dropdown.Item onClick={() => open(data.impSubId, data.requestId)}>Modify</Dropdown.Item>
                        <Dropdown.Item >Print SIR Tag</Dropdown.Item>
                        <Dropdown.Item >Impose Penalty</Dropdown.Item>
                        <Dropdown.Item >Delivery Update</Dropdown.Item>

                      </DropdownButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

     
    </div>
  )
}
