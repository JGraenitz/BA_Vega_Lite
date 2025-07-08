import React from 'react';
import { VegaLiteChartProps } from '../../../utils/interfaces/VisualizationProps';
import { VegaLite } from 'react-vega';
import './VegaLiteChart.css';


/**
 * VegaLiteChart Komponente
 * Stellt das Diagramm mit react-vega dar.
 * Zeigt einen Tooltip mit dem ausgewählten Y-Achsenwert an.
 * Props:
 *   - spec: Vega-Lite Spezifikationsobjekt
 *   - data: Array von Datenobjekten
 *   - columns: Array von Spaltennamen
 *   - columnInfo: Objekt mit Typinformationen zu jeder Spalte
 *   - width: Breite (Zahl)
 *   - height: Höhe (Zahl)
 */
function VegaLiteChart({ spec, data, columns, columnInfo, width, height }: VegaLiteChartProps) {
  // Passe die Spezifikation an, um Tooltip mit dem ausgewählten Y-Achsenwert anzuzeigen
  const patchedSpec = React.useMemo(() => {
    if (!spec) return spec;
    
    // Für Layer-Encoding: Tooltip für jeden Layer ergänzen, falls nötig
    let patched = { ...spec };
    if (spec.layer && Array.isArray(spec.layer)) {
      patched = {
        ...spec,
        layer: spec.layer.map((layer: any) => {
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
