import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Dashboard from '../Components/Dashboard';
import { Button } from 'react-bootstrap';
export default function Heavy_parcel() {
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
            <h3>Heavy Parcel</h3>
                <hr />
              <div className="row mt-3">
                <div className="col-md-8 offset-md-2">
                
                  <div className="row">
                    <div className="col-4 mt-2">
                      <label htmlFor="">Enter Package Weight (min: 34 KG)</label>
                    </div>
                    <div className="col-8">
                      <input type="text" className="form-control" style={{ height: '45px' }} placeholder="Enter SIR or Scan SIR NO." aria-describedby="addon-wrapping" />
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 mt-2">
                      <label htmlFor="">Enter SER/SIR No. *</label>
                    </div>
                    <div className="col-8">
                      <input type="text" className="form-control" style={{ height: '45px' }} placeholder="Enter SIR or Scan SIR NO." aria-describedby="addon-wrapping" />
                    </div>
                  </div>
                  <div className="text-center mt-5">
                  <Button variant="danger"  className='btnwidth mt-1' style={{ marginLeft: 50 }}>Submit</Button>

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
