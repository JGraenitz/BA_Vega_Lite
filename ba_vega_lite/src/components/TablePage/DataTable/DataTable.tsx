import React from 'react';
import { DataTableProps } from '../../../utils/interfaces/TableProps';
import './DataTable.css';


/**
 * DataTable Komponente 
 * Stell die CSV Datei als Tabelle dar 
 * Props:
 *   - data: Ein Array der Rohdaten
 *   - columns: Ein Array von Spaltennamen
 */
function DataTable({ data, columns }: DataTableProps) {
  if (!data || !columns) return null;
  return (
    <div className="data-table-scroll">
      <table className="data-table" aria-label="CSV Data Table">
        <thead>
          <tr>
            {columns.map((col: any) => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: any) => (
            <tr key={i}>
              {columns.map((col: any) => (
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
