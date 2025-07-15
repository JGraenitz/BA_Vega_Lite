import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TablePage from './components/TablePage/TablePage';
import JSONPage from './components/JSONPage/JSONPage';
import AnalysisPage from './components/AnalysisPage/AnalysisPage';
import ModalErrorHandler from './components/ModalErrorHandler/ModalErrorHandler';
import VisualizationPage from './components/VisualizationPage/VisualizationPage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import TutorialsPage from './components/TutorialsPage/TutorialsPage';
import { generateVegaLiteSpec, handleCsvData } from './utils/scripts/VegaLiteUtils';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [columns, setColumns] = useState<any[]>([]);

  const [csvData, setCsvData] = useState<any>(null); // Array von Objekten aus der eingespielten CSV

  const [columnInfo, setColumnInfo] = useState<any>({}); // { col: { type, missingCount } }

  const [error, setError] = useState<any>(null); // Fehlermeldung

  const [controls, setControls] = useState<any>({ // Steuerungs-Status: alle Visualisierungseinstellungen
    layers: [],
    markSize: 30,
    markShape: 'circle',
    xLabel: '',
    yLabel: '',
    width: 1000,
    height: 400,
    dateFilter: { start: '', end: '' },
  });

  const [vegaSpec, setVegaSpec] = useState<string>('');   // Vega-Lite-Spezifikation (als JSON-String)

  const [vegaSpecError, setVegaSpecError] = useState<any>(null);

  const [filteredData, setFilteredData] = useState<any[]>([]);   // Gefilterte Daten für das Diagramm (Datumsfilter)

  const handleControlsApply = (newControls: any) => {     // Übernehmen-Handler aus dem ControlPanel
    setControls(newControls);
  };

  useEffect(() => {
    if (!csvData || !controls.layers || controls.layers.length === 0) {
      setFilteredData([]);
      return;
    }
    let data = csvData;
    // Datumsfilter nach gewähltem Feld
    if (controls.dateField && (controls.dateFilter.start || controls.dateFilter.end)) {
      data = data.filter((row: any) => {
        const val = row[controls.dateField];
        if (val) {
          const d = new Date(val);
          if (controls.dateFilter.start && d < new Date(controls.dateFilter.start)) return false;
          if (controls.dateFilter.end && d > new Date(controls.dateFilter.end)) return false;
        }
        return true;
      });
    }
    // Legendenansicht: Daten transformieren 
    if (controls.showLegend) {
      let legendData: any[] = [];
      controls.layers.forEach((layer: any) => {
        const xField = layer.xAxis;
        const yField = layer.yAxis;
        data.forEach((row: any) => {
          if (row[yField] !== undefined && row[yField] !== null && row[yField] !== '') {
            legendData.push({
              ...row,
              Legend: yField,
              value: row[yField],
              _color: layer.color // optional, falls für Tooltip/Farbe gebraucht
            });
          }
        });
      });
      setFilteredData(legendData);
      return;
    }
    setFilteredData(data);
  }, [csvData, controls.layers, controls.dateFilter, columnInfo, controls.showLegend]);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

    // Initiale Vega-Lite-Spezifikation basierend auf den Steuerelementen erzeugen
  useEffect(() => {
    if (!csvData || !controls.layers || controls.layers.length === 0) return;
    const spec = generateVegaLiteSpec(controls, columnInfo);
    setVegaSpec(JSON.stringify(spec, null, 2));
  }, [csvData, controls, columnInfo]);

  // Vega-Lite-Spezifikation aus dem Editor parsen
  let parsedSpec = null;
  useEffect(() => {
    if (!vegaSpec) return;
    try {
      parsedSpec = JSON.parse(vegaSpec);
      setVegaSpecError(null);
    } catch (e: any) {
      setVegaSpecError('Invalid JSON: ' + e.message);
    }
  }, [vegaSpec]);
  try {
    parsedSpec = JSON.parse(vegaSpec);
  } catch {
    parsedSpec = null;
  }

  
  const handleCsvDataWrapper = (data: any, cols: any) => {
    handleCsvData(
      data,
      cols,
      setCsvData,
      setColumns,
      setColumnInfo,
      setControls,
      setVegaSpecError
    );
  };

  const handleTypeChange = (updatedTypes: any) => {
    setColumnInfo((prev: any) => {
      const newInfo = { ...prev };
      for (const col in updatedTypes) {
        if (newInfo[col]) {
          newInfo[col] = { ...newInfo[col], type: updatedTypes[col] };
        }
      }
      return newInfo;
    });
  };

  const closeModal = () => setError(null);

  return (
    <BrowserRouter>
      <div className={`App${darkMode ? ' dark-mode' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <VisualizationPage
                csvData={csvData}
                columns={columns}
                columnInfo={columnInfo}
                controls={controls}
                filteredData={filteredData}
                handleUploadedCsvData={handleCsvDataWrapper}
                setError={setError}
                handleControlsApply={handleControlsApply}
                parsedSpec={parsedSpec}
                />} 
            />
            <Route path="/table" element={<TablePage filteredData={filteredData} columns={columns}/>} />
            <Route path="/json" element={<JSONPage vegaSpec={vegaSpec} setVegaSpec={setVegaSpec} vegaSpecError={vegaSpecError} />} />
            <Route path="/analysis" element={<AnalysisPage columnInfo={columnInfo} onTypeChange={handleTypeChange} />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
          </Routes>
        </div>
        {/* <Footer /> */}
        {error && <ModalErrorHandler title="Error" message={error} onClose={closeModal} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
