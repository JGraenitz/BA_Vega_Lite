import React from 'react';
import './AnalysisPage.css';
import DataSummary from './DataSummary/DataSummary';

interface AnalysisPageProps {
  columnInfo: any;
  onTypeChange: (types: any) => void;
}

// AnalysisPage Komponente
// Stellt die Spaltenanalyse dar
function AnalysisPage({ columnInfo, onTypeChange }: AnalysisPageProps) {
  return (
    <div className="card analysis-page-card">
      <h2>Column Analysis</h2>
      <DataSummary columnInfo={columnInfo} onTypeChange={onTypeChange} />
    </div>
  );
}

export default AnalysisPage; 