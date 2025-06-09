import React from 'react';
import { Vega } from 'react-vega';
import './Chart.css'; 

/**
 * Chart-Komponente
 *
 * Diese Komponente rendert ein Diagramm basierend auf den übergebenen Daten und Einstellungen.
 * Sie verwendet die react-vega-Bibliothek, um ein Vega-Lite-Diagramm darzustellen.
 *
 * @component
 * @param {Object} props - Die Eigenschaften der Komponente.
 * @param {Array<Object>} props.data - Die Daten, die im Diagramm visualisiert werden.
 * @param {string} props.xField - Der Name des Feldes für die X-Achse.
 * @param {string} props.yField - Der Name des Feldes für die Y-Achse.
 * @param {string} props.markType - Der Diagrammtyp ("bar" für Balken, "line" für Linie).
 * @param {string} props.yAggregation - Die Aggregationsfunktion für die Y-Achse (z.B. "mean", "min", "max", "count").
 * @param {number} props.width - Die Breite des Diagramms in Pixel.
 * @param {number} props.height - Die Höhe des Diagramms in Pixel.
 *
 * @example
 * <Chart
 *   data={[{date: new Date(), wert: 10}]}
 *   xField="date"
 *   yField="wert"
 *   markType="bar"
 *   yAggregation="mean"
 *   width={800}
 *   height={450}
 * />
 */
const Chart = ({ data, xField, yField, markType, yAggregation, width, height }) => {
  const spec = {
    width: width,
    height: height,
    mark: markType,
    encoding: {
      x: {
        field: xField,
        type: xField === 'date' ? 'temporal' : 'ordinal',
        title: xField,
        
      },
      y: {
        field: yField,
        type: 'quantitative',
        title: yField,
        aggregate: yAggregation, 
      },

    },
    data: { name: 'table' },
  };

  return <div className="chart"><Vega spec={spec} data={{ table: data }} /></div>;
};

export default Chart; 