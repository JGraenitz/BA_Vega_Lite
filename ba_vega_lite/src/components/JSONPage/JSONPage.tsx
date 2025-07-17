import { JSONPageProps } from '../../utils/interfaces/JSONPage/JSONProps';
import VegaLiteEditor from './VegaLiteEditor/VegaLiteEditor';
import './JSONPage.css';

/**
 * JSONPage Komponente
 * Stellt die Vega-Lite JSON-Spezifikation dar (nur lesen).
 *
 * @param {string} vegaSpec - Die Vega-Lite JSON-Spezifikation als String
 * @param {Function} setVegaSpec - Callback zum Setzen der Spezifikation
 * @param {string} vegaSpecError - Fehlermeldung zur Spezifikation (falls vorhanden)
 */
function JSONPage({ vegaSpec, setVegaSpec, vegaSpecError }: JSONPageProps) {
  return (
    <div className="card vega-jsonpage-card">
      <h2>Vega-Lite JSON</h2>
      <VegaLiteEditor spec={vegaSpec} setSpec={setVegaSpec} error={vegaSpecError} />
    </div>
  );
}

export default JSONPage; 