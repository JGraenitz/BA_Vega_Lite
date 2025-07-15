import React, { useState, useRef } from 'react';
import { DataUploaderProps } from '../../../utils/interfaces/VisualizationProps';
import { Tooltip } from 'react-tooltip';
import Papa from 'papaparse';
import './DataUploader.css';


/**
 * DataUploader Komponente
 * Ermöglicht Drag-and-Drop und Dateiauswahl für CSV-Upload.
 * Ruft onData(data, columns) bei Erfolg, onError(message) bei Fehler auf.
 */
function DataUploader({
  onData, 
  onError, 
  fileName, 
  isCollapsed = false,
  onToggleCollapse
}: DataUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Datei-Handling
  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.name.match(/\.csv$/i)) {
      onError('Bitte lade eine gueltige CSV-Datei hoch.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || '';
      if (text.trim().length === 0) {
        onError('CSV-Datei ist leer.');
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
            onError('CSV-Datei ist leer oder ungueltig.');
            return;
          }
          const columns = results.meta.fields;
          onData(results.data, columns, file.name); 
        },
        error: (err) => {
          onError('CSV-Parsing-Fehler: ' + err.message);
        },
      });
    };
    reader.onerror = () => {
      onError('Fehler beim Lesen der Datei.');
    };
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
          {fileName ? 'Neue CSV-Datei hochladen' : 'Ziehe deine CSV-Datei hierher oder'} 
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