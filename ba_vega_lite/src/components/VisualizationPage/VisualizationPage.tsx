import React, { useState } from 'react';
import { VisualizationPageProps } from '../../utils/interfaces/VisualizationProps';
import DataUploader from './DataUploader/DataUploader';
import ControlPanel from './ControlPanel/ControlPanel';
import VegaLiteChart from './VegaLiteChart/VegaLiteChart';
import TemplateSelector from './TemplateSelector/TemplateSelector';
import TestDataSelector from './TestDataSelector/TestDataSelector';
import { applyTemplateToControls } from '../../utils/interfaces/templateData/templates';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
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
  csvData, handleUploadedCsvData, columns, columnInfo, controls, filteredData,
  setError, handleControlsApply, parsedSpec
}: VisualizationPageProps) {

  const [showTemplates, setShowTemplates] = useState(false);

  const [showTestData, setShowTestData] = useState(true);

  const [uploadPanelCollapsed, setUploadPanelCollapsed] = useState(false);

  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const navigate = useNavigate();

  const handleTemplateSelect = (template: any) => {
    const appliedTemplate = applyTemplateToControls(template, columns);
    handleControlsApply(appliedTemplate);
    setShowTemplates(false);
  };

  const handleTestDataSelect = (dataset: any) => {
    handleCsvDataWithFileName(dataset.data, dataset.columns, 'Testdaten: ' + dataset.name);
    setShowTestData(false);
    setUploadPanelCollapsed(true); // Automatisch Panel einklappen nach Testdaten-Auswahl
  };

  const handleCsvDataWithFileName = (data: any, columns: any, fileName?: string) => {
    handleUploadedCsvData(data, columns);
    if (fileName) {
      setUploadedFileName(fileName);
      setUploadPanelCollapsed(true);
    }
  };

  const handleToggleUploadPanel = () => {
    setUploadPanelCollapsed(!uploadPanelCollapsed);
  };




  return (
    <>
      {!csvData && showTestData && (
        <div className="card" id="testdata-panel">
          <TestDataSelector onDatasetSelect={handleTestDataSelect} />
        </div>
      )}

        <div className="card" id="dataupload-panel">
          <DataUploader 
            onData={handleCsvDataWithFileName} 
            onError={setError}
            fileName={uploadedFileName}
            isCollapsed={uploadPanelCollapsed}
            onToggleCollapse={handleToggleUploadPanel}
          />
          {!uploadPanelCollapsed && (
            <div id="visualizationpage-info">
              <span role="img" aria-label="info">ℹ️</span> Unterstützt Drag-and-Drop oder Dateiauswahl. Die CSV-Datei muss Kopfzeilen (Spaltenüberschriften) enthalten.
            </div>
          )}
        </div>

      {csvData && (
        <>
          <div className="template-section">
            <button
              className="template-toggle-btn template-toggle-btn-margin"
              onClick={() => setShowTemplates(!showTemplates)}
              data-tooltip-id="show-templates-tooltip"
              data-tooltip-content="Vorlagen für Diagramme anzeigen oder ausblenden"
            >
              {showTemplates ? 'Vorlagen ausblenden' : 'Vorlagen anzeigen'}
            </button>
            <Tooltip id="show-templates-tooltip" place="top" />
            <button
              className="template-toggle-btn"
              onClick={() => navigate('/table')}
              data-tooltip-id="show-table-tooltip"
              data-tooltip-content="Tabellarische Datenansicht anzeigen"
            >
              Daten anzeigen
            </button>
            <Tooltip id="show-table-tooltip" place="top" />
            
            {showTemplates && (
              <div className="template-panel">
                <TemplateSelector onTemplateSelect={handleTemplateSelect} />
              </div>
            )}
          </div>

          <div className="controls-panel-rect" id="visualizationpage-controls-panel-rect">
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
              showLegend={controls.showLegend}
              onApply={handleControlsApply}
            />
          </div>
          <div className="flex-row" id="visualizationpage-flex-row">
            <div className="viz-edit-col" id="visualizationpage-viz-edit-col">
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