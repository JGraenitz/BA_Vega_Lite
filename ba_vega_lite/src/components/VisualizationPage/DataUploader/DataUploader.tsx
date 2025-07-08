import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import './DataUploader.css';

interface DataUploaderProps {
  onData: (data: any, columns: any) => void;
  onError: (error: string) => void;
}

/**
 * DataUploader Komponente
 * Ermöglicht Drag-and-Drop und Dateiauswahl für CSV-Upload.
 * Ruft onData(data, columns) bei Erfolg, onError(message) bei Fehler auf.
 */
function DataUploader({ onData, onError }: DataUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Datei-Handling
  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.name.match(/\.csv$/i)) {
      onError('Bitte lade eine gültige CSV-Datei hoch.');
      return;
    }
    Papa.parse(file as any, {
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
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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