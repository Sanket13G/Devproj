import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../Components/Style.css';
export default function Common() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className='containerservices'>
      <div className="card mt-2" style={{ backgroundColor: 'rgb(226 232 240)' }}>
        <div className="card-body">
          <div className="card">
            <div className="card-body">


              <h3>Get Pass Common</h3>
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
        </div>
      </div>
    </div>
  )
}
