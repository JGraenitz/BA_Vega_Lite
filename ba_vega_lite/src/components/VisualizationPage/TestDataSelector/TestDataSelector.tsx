import React from 'react';
import { testDatasets, TestDataset } from '../../../utils/interfaces/testData';
import './TestDataSelector.css';

interface TestDataSelectorProps {
  onDatasetSelect: (dataset: TestDataset) => void;
  darkMode: boolean;
}

function TestDataSelector({ onDatasetSelect, darkMode }: TestDataSelectorProps) {
  return (
    <div className={`testdata-selector${darkMode ? ' dark-mode' : ''}`}>
      <h3 className="testdata-selector-title">Testdaten auswählen</h3>
      <p className="testdata-selector-description">
        Wähle Testdaten aus, um die App zu erkunden. Du kannst später deine eigenen CSV-Daten hochladen:
      </p>
      
      <div className="testdata-grid">
        {testDatasets.map((dataset) => (
          <div
            key={dataset.id}
            className={`testdata-card${darkMode ? ' dark-mode' : ''}`}
            onClick={() => onDatasetSelect(dataset)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDatasetSelect(dataset);
              }
            }}
            aria-label={`Testdaten ${dataset.name} auswählen`}
          >
            <div className="testdata-icon">{dataset.icon}</div>
            <div className="testdata-content">
              <h4 className="testdata-name">{dataset.name}</h4>
              <p className="testdata-description">{dataset.description}</p>
              <div className="testdata-info">
                <span className="testdata-rows">{dataset.data.length} Zeilen</span>
                <span className="testdata-columns">{dataset.columns.length} Spalten</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestDataSelector; 