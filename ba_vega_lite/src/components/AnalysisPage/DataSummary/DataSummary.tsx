import React, { useState } from 'react';
import { } from '../../VisualizationPage/VegaLiteChart/VegaLiteUtils'
import './DataSummary.css';

interface DataSummaryProps {
  columnInfo: any;
  onTypeChange?: (types: any) => void;
}

/**
 * DataSummary Komponente
 * Zeigt Spaltentypen und Informationen zu fehlenden Werten an.
 * Props:
 *   - columnInfo: { [col]: { type, missingCount } }
 *   - onTypeChange?: Funktion(updatedTypes) // optionaler Callback
 */
function DataSummary({ columnInfo, onTypeChange }: DataSummaryProps) {
  const [editedTypes, setEditedTypes] = useState<any>(() => {
    if (!columnInfo) return {};
    const initial: any = {};
    Object.entries(columnInfo).forEach(([col, info]: [string, any]) => {
      initial[col] = info.type;
    });
    return initial;
  });
  const [showSaved, setShowSaved] = useState(false);

  if (!columnInfo) return null;

  const typeOptions = [
    'quantitative',
    'temporal',
    'ordinal',
    'nominal',
  ];

  const handleTypeChange = (col: any, newType: any) => {
    setEditedTypes((prev: any) => ({ ...prev, [col]: newType }));
    setShowSaved(false);
  };

  const handleSave = () => {
    setShowSaved(true);
    if (onTypeChange) {
      onTypeChange(editedTypes);
    }
  };

  return (
    <div className="data-summary">
      <strong>Column Analysis:</strong>
      <ul>
        {Object.entries(columnInfo).map(([col, info]) => (
          <li key={col} className="data-summary-list-item">
            <span className="data-summary-col-name">{col}</span>:
            <select
              value={editedTypes[col]}
              onChange={e => handleTypeChange(col, e.target.value)}
              className="data-summary-type-select"
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            { (info as any).missingCount > 0 && (
              <span className="data-summary-missing">
                ({(info as any).missingCount} missing)
              </span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleSave} style={{ marginTop: 8 }}>
        Übernehmen
      </button>
      {showSaved && (
        <span style={{ color: 'green', marginLeft: 12 }}>Gespeichert!</span>
      )}
    </div>
  );
}

export default DataSummary;
