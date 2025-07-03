import React from 'react';
import DataTable from './DataTable/DataTable.jsx';

// TablePage-Komponente
// Stellt die Tabelle mit den gefilterten Daten dar
function TablePage({ filteredData, columns }) {
  return (
    <div className="card tablepage-card">
      <h2>Tabelle</h2>
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
}

export default TablePage; 