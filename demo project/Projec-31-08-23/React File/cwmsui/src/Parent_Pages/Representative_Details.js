import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export default function Representative_Details() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
  
    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
      if (!isAuthenticated) {
  
        navigate('/login?message=You need to be authenticated to access this page.');
      }
    }, [isAuthenticated, navigate]);
  return (
    <>
    <div className='containerservices'>
        <div className="card mt-2" style={{ backgroundColor: 'rgb(226 232 240)' }}>
            <div className="card-body">
                <div className="card mt-2">
                    <div className="card-body">
                        <h3>Representative Details</h3>
                        <hr />
                        <div className="row mt-2 mb-2">
                            <div className="col-2"></div>
                            <div className="col-1 mt-2">
                                <label htmlFor="Entity Id">Entity Id</label>
                            </div>

                            <div className="col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{ height: '50px' }}
                                    name='add'
                                    placeholder="Preventive Officer"
                                // value={startDate}
                                // onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3 mt-1">

                                <Button variant="primary" className='btnwidth'>Search</Button>
                                <Button variant="warning" className='btnwidth' style={{ marginLeft: 10 }}>Reset</Button>

                            </div>
                        </div>

                        <hr />
                        <Table className="table table-bordered custom-table mt-4">
                            <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                <tr className="text-center">
                                    <th scope="col">Party/CHA/Console Name</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Deleted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td className="table-column"></td>
                                    <td className="table-column"></td>
                                    <td className="table-column"></td>
                                    <td className="table-column"></td>
                                    <td className="table-column"></td>
                                    <td className="table-column"></td>
                                </tr>
                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        </div>
    </div>

</>
  )
}
