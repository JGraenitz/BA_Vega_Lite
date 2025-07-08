import React from 'react';
import VegaLiteEditor from './VegaLiteEditor/VegaLiteEditor';
import './JSONPage.css';

interface JSONPageProps {
  vegaSpec: any;
  setVegaSpec: (spec: any) => void;
  vegaSpecError: any;
}

// Funktion: JSONPage
// Stellt die Vega-Lite JSON-Spezifikation dar (nur lesen)
function JSONPage({ vegaSpec, setVegaSpec, vegaSpecError }: JSONPageProps) {
  return (
    <div className="card vega-jsonpage-card">
      <h2>Vega-Lite JSON</h2>
      <VegaLiteEditor spec={vegaSpec} setSpec={setVegaSpec} error={vegaSpecError} />
    </div>
  );
}

export default JSONPage; 