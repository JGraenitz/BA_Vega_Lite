import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarProps } from '../../utils/interfaces/Navbar/NavbarProps';
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
  const navigate = useNavigate();

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
      <div className="navbar-actions">
        <button
          className="tutorials-btn"
          onClick={() => navigate('/tutorials')}
          aria-label="Tutorials anzeigen"
        >
          ?
        </button>
        <button
          className="darkmode-toggle"
          onClick={() => setDarkMode((prev: boolean) => !prev)}
          aria-label="Dark Mode umschalten"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>


      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu" onClick={e => e.stopPropagation()}>
            <Link to="/" className="menu-link" onClick={() => setMenuOpen(false)}>
              Visualisierung
            </Link>
            <Link to="/table" className="menu-link" onClick={() => setMenuOpen(false)}>
              Tabelle
            </Link>
            <Link to="/analysis" className="menu-link" onClick={() => setMenuOpen(false)}>
              Spaltenanalyse
            </Link>
            <Link to="/json" className="menu-link" onClick={() => setMenuOpen(false)}>
              Vega-JSON
            </Link>
          </div>
        </div>
      )}

      
    </nav>
  );
};

export default Navbar; 