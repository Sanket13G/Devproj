import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Button } from 'react-bootstrap';

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
      <div className="card mt-2 containerservices labeldown" style={{ backgroundColor: 'rgb(226 232 240)' }}>
        <div className="card-body">
          <div className="card cardcolor">
            <div className="card-body">


              <h3>Carting Agent page</h3>


              <hr />
              <form>


                <div className="row mt-5">

                  <div className="col-6">


                    <div className="row">

                      <div className="col-1"></div>
                      <div className="col-3">
                        <label htmlFor="startDate">Select Date Found</label>
                      </div>
                      <div className="col-8">
                        <input
                          type="datetime-local"
                          id="startDate"
                          className="form-control"
                          style={{ height: '45px' }}
                        // value={startDate}
                        // onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>


                  </div>
                  <div className="col-6">
                    <div className="row">

                      <div className="col-3">
                        <label htmlFor="startDate">Carting Agent</label>
                      </div>
                      <div className="col-8">
                        <select name="carting_Agent" className='form-control' style={{ height: '45px' }}>
                          <option value="">Select Carting Agent</option>
                          <option value="">Carting Agent</option>
                          <option value="">Carting Agent</option>
                          <option value="">Carting Agent</option>
                          <option value="">Carting Agent</option>
                        </select>
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </div>
                </div>


                <div className="row mt-5">

                  <div className="col-6">
                    <div className="row">
                      <div className="col-1"></div>
                      <div className="col-3">
                        <label htmlFor="startDate">Tp Number</label>
                      </div>
                      <div className="col-8">
                        <select name="carting_Agent" className='form-control' style={{ height: '45px' }}>
                          <option value="">Select Tp Number</option>
                          <option value="">12345</option>
                          <option value="">67891</option>
                          <option value="">000000</option>
                          <option value="">898659</option>
                        </select>
                      </div>
                    </div>


                  </div>
                  <div className="col-6">
                    <div className="row">
                      {/* <div className="col-1"></div> */}
                      <div className="col-3">
                        <label htmlFor="startDate">Van Number</label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          style={{ height: '45px' }}
                        // value={startDate}
                        // onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-5">
                  <Button variant="success" color="success" className='btnwidth' style={{ marginRight: 10 }}>Print</Button>
                  <Button variant="info" className='btnwidth' >PDF</Button>
                  <Button variant="warning" color="warning" style={{ marginLeft: 10 }} className='btnwidth' >Reset</Button>
                </div>


              </form>
            </div>
          </div>

        </div>
      </div>



    </>
  )
}
