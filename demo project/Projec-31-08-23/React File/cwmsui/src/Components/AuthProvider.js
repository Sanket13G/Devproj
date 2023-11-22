import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [jwtToken, setToken] = useState(sessionStorage.getItem('jwtToken') || '');
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [branchId, setBranchId] = useState(sessionStorage.getItem('branchId') || '');
  const [companyid, setCompanyId] = useState(sessionStorage.getItem('companyid') || '');
  const [role, setRole] = useState(sessionStorage.getItem('role') || '');
  const [companyname,setCompanyname] = useState(sessionStorage.getItem('companyname') || '');
  const [branchname,setBranchname] = useState(sessionStorage.getItem('branchname') || '');

  const isAuthenticated = jwtToken !== '';

  const login = (newToken, newUserId, newUsername, newBranchId, newCompanyId, newRole, newCompanyname, newBranchname) => {
    sessionStorage.setItem('jwtToken', newToken);
    sessionStorage.setItem('userId', newUserId);
    sessionStorage.setItem('username', newUsername);
    sessionStorage.setItem('branchId', newBranchId);
    sessionStorage.setItem('companyid', newCompanyId);
    sessionStorage.setItem('role',newRole);
    sessionStorage.setItem('companyname',newCompanyname);
    sessionStorage.setItem('branchname',newBranchname);

    setToken(newToken);
    setUserId(newUserId);
    setUsername(newUsername);
    setBranchId(newBranchId);
    setCompanyId(newCompanyId);
    setRole(newRole);
    setCompanyname(newCompanyname);
    setBranchname(newBranchname);
  };

  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('branchId');
    sessionStorage.removeItem('companyid');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('companyname');
    sessionStorage.removeItem('branchname');

    setToken('');
    setUserId('');
    setUsername('');
    setBranchId('');
    setCompanyId('');
    setRole('');
    setCompanyname('');
    setBranchname('');
  };

  const authContextValue = {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
