import React, { useState } from 'react';
import './Navbar.css'; // CSS für die Navbar

/**
 * Navbar-Komponente
 *
 * Diese Komponente stellt die Navigationsleiste der Anwendung dar.
 * Sie zeigt den Titel der Anwendung an.
 *
 */
const Navbar = ({ darkMode, setDarkMode }) => {


  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <nav className="navbar">


      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Menü öffnen/schließen"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      
      
      <h1 style={{margin:0}}>Vega-Lite Diagramm</h1>
      <button
        className="darkmode-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label="Dark Mode umschalten"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>


      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu" onClick={e => e.stopPropagation()}>
            <a href="#" className="menu-link">Start</a>
            <a href="#" className="menu-link">----</a>
            <a href="#" className="menu-link">----</a>
            <a href="#" className="menu-link">----</a>
          </div>
        </div>
      )}

      
    </nav>
  );
};

export default Navbar; 