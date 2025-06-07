import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Section_one from './home/Section_one';
import Section_two from './home/Section_two';
import Section_three from './home/Section_three';
import End from "./home/End";
import Map from "./home/Map";

function Final() {
  
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <Section_one/>
      <Section_two/>
      <Section_three/>
      <End/>
      
    </div>
  );
}

export default Final;
