import React from 'react';
import DataTable from './DataTable/DataTable';

// TablePage Komponente
// Stellt die Tabelle mit den gefilterten Daten dar
interface TablePageProps {
  filteredData: any[];
  columns: any[];
}

function TablePage({ filteredData, columns }: TablePageProps) {
  return (
    <div className="card tablepage-card">
      <h2>Tabelle</h2>
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
}

export default TablePage; 