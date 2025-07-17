import { TestDataSelectorProps } from '../../../utils/interfaces/VisualizationPage/TestDataSelector/TestDataSelectorProps';
import { testDatasets } from '../../../utils/constants/VisualizationPage/TestDataSelector/TestDataConst';
import './TestDataSelector.css';


/**
 * TestDataSelector Komponente
 * Zeigt eine Auswahl von Testdatensätzen an, die der Nutzer laden kann.
 *
 * @param {Function} onDatasetSelect - Callback, der beim Auswählen eines Testdatensatzes aufgerufen wird
 */
function TestDataSelector({ onDatasetSelect }: TestDataSelectorProps) {
  return (
    <div className="testdata-selector">
      <h3 className="testdata-selector-title">Testdaten auswählen</h3>
      <p className="testdata-selector-description">
        Wähle Testdaten aus, um die App zu erkunden. Du kannst später deine eigenen CSV-Daten hochladen:
      </p>
      
      <div className="testdata-grid">
        {testDatasets.map((dataset) => (
          <div
            key={dataset.id}
            className="testdata-card"
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