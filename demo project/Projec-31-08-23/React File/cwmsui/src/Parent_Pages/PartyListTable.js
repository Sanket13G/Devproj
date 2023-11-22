import React, { useState, useEffect } from 'react';
import { Table, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import UpdatePartyForm from './updatePartyForm';
import ipaddress from '../Components/IpAddress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt,faFileExcel } from '@fortawesome/free-solid-svg-icons';

const PartyListTable = () => {
  const [parties, setParties] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const reactPageName = 'PartyListTable';
  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}:8080/parties/getAll`);
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
      // Handle error and display an error message if necessary.
    }
  };

  const handleDelete = async (partyId) => {
    try {
      await axios.delete(`http://${ipaddress}:8080/parties/delete/${partyId}`);
      toast.success('Party Deleted Successfully !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
      // Fetch the updated party list after deletion
      fetchParties();
    } catch (error) {
      console.error('Error deleting party:', error);
      // Handle error and display an error message if necessary.
      toast.error('Failed to delete party !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
    }
  };

  const handleEdit = (partyId) => {
    // Find the selected party from the parties array based on the partyId
    const party = parties.find((party) => party.partyId === partyId);
    setSelectedParty(party);
    setEditModalOpen(true);
  };

  const toggleEditModal = () => {
    setEditModalOpen((prevState) => !prevState);
  };

  return (
    <>

      <h5>Party List</h5>
      <Table striped bordered hover>
        <thead>
          <tr>

            <th style={{ background: 'skyblue' }}>Party ID</th>
            <th style={{ background: 'skyblue',width: '200px' }}>Party Name</th>
            <th style={{ background: 'skyblue' }}>Email</th>
            <th style={{ background: 'skyblue' }}>Mobile No</th>
      
            <th style={{ background: 'skyblue' }}>Entity ID</th>
            <th style={{ background: 'skyblue' }}>Credit Limit</th>
            <th style={{ background: 'skyblue' }}>Status</th>
            <th style={{ background: 'skyblue' }}>Edit</th>
            <th style={{ background: 'skyblue' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party) => (
            <tr key={party.partyId}>
              <td>{party.partyId}</td>
              <td>{party.partyName}</td>
              <td>{party.email}</td>
              <td>{party.mobileNo}</td>
         
              <td>{party.entityId}</td>
              <td>{party.creditLimit}</td>
              {/* Add other table data for displaying party data */}
              <td>{party.status === 'E' ? 'Edit' : party.status === 'N' ? 'New' : party.status === 'A' ? 'Approved' : party.status}</td>
              <td>
              <Button 
                type="button"
                  variant="outline-primary" onClick={() => handleEdit(party.partyId)}>
                     <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                  Edit
                </Button>
              </td>
              <td>
                <Button 
                type="button"
                  variant="outline-danger" onClick={() => handleDelete(party.partyId)}>
                     <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedParty && (
        <UpdatePartyForm
          party={selectedParty}
          isOpen={editModalOpen}
          toggleModal={toggleEditModal}
          fetchParties={fetchParties}
        />
      )}
    </>
  );
};

export default PartyListTable;