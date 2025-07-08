import React from 'react';
import { JsonPageProps } from '../../utils/interfaces/JsonProps';
import VegaLiteEditor from './VegaLiteEditor/VegaLiteEditor';
import './JsonPage.css';

// Funktion: JSONPage
// Stellt die Vega-Lite JSON-Spezifikation dar (nur lesen)
function JsonPage({ vegaSpec, setVegaSpec, vegaSpecError }: JsonPageProps) {
  return (
    <div className="card vega-jsonpage-card">
      <h2>Vega-Lite JSON</h2>
      <VegaLiteEditor spec={vegaSpec} setSpec={setVegaSpec} error={vegaSpecError} />
    </div>
  );
}

export default JsonPage; 