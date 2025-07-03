import React from 'react';
import DataUploader from '../DataUploader/DataUploader.jsx';
import ControlPanel from '../ControlPanel/ControlPanel.jsx';
import VegaLiteChart from '../VegaLiteChart/VegaLiteChart.jsx';
import './VisualizationPage.css';

function VisualizationPage({
  csvData, handleCsvData,columns, columnInfo, controls, filteredData,
   setError, handleControlsApply, parsedSpec, darkMode
}) {
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