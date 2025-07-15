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


  return (
    <div className="card vega-lite-chart-container">
      <VegaLite
        spec={spec}
        data={{ table: data }}
        actions={true}
        width={width}
        height={height}
      />
    </div>
  );
}

export default VegaLiteChart;
