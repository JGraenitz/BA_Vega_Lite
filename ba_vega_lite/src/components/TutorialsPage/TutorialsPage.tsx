import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TutorialsPage.css';

const TutorialsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="tutorials-page-root">
      <div className="tutorials-page card">
        <h1>Tutorials & Hilfe</h1>
        <p>
          Willkommen zur Web-App für interaktive Datenvisualisierung mit Vega-Lite!<br/>
          Mit dieser Anwendung kannst du eigene CSV-Daten hochladen, Diagramme konfigurieren und vielfältige Visualisierungen erstellen.
        </p>
        <ul>
          <li>CSV-Datei hochladen und Spalten analysieren</li>
          <li>Layer, Achsen, Diagrammtypen und Filter flexibel einstellen</li>
          <li>Diagramm als Vega-Lite-JSON exportieren</li>
        </ul>
        <p>
          <strong>Weitere Informationen zu Vega-Lite findest du in der offiziellen Dokumentation:</strong><br/>
          <a href="https://vega.github.io/vega-lite/docs/" target="_blank" rel="noopener noreferrer">
            Vega-Lite Dokumentation
          </a>
        </p>
        <hr/>
        <h2>Video- & Bild-Tutorials (in Vorbereitung)</h2>
        <div className="tutorials-media-placeholder">
          {/* Hier können später Tutorialvideos oder Anleitungen eingefügt werden */}
          <p>Hier werden demnächst Schritt-für-Schritt-Videos und Beispielbilder zu typischen Workflows erscheinen.</p>
        </div>
        <button
          className="tutorials-back-btn"
          onClick={() => navigate('/')}
        >
          Zurück zur Visualisierung
        </button>
      </div>
    </div>
  );
};

export default TutorialsPage; 