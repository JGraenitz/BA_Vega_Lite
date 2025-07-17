import { AnalysisPageProps } from '../../utils/interfaces/AnalysisPage/AnalysisPageProps';
import DataSummary from './DataSummary/DataSummary';
import './AnalysisPage.css';



/**
 * AnalysisPage Komponente
 * Stellt die Spaltenanalyse dar und gibt die Möglichkeit, Typen zu ändern.
 *
 * @param {Object} columnInfo - Informationen zu den Spalten (Typen, etc.)
 * @param {Function} onTypeChange - Callback zum Ändern der Spaltentypen
 */
function AnalysisPage({ columnInfo, onTypeChange }: AnalysisPageProps) {
  return (
    <div className="card analysis-page-card">
      <h2>Spaltenanalyse</h2>
      <DataSummary columnInfo={columnInfo} onTypeChange={onTypeChange} />
    </div>
  );
}

export default AnalysisPage; 