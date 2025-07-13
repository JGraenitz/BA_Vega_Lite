import React, { useState } from 'react';
import { DataSummaryProps } from '../../../utils/interfaces/AnalysisProps';
import './DataSummary.css';
import { Tooltip } from 'react-tooltip';

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
      <strong>Spaltenanalyse:</strong>
      <ul>
        {Object.entries(columnInfo).map(([col, info]) => (
          <li key={col} className="data-summary-list-item">
            <span className="data-summary-col-name">{col}</span>:
            <select
              value={editedTypes[col]}
              onChange={e => handleTypeChange(col, e.target.value)}
              className="data-summary-type-select"
              data-tooltip-id={`coltype-tooltip-${col}`}
              data-tooltip-content="Typ für diese Spalte festlegen (z.B. quantitativ, temporal)"
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <Tooltip id={`coltype-tooltip-${col}`} place="top" />
            { (info as any).missingCount > 0 && (
              <span className="data-summary-missing">
                ({(info as any).missingCount} missing)
              </span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleSave} style={{ marginTop: 8 }}
        data-tooltip-id="analysis-apply-tooltip"
        data-tooltip-content="Spaltentypen übernehmen und speichern"
        className="template-toggle-btn"
      >
        Übernehmen
      </button>
      <Tooltip id="analysis-apply-tooltip" place="top" />
      {showSaved && (
        <span style={{ color: 'green', marginLeft: 12 }}>Gespeichert!</span>
      )}
    </div>
  );
}

export default DataSummary;
