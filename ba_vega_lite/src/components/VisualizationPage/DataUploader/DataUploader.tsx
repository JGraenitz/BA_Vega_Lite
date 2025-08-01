import React, { useState, useRef } from 'react';
import { DataUploaderProps } from '../../../utils/interfaces/VisualizationPage/DataUploader/DataUploaderProps';
import { Tooltip } from 'react-tooltip';
import Papa from 'papaparse';
import './DataUploader.css';


/**
 * DataUploader Komponente
 * Ermöglicht Drag-and-Drop und Dateiauswahl für CSV-Upload.
 * Ruft onData(data, columns) bei Erfolg, onError(message) bei Fehler auf.
 *
 * @param {Function} onData - Callback, das bei erfolgreichem Upload aufgerufen wird (data, columns, fileName)
 * @param {Function} onError - Callback, das bei Fehlern aufgerufen wird (Fehlermeldung)
 * @param {string} fileName - Name der aktuell hochgeladenen Datei
 * @param {boolean} isCollapsed - Ob das Upload-Panel eingeklappt ist
 * @param {Function} onToggleCollapse - Callback zum Ein-/Ausklappen des Panels
 */
function DataUploader({onData, onError, fileName, isCollapsed = false, onToggleCollapse}: DataUploaderProps) {

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleParseComplete = (results: Papa.ParseResult<any>, currentFileName: string) => {
    if (results.errors.length > 0) {
      onError('CSV-Parsing-Fehler: ' + results.errors[0].message);
      return;
    }
    if (!results.data || results.data.length === 0) {
      onError('CSV-Datei ist leer oder ungueltig.');
      return;
    }
    const columns = results.meta.fields as string[];
    onData(results.data, columns, currentFileName);
  };

  const handleFileRead = (event: ProgressEvent<FileReader>, file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => handleParseComplete(results, file.name),
      error: (err) => onError('CSV-Parsing-Fehler: ' + err.message),
    });
  };
  

  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.name.match(/\.csv$/i)) {
      onError('Bitte lade eine gueltige CSV-Datei hoch.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => handleFileRead(e, file);
    reader.onerror = () => onError('Fehler beim Lesen der Datei.');
    reader.readAsText(file);
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

  if (isCollapsed) {
    return (
      <div className="datauploader-collapsed">
        <div 
          className="datauploader-collapsed-header"
          onClick={onToggleCollapse}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggleCollapse && onToggleCollapse();
            }
          }}
          data-tooltip-id="expand-upload-tooltip"
          data-tooltip-content="Upload-Panel erweitern"
        >
          <div className="datauploader-file-info">
            <span className="datauploader-file-icon">📄</span>
            <span className="datauploader-file-name">
              {fileName || 'CSV-Upload'}
            </span>
          </div>
          <span className="datauploader-toggle-icon">▼</span>
        </div>
        <Tooltip id="expand-upload-tooltip" place="top" />
      </div>
    );
  }

  return (
    <div className="datauploader-outer">
      <div className="datauploader-header">
        <div className="datauploader-file-info">
          <span className="datauploader-file-icon">📄</span>
          <span className="datauploader-file-name">
            {fileName || 'CSV-Datei hochladen'}
          </span>
        </div>
        <button
          className="datauploader-toggle-btn"
          onClick={onToggleCollapse}
          aria-label="Upload-Panel einklappen"
          data-tooltip-id="collapse-upload-tooltip"
          data-tooltip-content="Upload-Panel einklappen"
        >
          ▲
        </button>
        <Tooltip id="collapse-upload-tooltip" place="top" />
      </div>
      <div
        className={`datauploader-dropzone${dragOver ? ' active' : ''}`}
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
          {fileName ? 'Neue CSV-Datei hochladen' : 'Ziehe deine CSV-Datei hierher oder '} 
          {!fileName && <span className="datauploader-link">Datei auswählen</span>}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="datauploader-fileinput"
        />
      </div>
    </div>
  );
}

export default DataUploader;