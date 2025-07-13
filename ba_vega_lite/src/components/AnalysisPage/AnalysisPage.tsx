import React from 'react';
import { AnalysisPageProps } from '../../utils/interfaces/AnalysisProps';
import './AnalysisPage.css';
import DataSummary from './DataSummary/DataSummary';



// AnalysisPage Komponente
// Stellt die Spaltenanalyse dar
function AnalysisPage({ columnInfo, onTypeChange }: AnalysisPageProps) {
  return (
    <div className="card analysis-page-card">
      <h2>Spaltenanalyse</h2>
      <DataSummary columnInfo={columnInfo} onTypeChange={onTypeChange} />
    </div>
  );
}

export default AnalysisPage; 