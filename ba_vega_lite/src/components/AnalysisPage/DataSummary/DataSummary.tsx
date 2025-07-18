import { useState } from 'react';
import { DataSummaryProps } from '../../../utils/interfaces/AnalysisPage/DataSummary/DataSummaryProps';
import { typeOptions } from '../../../utils/constants/AnalysisPage/DataSummary/DataSummaryConst';
import { Tooltip } from 'react-tooltip';
import './DataSummary.css';

/**
 * DataSummary Komponente
 * Zeigt Spaltentypen und Informationen zu fehlenden Werten an.
 *
 * @param {Object} columnInfo - Objekt mit Spaltennamen als Schlüssel und Typ-/MissingCount-Infos als Wert
 * @param {Function} onTypeChange - Optionaler Callback, der beim Speichern der Typenänderungen aufgerufen wird
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
      <button onClick={handleSave}
        data-tooltip-id="analysis-apply-tooltip"
        data-tooltip-content="Spaltentypen übernehmen und speichern"
        className="template-toggle-btn data-summary-apply-btn"
      >
        Übernehmen
      </button>
      <Tooltip id="analysis-apply-tooltip" place="top" />
      {showSaved && (
        <span className="data-summary-saved">Gespeichert!</span>
      )}
    </div>
  );
}

export default DataSummary;
