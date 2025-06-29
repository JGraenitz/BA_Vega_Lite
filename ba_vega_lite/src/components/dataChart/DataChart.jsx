import React, { useState } from 'react';
import Chart from '../chart/Chart';
import './DataChart.css';

/**
 * DataChart-Komponente
 *
 * Diese Komponente ermöglicht das Hochladen einer CSV-Datei, die Auswahl von X- und Y-Achsen, die Aggregation der Y-Achse,
 * die Auswahl des Diagrammtyps (Balken oder Linie) sowie die Filterung nach einem Datumsbereich.
 * Die Daten werden geparst, gefiltert und an die Chart-Komponente zur Visualisierung übergeben.
 *
 */
function DataChart() {

  const [data, setData] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const [xField, setXField] = useState('');

  const [yField, setYField] = useState('');

  const [vField, setVField] = useState('');

  const [kField, setKField] = useState('');

  //const [xAggregation, setXAggregation] = useState('');

  const [yAggregation, setYAggregation] = useState('');

  const [markType, setMarkType] = useState('bar');

  const [chartWidth, setChartWidth] = useState(800);

  const [chartHeight, setChartHeight] = useState(450);
 
  const [startDate, setStartDate] = useState('');

  const [endDate, setEndDate] = useState('');

  /**
   * Wird aufgerufen, wenn der Nutzer eine Datei auswählt. Liest die Datei ein und parst sie als CSV.
   * @param {File} file - Die ausgewählte Datei.
   */
  const handleFile = (file) => {
    if (!file) return;
    setError("");
    // Dateiendung prüfen
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setFileName("");
      setData([]);
      setError("Bitte lade eine Datei mit der Endung .csv hoch.");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      try {
        const parsedData = parseCSV(text);
        // Prüfe, ob die CSV valide ist (mind. 1 Zeile, Header, keine leeren Header)
        if (!Array.isArray(parsedData) || parsedData.length === 0 || Object.keys(parsedData[0]).length === 0) {
          throw new Error("Die CSV-Datei ist leer oder nicht korrekt formatiert.");
        }
        setData(parsedData);
        setError("");
      } catch (err) {
        setData([]);
        setFileName("");
        setError("Die CSV-Datei konnte nicht gelesen werden. Bitte prüfe das Format. (" + err.message + ")");
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  // Drag & Drop Events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  /**
   * Wandelt einen CSV-Text in ein Array von Objekten um.
   *
   * @function
   * @param {string} text - Der CSV-Text, bei dem die erste Zeile die Spaltenüberschriften enthält.
   * @returns {Array<Object>} Ein Array von Objekten, wobei jedes Objekt eine Zeile der CSV repräsentiert.
   *
   * @example
   * // Beispiel-CSV:
   * // date,wert,name
   * // 2024-01-01,10,Max
   * // 2024-01-02,20,Anna
   * const csvText = "date,wert,name\n2024-01-01,10,Max\n2024-01-02,20,Anna";
   * const result = parseCSV(csvText);
   * // result:
   * // [
   * //   { date: Date('2024-01-01'), wert: 10, name: 'Max' },
   * //   { date: Date('2024-01-02'), wert: 20, name: 'Anna' }
   * // ]
   *
   * @description
   * Die Funktion verarbeitet den CSV-Text wie folgt:
   * 1. Teilt den Text in Zeilen auf und jede Zeile in Spaltenwerte.
   * 2. Die erste Zeile wird als Header (Spaltennamen) verwendet.
   * 3. Für jede weitere Zeile wird ein Objekt erzeugt, das die Werte den Headern zuordnet.
   * 4. Werte in der "date"-Spalte werden in Date-Objekte umgewandelt.
   * 5. Zahlenwerte werden als float gespeichert, alle anderen Werte als String.
   */
 /*
  const parseCSV = (text) => {
    const rows = text.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      return headers.reduce((acc, header, index) => {
        if (header === 'date') {
          acc[header] = new Date(row[index]);
        } else {
          acc[header] = isNaN(row[index]) ? row[index] : parseFloat(row[index]);
        }
        return acc;
      }, {});
    });
    return data;
  };
   */

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return [];
    const headers = lines[0].split(',');
    return lines.slice(1)
      .map(line => line.split(','))
      .filter(row => row.length === headers.length)
      .map(row => {
        return headers.reduce((acc, header, index) => {
          if (header === 'date') {
            acc[header] = new Date(row[index]);
          } else {
            acc[header] = isNaN(row[index]) ? row[index] : parseFloat(row[index]);
          }
          return acc;
        }, {});
      });
  };
 

  /**
   * Filtert die Daten nach dem ausgewählten Zeitraum (Start- und Enddatum) basierend auf dem xField.
   *
   * @constant
   * @type {Array<Object>}
   */
  const filteredData = data.filter(item => {
    const date = item[xField];
    return (!startDate || date >= new Date(startDate)) && (!endDate || date <= new Date(endDate));
  });

  return (
    <div className="data-chart">
      
      <div className="chart-container">
        <p>
          Lade eine CSV-Datei hoch (per Klick oder Drag & Drop) und wähle die Achsen und Diagrammart aus.
        </p>
        <div
          className={`dropzone${dragActive ? ' active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} id="csv-upload" />
          <label htmlFor="csv-upload" className="dropzone-label">
            {dragActive ? 'CSV-Datei hier ablegen...' : 'CSV-Datei auswählen...'}
          </label>
        </div>
        {error && (
          <div className="error-message">{error}</div>
        )}
        {fileName && !error && (
          <div className="file-info">Hochgeladene Datei: <strong>{fileName}</strong></div>
        )}
        {data.length > 0 && (
          <>
            <div className="controls">

              <select onChange={(e) => setMarkType(e.target.value)} className="small-select">
                <option value="bar">Balken</option>
                <option value="line">Linie</option>
                <option value="arc">Kuchen</option>
              </select>

            {markType !== 'arc' && (
              <>
                <label>X:</label>
                <select onChange={(e) => setXField(e.target.value)} className="small-select">
                  <option value="">Wähle X-Achse</option>
                  {Object.keys(data[0]).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>

                <label>Y:</label>
                <select onChange={(e) => setYField(e.target.value)} className="small-select">
                  <option value="">Wähle Y-Achse</option>
                  {Object.keys(data[0]).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </>
            )}

            {markType === 'arc' && (
              <>
                <label>Value:</label>
                <select onChange={(e) => setVField(e.target.value)} className="small-select">
                    <option value="">Wähle Wert</option>
                    {Object.keys(data[0]).map((key) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                </select> 

                <label>Kategorie:</label>
                <select onChange={(e) => setKField(e.target.value)} className="small-select">
                    <option value="">Wähle Kategorie</option>
                    {Object.keys(data[0]).map((key) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                </select>   

              </>
            )}

            {/* Dropdown für Y-Achsen Aggregation 
            <label>Aggregation X:</label>
            <select onChange={(e) => setXAggregation(e.target.value)} className="small-select">
              <option value="mean">Mittelwert</option>
              <option value="min">Minimum</option>
              <option value="max">Maximum</option>
              <option value="count">Anzahl</option>
            </select>
            */}

            {/*
            <label>Aggregation Y:</label>
            <select onChange={(e) => setYAggregation(e.target.value)} className="small-select">
              <option value="mean">Mittelwert</option>
              <option value="min">Minimum</option>
              <option value="max">Maximum</option>
              <option value="count">Anzahl</option>
            </select>
            */}
            

            </div>
            <div className="chart-settings">
              <label>
                Diagramm Breite:
                <input type="number" value={chartWidth} onChange={(e) => setChartWidth(e.target.value)} />
              </label>
              <label>
                Diagramm Höhe:
                <input type="number" value={chartHeight} onChange={(e) => setChartHeight(e.target.value)} />
              </label>
            </div>
            {xField === 'date' && (
              <div>
                <label>
                  Startdatum:
                  <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>
                  Enddatum:
                  <input type="date" onChange={(e) => setEndDate(e.target.value)} />
                </label>
              </div>
            )}
            <Chart 
              data={filteredData} 
              xField={xField} 
              yField={yField} 
              vField={vField}
              kField={kField}
              markType={markType} 
              //xAggregation={xAggregation}
              //yAggregation={yAggregation}
              width={chartWidth} 
              height={chartHeight} 
            />
          </>
        )}
      </div>
      
    </div>
  );
};

export default DataChart; 