import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarProps } from '../../utils/interfaces/NavbarProps';
import './Navbar.css'; 

/**
 * Navbar-Komponente
 *
 * Diese Komponente stellt die Navigationsleiste der Anwendung dar.
 * Sie zeigt den Titel der Anwendung an.
 *
 */

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {


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
      
      
      <h1 className="navbar-title">VegaViz</h1>
      <button
        className="darkmode-toggle"
        onClick={() => setDarkMode((prev: boolean) => !prev)}
        aria-label="Dark Mode umschalten"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>


      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu" onClick={e => e.stopPropagation()}>
            <Link to="/" className="menu-link">
              Visualisierung
            </Link>
            <Link to="/table" className="menu-link">
              Tabelle
            </Link>
            <Link to="/analysis" className="menu-link">
              Spaltenanalyse
            </Link>
            <Link to="/json" className="menu-link">
              Vega-JSON
            </Link>
            <Link to="/tutorials" className="menu-link">
              Tutorials
            </Link>
          </div>
        </div>
      )}

      
    </nav>
  );
};

export default Navbar; 