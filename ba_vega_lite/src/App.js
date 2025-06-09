import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataChart from './components/dataChart/DataChart';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <DataChart />
    </div>
  );
}

export default App;
