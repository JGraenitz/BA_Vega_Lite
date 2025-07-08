import React from 'react';
import { VisualizationPageProps } from '../../utils/interfaces/VisualizationProps';
import DataUploader from './DataUploader/DataUploader';
import ControlPanel from './ControlPanel/ControlPanel';
import VegaLiteChart from './VegaLiteChart/VegaLiteChart';
import './VisualizationPage.css';

/**
 * VisualizationPage Komponente
 * 
 * Hauptseite der Vega-Lite Visualisierungsanwendung. Stellt die zentrale Benutzeroberfläche bereit,
 * über die Benutzer CSV-Daten hochladen, Visualisierungseinstellungen konfigurieren und 
 * interaktive Diagramme erstellen können.
 * 
 * Komponentenstruktur:
 * - DataUploader: CSV-Datei-Upload per Drag-and-Drop oder Dateiauswahl
 * - ControlPanel: Konfiguration der Visualisierungseinstellungen (Layer, Diagrammtypen, Filter)
 * - VegaLiteChart: Anzeige der interaktiven Vega-Lite Diagramme
 * 
 * Props:
 *   - csvData: Array - Die eingelesenen CSV-Daten als Array von Objekten
 *   - handleCsvData: Function - Callback-Funktion für CSV-Daten-Upload
 *   - columns: Array - Array der Spaltennamen aus der CSV-Datei
 *   - columnInfo: Object - Metadaten zu den Spalten (Typ, fehlende Werte)
 *   - controls: Object - Visualisierungseinstellungen (Layer, Markierungen, Filter)
 *   - filteredData: Array - Gefilterte Daten für die Visualisierung
 *   - setError: Function - Callback für Fehlerbehandlung
 *   - handleControlsApply: Function - Callback für Anwendung der Steuerungseinstellungen
 *   - parsedSpec: Object - Parsed Vega-Lite Spezifikation
 *   - darkMode: Boolean - Dark Mode Status
 * 
 * Datenfluss:
 * 1. Upload: Benutzer lädt CSV-Datei über DataUploader hoch
 * 2. Verarbeitung: CSV-Daten werden geparst und Spalteninformationen extrahiert
 * 3. Konfiguration: Benutzer konfiguriert Visualisierung über ControlPanel
 * 4. Visualisierung: VegaLiteChart zeigt das Diagramm basierend auf den Einstellungen an
 */

function VisualizationPage({
  csvData, handleCsvData, columns, columnInfo, controls, filteredData,
  setError, handleControlsApply, parsedSpec, darkMode
}: VisualizationPageProps) {
  return (
    <>

        <div className={`card${darkMode ? ' dark-mode' : ''}`} id="dataupload-panel">
          <DataUploader onData={handleCsvData} onError={setError} />
          <div id="visualizationpage-info" className={darkMode ? 'dark-mode' : ''}>
            <span role="img" aria-label="info">ℹ️</span> Supports drag-and-drop or file selection. CSV must have headers.
          </div>
        </div>

      {csvData && (
        <>
          <div className={`controls-panel-rect${darkMode ? ' dark-mode' : ''}`} id="visualizationpage-controls-panel-rect">
            <ControlPanel
              columns={columns}
              columnInfo={columnInfo}
              layers={controls.layers}
              markSize={controls.markSize}
              markShape={controls.markShape}
              xLabel={controls.xLabel}
              yLabel={controls.yLabel}
              width={controls.width}
              height={controls.height}
              dateFilter={controls.dateFilter}
              onApply={handleControlsApply}
              darkMode={darkMode}
            />
          </div>
          <div className={`flex-row${darkMode ? ' dark-mode' : ''}`} id="visualizationpage-flex-row">
            <div className={`viz-edit-col${darkMode ? ' dark-mode' : ''}`} id="visualizationpage-viz-edit-col">
              <VegaLiteChart
                spec={parsedSpec}
                data={filteredData}
                columns={columns}
                columnInfo={columnInfo}
                width={controls.width}
                height={controls.height}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default VisualizationPage; 