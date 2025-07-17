import { TablePageProps } from '../../utils/interfaces/TablePage/TablePageProps';
import DataTable from './DataTable/DataTable';
import { useNavigate } from 'react-router-dom';

/**
 * TablePage Komponente
 * Stellt die Tabelle mit den gefilterten Daten dar und bietet einen Button zur Rückkehr zur Visualisierung.
 *
 * @param {Array} filteredData - Die gefilterten Daten, die angezeigt werden sollen
 * @param {Array} columns - Die Spaltennamen der Tabelle
 */
function TablePage({ filteredData, columns }: TablePageProps) {
  const navigate = useNavigate();
  return (
    <div className="card tablepage-card">
      <h2>Tabelle</h2>
      <DataTable data={filteredData} columns={columns} />
      <div>
        <button className="template-toggle-btn" onClick={() => navigate('/')}> 
          Zurück zur Visualisierung
        </button>
      </div>
    </div>
  );
}

export default TablePage; 