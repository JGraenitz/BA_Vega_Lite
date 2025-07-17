import { VegaLiteChartProps } from '../../../utils/interfaces/VisualizationPage/VegaLiteChart/VegaLiteChartProps';
import { VegaLite } from 'react-vega';
import './VegaLiteChart.css';

/**
 * VegaLiteChart Komponente
 * Stellt das Diagramm mit react-vega dar.
 * Zeigt einen Tooltip mit dem ausgewählten Y-Achsenwert an.
 *
 * @param {Object} spec - Vega-Lite Spezifikationsobjekt
 * @param {Array} data - Array von Datenobjekten
 * @param {Array} columns - Array von Spaltennamen
 * @param {Object} columnInfo - Objekt mit Typinformationen zu jeder Spalte
 * @param {number} width - Breite des Diagramms
 * @param {number} height - Höhe des Diagramms
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
