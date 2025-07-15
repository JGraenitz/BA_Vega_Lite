import React from 'react';
import { VegaLiteEditorProps } from '../../../utils/interfaces/JSONProps';
import './VegaLiteEditor.css';


/**
 * VegaLiteEditor Komponente
 * Zeigt die Vega-Lite JSON-Spezifikation (nur lesen) an.
 * Props:
 *   - spec: string (Vega-Lite JSON)
 *   - setSpec: Funktion (zum Aktualisieren der Spezifikation)
 *   - error: string (Fehlermeldung)
 */
function VegaLiteEditor({ spec, setSpec, error }: VegaLiteEditorProps) {
  return (
    <div className="card vega-lite-editor-card">
      <label htmlFor="vega-lite-editor" className="vega-lite-editor-label">Vega-Lite JSON Spec (nur lesen)</label>
      <textarea
        id="vega-lite-editor"
        className="vega-lite-editor vega-lite-editor-readonly"
        value={spec}
        readOnly
        spellCheck={false}
        aria-label="Vega-Lite JSON Editor"
      />
      {error && <div className="vega-lite-editor-error">{error}</div>}
    </div>
  );
}

export default VegaLiteEditor;
