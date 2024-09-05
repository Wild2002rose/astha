import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Final from './components/Final';
import Appointment from './components/Appointment';
import './App.css';
import Branches from './components/Branches';
import Singlebranch from './components/Singlebranch';
import Medorder from './components/Medicine/Medorder';
import Chairman from './components/Chairman';
import Director from './components/Director';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Final />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/branches' element ={<Branches/>} />
        <Route path='/singlebranch/:id' element={<Singlebranch/>} />
        <Route path='/medorder' element={<Medorder/>} />
        <Route path='/chairman' element={<Chairman/>}/>
        <Route path='/director' element={<Director/>}/>
      </Routes>
    </Router>
  );
}

export default App;
