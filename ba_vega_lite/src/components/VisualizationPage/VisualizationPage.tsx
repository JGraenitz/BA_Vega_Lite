import React, { useState } from 'react';
import { VisualizationPageProps } from '../../utils/interfaces/VisualizationPage/VisualizationProps';
import DataUploader from './DataUploader/DataUploader';
import ControlPanel from './ControlPanel/ControlPanel';
import VegaLiteChart from './VegaLiteChart/VegaLiteChart';
import TemplateSelector from './TemplateSelector/TemplateSelector';
import TestDataSelector from './TestDataSelector/TestDataSelector';
import { applyTemplateToControls } from '../../utils/scripts/VisualizationPage/TemplateSelector/TemplateSelectorUtils';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import './VisualizationPage.css';

/**
 * VisualizationPage Komponente
 *
 * Hauptseite der Vega-Lite Visualisierungsanwendung. Stellt die zentrale Benutzeroberfläche bereit,
 * über die Benutzer CSV-Daten hochladen, Visualisierungseinstellungen konfigurieren und 
 * interaktiv Diagramme erstellen können.
 *
 * @param {Array} csvData - Die eingelesenen CSV-Daten als Array von Objekten
 * @param {Function} handleUploadedCsvData - Callback-Funktion für CSV-Daten-Upload
 * @param {Array} columns - Array der Spaltennamen aus der CSV-Datei
 * @param {Object} columnInfo - Metadaten zu den Spalten (Typ, fehlende Werte)
 * @param {Object} controls - Visualisierungseinstellungen (Layer, Markierungen, Filter)
 * @param {Array} filteredData - Gefilterte Daten für die Visualisierung
 * @param {Function} setError - Callback für Fehlerbehandlung
 * @param {Function} handleControlsApply - Callback für Anwendung der Steuerungseinstellungen
 * @param {Object} parsedSpec - Parsed Vega-Lite Spezifikation
 * @param {boolean} darkMode - Dark Mode Status
 */
function VisualizationPage({
  csvData, handleUploadedCsvData, columns, columnInfo, controls, filteredData,
  setError, handleControlsApply, parsedSpec
}: VisualizationPageProps) {

  const [showTemplates, setShowTemplates] = useState(false);
  
  const [showTestData, setShowTestData] = useState(true);

  const [uploadPanelCollapsed, setUploadPanelCollapsed] = useState(true);

  const [uploadedFileName, setUploadedFileName] = useState<string>(() => {
    return sessionStorage.getItem('uploadedFileName') || '';
  });

  const navigate = useNavigate();


  /**
   * Wird aufgerufen, wenn eine Vorlage ausgewählt wird.
   * Wendet die Vorlage auf die aktuellen Spalten an und übernimmt die Einstellungen.
   */
  const handleTemplateSelect = (template: any) => {
    const appliedTemplate = applyTemplateToControls(template, columns);
    handleControlsApply(appliedTemplate);
    setShowTemplates(false);
  };

  /**
   * Wird aufgerufen, wenn ein Testdatensatz ausgewählt wird.
   * Lädt die Testdaten und blendet das Testdaten-Panel aus.
   */
  const handleTestDataSelect = (dataset: any) => {
    handleCsvDataWithFileName(dataset.data, dataset.columns, 'Testdaten: ' + dataset.name);
    setShowTestData(false);
    setUploadPanelCollapsed(true); // Automatisch Panel einklappen nach Testdaten-Auswahl
  };

  /**
   * Hilfsfunktion, um CSV-Daten zusammen mit dem Dateinamen zu verarbeiten.
   * Speichert den fileName in sessionStorage
   * Setzt den Dateinamen und klappt das Upload-Panel ein.
   */
  const handleCsvDataWithFileName = (data: any, columns: any, fileName?: string) => {
    handleUploadedCsvData(data, columns);
    if (fileName) {
      setUploadedFileName(fileName);
      setUploadPanelCollapsed(true);
      sessionStorage.setItem('uploadedFileName', fileName); 
    }
    
  };

  /**
   * Klappt das Upload-Panel ein oder aus.
   */
  const handleToggleUploadPanel = () => {
    setUploadPanelCollapsed(!uploadPanelCollapsed);
  };


  return (
    <>
      {!csvData && showTestData && (
        <div className="card" id="testdata-panel">
          <TestDataSelector onTestDataSelect={handleTestDataSelect} />
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
        <div className="flex-row" id="visualizationpage-flex-row">
            <div className="viz-edit-col" id="visualizationpage-viz-edit-col">
              <VegaLiteChart
                spec={parsedSpec}
                data={filteredData}
                width={controls.width}
                height={controls.height}
              />
            </div>
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
        </>
      )}
    </>
  );
}

export default VisualizationPage; 