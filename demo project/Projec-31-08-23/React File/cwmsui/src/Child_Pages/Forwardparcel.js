import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Dashboard from '../Components/Dashboard';
import { Button } from 'react-bootstrap';
export default function Forwardparcel() {
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
      <div className="card mt-2" style={{ backgroundColor: 'rgb(226 232 240)' }}>
        <div className="card-body">
          <div className="card containerservices">
            <div className="card-body">
            <h3>Forward Parcel</h3>
                <hr />
              <nav className='mt-2'>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Forward Out</button>
                  <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Forward In</button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <hr />
                  <div className="row mt-5 mb-3">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-2 text-center">
                          <label htmlFor="" className='mt-2'>Scan SIR</label>
                        </div>
                        <div className="col-7">
                          <input type="text" className="form-control" style={{ height: '45px' }} placeholder="Enter SIR or Scan SIR NO." aria-describedby="addon-wrapping" />
                        </div>
                        <div className="col-3">
                          <Button variant="danger"  className='btnwidth mt-1' style={{ marginLeft: 50 }}>Submit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <hr />
                  <div className="row mt-5 mb-3">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-2 text-center">
                          <label htmlFor="" className='mt-2'>Scan SIR</label>
                        </div>
                        <div className="col-7">
                          <input type="text" className="form-control" style={{ height: '45px' }} placeholder="Enter SIR or Scan SIR NO." aria-describedby="addon-wrapping" />
                        </div>
                        <div className="col-3">
                          <Button variant="danger"  className='btnwidth mt-1' style={{ marginLeft: 50 }}>Submit</Button>
                        </div>
                      </div>
                    </div>
                  </div>




                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
