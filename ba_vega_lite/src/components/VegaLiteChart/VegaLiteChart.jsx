import React from 'react';
import { VegaLite } from 'react-vega';
import './VegaLiteChart.css';

/**
 * VegaLiteChart Component
 * Renders the chart using react-vega.
 * Shows a tooltip with the selected Y-axis value(s).
 * Props:
 *   - spec: Vega-Lite spec object
 *   - data: array of data objects
 *   - columns: array of column names
 *   - columnInfo: object with type info for each column
 *   - width: number
 *   - height: number
 */
function VegaLiteChart({ spec, data, columns, columnInfo, width, height }) {
  // Passe die Spezifikation an, um Tooltip mit dem ausgewählten Y-Achsenwert anzuzeigen
  const patchedSpec = React.useMemo(() => {
    if (!spec) return spec;
    
    // Für Layer-Encoding: Tooltip für jeden Layer ergänzen, falls nötig
    let patched = { ...spec };
    if (spec.layer && Array.isArray(spec.layer)) {
      patched = {
        ...spec,
        layer: spec.layer.map((layer) => {
          const encL = { ...(layer.encoding || {}) };
          // Falls Tooltip noch nicht gesetzt ist, füge ihn basierend auf der Y-Achse hinzu
          if (!encL.tooltip && layer.encoding && layer.encoding.y && layer.encoding.y.field) {
            const yField = layer.encoding.y.field;
            encL.tooltip = [{ 
              field: yField, 
              type: columnInfo?.[yField]?.type || 'quantitative' 
            }];
          }
          return { ...layer, encoding: encL };
        })
      };
    }
    return patched;
  }, [spec, columnInfo]);

  if (!patchedSpec || !data) return null;

  return (
    <div className="card vega-lite-chart-container">
      <VegaLite
        spec={patchedSpec}
        data={{ table: data }}
        actions={true}
        width={width}
        height={height}
      />
    </div>
  );
}

export default VegaLiteChart;
