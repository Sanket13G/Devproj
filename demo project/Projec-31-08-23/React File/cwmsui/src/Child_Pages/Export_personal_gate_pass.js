import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
export default function Carting_Agent() {
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
            <div className="card">
              <div className="card-body">


                <h3>Export Personal Gate Pass</h3>
                <hr />




                <div className="row text-center mt-4 mb-3">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-2 mt-2">
                        <label htmlFor="add" className='font'>Input</label></div>
                      <div className="col-10">
                        <div className="row">
                          <div className="col-10">
                          <input
                          type="text"
                          className="form-control"
                          placeholder='Input'
                          style={{ height: '50px' }}
                          name='add'
                        />
                          </div>
                          <div className="col-2">
                          <Button variant="success" className='btnwidth mt-2' >Add</Button>

                          </div>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    {/* <Button variant="success" className='btnwidth mt-2' >Add</Button> */}

                  </div>
                </div>




                



              </div>
            </div>


            <div className="card mt-5">
              <div className="card-body">

                <div className="row mt-2 mb-2">
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vehicle Number"
                      style={{ height: '50px' }}
                      name='add'
                    // value={startDate}
                    // onChange={(e) => setStartDate(e.target.value)}
                    />
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

                    <Button variant="info" className='btnwidth' style={{ marginRight: 0 }}>PRINT</Button>
                    <Button variant="info" className='btnwidth' color="warning" style={{ marginLeft: 10 }}>PDF</Button>

                  </div>
                </div>

                <hr />
                <Table className="table table-bordered custom-table mt-4">
                  <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                    <tr className="text-center">
                      <th scope="col">SI. No</th>
                      <th scope="col">SER No</th>
                      <th scope="col">Parcel type</th>
                      <th scope="col">SB No</th>
                      <th scope="col">Number of Pachages</th>
                      <th scope="col">Party</th>
                      <th scope="col">Action</th>
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
                      <td className="table-column">
                        <div className="text-center" style={{ display: 'flex', justifyContent: 'center' }}  >
                          <button style={{ flex: 1, maxWidth: '35%', marginRight: 5 }} variant="warning" className='btn btn-primary'>Edit</button>
                          <button variant="danger" className='btn btn-danger' style={{ flex: 1, maxWidth: '35%', marginLeft: 5 }} >Delete</button>
                        </div>
                      </td>
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
