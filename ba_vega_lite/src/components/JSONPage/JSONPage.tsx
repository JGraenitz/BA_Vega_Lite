import { JSONPageProps } from '../../utils/interfaces/JSONPage/JSONProps';
import VegaLiteEditor from './VegaLiteEditor/VegaLiteEditor';
import './JSONPage.css';

// Funktion: JsonPage
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