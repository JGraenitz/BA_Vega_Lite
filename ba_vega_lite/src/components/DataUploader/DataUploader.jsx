import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import './DataUploader.css';

/**
 * DataUploader Komponente
 * Ermöglicht Drag-and-Drop und Dateiauswahl für CSV-Upload.
 * Ruft onData(data, columns) bei Erfolg, onError(message) bei Fehler auf.
 */
function DataUploader({ onData, onError }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  // Datei-Handling
  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.match(/\.csv$/i)) {
      onError('Bitte lade eine gültige CSV-Datei hoch.');
      return;
    }
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        if (results.errors.length > 0) {
          onError('CSV-Parsing-Fehler: ' + results.errors[0].message);
          return;
        }
        if (!results.data || results.data.length === 0) {
          onError('CSV-Datei ist leer oder ungültig.');
          return;
        }
        const columns = results.meta.fields;
        onData(results.data, columns);
      },
      error: (err) => {
        onError('CSV-Parsing-Fehler: ' + err.message);
      },
    });
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="datauploader-outer">
      <div
        className={`datauploader-dropzone${dragOver ? ' active' : ''}`}
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        aria-label="CSV-Datei hochladen"
      >
        <div className="datauploader-icon">
          <span role="img" aria-label="Upload" className="datauploader-icon-emoji">📄</span>
        </div>
        <div className="datauploader-infotext">
          Ziehe deine CSV-Datei hierher oder <span className="datauploader-link">Datei auswählen</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          tabIndex={-1}
          className="datauploader-fileinput"
        />
      </div>
    </div>
  );
}

export default DataUploader;