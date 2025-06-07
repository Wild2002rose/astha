import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Final from './components/Final';
import './App.css';
import Branches from './components/Branches';
import Singlebranch from './components/Singlebranch';
import Medorder from './components/Medicine/Medorder';
import Chairman from './components/Chairman';
import Director from './components/Director';
import Login from './components/log-com/Login';
import Register from './components/log-com/Register';
import Dashboard from './components/log-com/Dashboard';
import PatientDashboard from './components/Profile/PatientDashboard';
import DoctorDashboard from './components/Profile/DoctorDashboard';
import EditProfile from './components/Profile/EditProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Final />} />
        <Route path='/branches' element ={<Branches/>} />
        <Route path='/singlebranch/:id' element={<Singlebranch/>} />
        <Route path='/medorder' element={<Medorder/>} />
        <Route path='/chairman' element={<Chairman/>}/>
        <Route path='/director' element={<Director/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/patientDashboard' element= {<PatientDashboard/>}/>
        <Route path='/doctorDashboard' element = {<DoctorDashboard/>} />
        <Route path='/editProfile' element ={<EditProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
