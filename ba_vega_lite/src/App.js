import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DataChart from './components/dataChart/DataChart';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`App${darkMode ? ' dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <DataChart />
    </div>
  );
}

export default App;
