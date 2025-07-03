import React from 'react';
import './DataTable.css';

/**
 * DataTable Komponente 
 * Stell die CSV Datei als Tabelle dar 
 * Props:
 *   - data: Ein Array der Rohdaten
 *   - columns: Ein Array von Spaltennamen
 */
function DataTable({ data, columns }) {
  if (!data || !columns) return null;
  return (
    <div className="data-table-scroll">
      <table className="data-table" aria-label="CSV Data Table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
