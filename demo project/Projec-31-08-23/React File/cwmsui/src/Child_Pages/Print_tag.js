import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
  import React, { useEffect, useState,useContext } from 'react';
import '../Components/Style.css';
import Dashboard from'../Components/Dashboard';

export default function Print_tag() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
     
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <h1 className="fr">Print tag page</h1>
    </div>
  )
}
