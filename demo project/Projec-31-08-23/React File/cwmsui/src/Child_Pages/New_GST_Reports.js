import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Button } from 'react-bootstrap';

export default function New_GST_Reports(props) {
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


                          <h3 className='text-center'>New Gst Reports</h3>


                          <hr />
                          <form>


                              <div className="row mt-5">

                                  <div className="col-6">


                                      <div className="row">

                                          <div className="col-1"></div>
                                          <div className="col-3">
                                              <label htmlFor="startDate">Bill Date From</label>
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
                                              <label htmlFor="startDate">Bill Date To</label>
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
                                          <div className="col-1"></div>
                                      </div>
                                  </div>
                              </div>


                              <div className="row mt-5">

                                  <div className="col-6">
                                      <div className="row">
                                          <div className="col-1"></div>
                                          <div className="col-3">
                                              <label htmlFor="startDate">Select Party</label>
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
                                              <label htmlFor="startDate">Select Party Type</label>
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
                                          <div className="col-1"></div>
                                      </div>
                                  </div>
                              </div>

                              <div className="text-center mt-5">
                                  <Button variant="danger" className='btnwidth' style={{ marginRight: 10 }}>Search</Button>
                                  <Button variant="warning">Reset</Button>
                              </div>


                          </form>
                      </div>
                  </div>

              </div>
          </div>



      </>
  )
}
