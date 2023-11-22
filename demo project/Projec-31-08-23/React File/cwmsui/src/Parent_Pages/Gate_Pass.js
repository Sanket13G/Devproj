import React, { useEffect, useContext } from 'react';
import '../Components/Style.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';


export default function Gate_Pass() {
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
      <h1 className="fr">Gate Pass Page</h1>
    </div>
  )
}
